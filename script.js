let adsManager;
let adsLoader;
let adDisplayContainer;
let intervalTimer;
let videoContent;
/** GAME VARIABLES */
let canvas = document.getElementById("cvs");
// let symbol = "";
const options = document.getElementById("options");
const xBtn = document.getElementById("x");
const oBtn = document.getElementById("o");
const player = new Object();
/**
 * Initializes IMA setup.
 */
function init() {
  videoContent = document.getElementById("contentElement");
  options.style.display = "block";
  canvas.style.display = "none";
  videoContent.style.display = "none";
  window.addEventListener("keyup", selectSymbol);
  setUpIMA();
}

/**
 * Sets up IMA ad display container, ads loader, and makes an ad request.
 */
function setUpIMA() {
  // Create the ad display container.
  createAdDisplayContainer();
  // Create ads loader.
  adsLoader = new google.ima.AdsLoader(adDisplayContainer);
  // Listen and respond to ads loaded and error events.
  adsLoader.addEventListener(
    google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
    onAdsManagerLoaded,
    false
  );
  adsLoader.addEventListener(
    google.ima.AdErrorEvent.Type.AD_ERROR,
    onAdError,
    false
  );
  // An event listener to tell the SDK that our content video
  // is completed so the SDK can play any post-roll ads.
  const contentEndedListener = function () {
    adsLoader.contentComplete();
  };
  videoContent.onended = contentEndedListener;
  // Request video ads.
  const adsRequest = new google.ima.AdsRequest();
  adsRequest.adTagUrl =
    "https://pubads.g.doubleclick.net/gampad/ads?" +
    "iu=/21775744923/external/single_ad_samples&sz=640x480&" +
    "cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&gdfp_req=1&" +
    "output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=";
  // Specify the linear and nonlinear slot sizes. This helps the SDK to
  // select the correct creative if multiple are returned.
  adsRequest.linearAdSlotWidth = 640;
  adsRequest.linearAdSlotHeight = 400;

  adsRequest.nonLinearAdSlotWidth = 640;
  adsRequest.nonLinearAdSlotHeight = 150;

  adsLoader.requestAds(adsRequest);
}
/**
 * Sets the 'adContainer' div as the IMA ad display container.
 */
function createAdDisplayContainer() {
  // We assume the adContainer is the DOM id of the element that will house
  // the ads.
  adDisplayContainer = new google.ima.AdDisplayContainer(
    document.getElementById("adContainer"),
    videoContent
  );
}
/** OPTIONS TO PLAY OR ESCAPE AWAY*/
function checkKey(e) {
  console.log(e.which);
  if (e.which == "13") {
    window.removeEventListener("keyup", selectSymbol);
    window.removeEventListener("keyup", checkKey);
    options.style.display = "none";
    console.log("starting the game");
    videoContent.style.display = "block";
    playAds(); /**DON'T FORGET TO SWITCH IT BACK IF YOU WONDERING WHY ITS NNOT WORKING */
    //StartGame(); //DON'T FORGET TO COMMENT THIS TO RESUME NORMAL BEHAVIOR
  } else if (e.which == "8") {
    window.open("https://google.com");
  }
}
/**SELECTING SYMBOL 'X' OR 'O' */
function selectSymbol(e) {
  let warning = document.getElementById("warning");
  console.log("please select symbol");
  if (e.which == "37") {
    console.log("X selected");
    switchActive(oBtn, xBtn);
    player.human = "X";
    player.computer = "O";
    warning.style.display = "none";
  } else if (e.which == "39") {
    switchActive(xBtn, oBtn);
    player.human = "O";
    player.computer = "X";
    console.log("O selected");
    warning.style.display = "none";
  } else if (e.which == "13" && !player.human && !player.computer) {
    warning.style.display = "block";
    window.removeEventListener("keyup", checkKey);
  }
  window.addEventListener("keyup", checkKey);
}
/**CHOOSING X OR Y*/
function switchActive(off, on) {
  off.style.backgroundColor = "white";
  off.style.color = "black";
  on.style.backgroundColor = "black";
  on.style.color = "white";
}
/**STARTING THE GAME */
function StartGame() {
  window.removeEventListener("keyup", selectSymbol);
  videoContent.style.display = "none";
  canvas.style.display = "block";

  console.log("starting the game");
  Game(player.human, player.computer);
}
/** Loads the video content and initializes IMA ad playback.*/
function playAds() {
  //window.removeEventListener("keydown", selectSymbol);
  options.style.display = "none";
  // Initialize the container. Must be done through a user action on mobile
  // devices.
  videoContent.load();
  adDisplayContainer.initialize();
  try {
    // Initialize the ads manager. Ad rules playlist will start at this time.
    adsManager.init(640, 360, google.ima.ViewMode.NORMAL);
    // Call play to start showing the ad. Single video and overlay ads will
    // start at this time; the call will be ignored for ad rules.
    adsManager.start();
  } catch (adError) {
    // An error may be thrown if there was a problem with the VAST response.
    videoContent.play();
  }
}
/**Handles the ad manager loading and sets ad event listeners.
 * @param {!google.ima.AdsManagerLoadedEvent} adsManagerLoadedEvent
 */
function onAdsManagerLoaded(adsManagerLoadedEvent) {
  // Get the ads manager.
  const adsRenderingSettings = new google.ima.AdsRenderingSettings();
  adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
  // videoContent should be set to the content video element.
  adsManager = adsManagerLoadedEvent.getAdsManager(
    videoContent,
    adsRenderingSettings
  );
  // Add listeners to the required events.
  adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, onAdError);
  adsManager.addEventListener(
    google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
    onContentPauseRequested
  );
  adsManager.addEventListener(
    google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
    onContentResumeRequested
  );
  adsManager.addEventListener(
    google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
    onAdEvent
  );
  // Listen to any additional events, if necessary.
  adsManager.addEventListener(google.ima.AdEvent.Type.LOADED, onAdEvent);
  adsManager.addEventListener(google.ima.AdEvent.Type.STARTED, onAdEvent);
  adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, onAdEvent);
}

/**
 * Handles actions taken in response to ad events.
 * @param {!google.ima.AdEvent} adEvent
 */
function onAdEvent(adEvent) {
  // Retrieve the ad from the event. Some events (for example,
  // ALL_ADS_COMPLETED) don't have ad object associated.
  const ad = adEvent.getAd();
  switch (adEvent.type) {
    case google.ima.AdEvent.Type.LOADED:
      // This is the first event sent for an ad - it is possible to
      // determine whether the ad is a video ad or an overlay.
      if (!ad.isLinear()) {
        // Position AdDisplayContainer correctly for overlay.
        // Use ad.width and ad.height.
        videoContent.play();
      }
      break;
    case google.ima.AdEvent.Type.STARTED:
      // This event indicates the ad has started - the video player
      // can adjust the UI, for example display a pause button and
      // remaining time.
      if (ad.isLinear()) {
        // For a linear ad, a timer can be started to poll for
        // the remaining time.
        intervalTimer = setInterval(function () {
          // Example: const remainingTime = adsManager.getRemainingTime();
        }, 300); // every 300ms
      }
      break;
    case google.ima.AdEvent.Type.COMPLETE:
      // This event indicates the ad has finished - the video player
      // can perform appropriate UI actions, such as removing the timer for
      // remaining time detection.
      if (ad.isLinear()) {
        clearInterval(intervalTimer);
      }
      StartGame();
      break;
  }
}

/**
 * Handles ad errors.
 * @param {!google.ima.AdErrorEvent} adErrorEvent
 */
function onAdError(adErrorEvent) {
  // Handle the error logging.
  console.log(adErrorEvent.getError());
  adsManager.destroy();
}
/**Pauses video content and sets up ad UI.*/
function onContentPauseRequested() {
  videoContent.pause();
  // This function is where you should setup UI for showing ads (for example,
  // display ad timer countdown, disable seeking and more.)
  // setupUIForAds();
}
/**Resumes video content and removes ad UI.*/
function onContentResumeRequested() {
  videoContent.play();
  // This function is where you should ensure that your UI is ready
  // to play content. It is the responsibility of the Publisher to
  // implement this function when necessary.
  // setupUIForContent();
}
// Wire UI element references and UI event listeners.
init();
