function Game(human, computer) {
  //INIT CANVAS
  const canvas = document.getElementById("cvs");
  const ctx = canvas.getContext("2d");
  //BOARD FIELD SETTINGS
  let board = [];
  const COLUMN = 3;
  const ROW = 3;
  const SPACE_SIZE = 150;
  //BOARD ARRAY THAT INDICATES PLAYER'S MOVES AND WHICH ONE IS FILLED
  let boardRectCoord = [];
  let id = 0;
  //
  let GAME_OVER = false;
  const xImage = new Image();
  xImage.src = "./xImage.png";
  const oImage = new Image();
  oImage.src = "./oImage.png";
  const gameOverElem = document.getElementById("gameover");

  let currentIDChoice = 0;
  let currentPlayer = [human, computer][Math.floor(Math.random() * 2)]; // let currentPlayer = human;
  console.log(`current player is ${currentPlayer} `);
  console.log(`human is ${human}`);
  console.log(`computer is ${computer}`);
  console.log(`current player is ${currentPlayer}`);
  drawBoard();

  function drawBoard() {
    for (let i = 0; i < ROW; i++) {
      board[i] = [];
      for (let j = 0; j < COLUMN; j++) {
        board[i][j] = id;
        boardRectCoord[id] = {
          x: j * SPACE_SIZE,
          y: i * SPACE_SIZE,
          id: id,
          isActive: false,
          value: "",
        };
        ctx.strokeStyle = "#000";

        ctx.strokeRect(j * SPACE_SIZE, i * SPACE_SIZE, SPACE_SIZE, SPACE_SIZE);

        id++;
      }
      ctx.strokeStyle = "yellow";
      ctx.strokeRect(boardRectCoord[0]["x"], boardRectCoord[0]["y"], 150, 150);
      boardRectCoord[0]["isActive"] = true;
      currentIDChoice = 0;
    }
  }

  window.addEventListener("keyup", PlayerChoice);

  function PlayerChoice(e) {
    console.log("inside player choise");
    if (GAME_OVER) {
      return;
    } else if (e.which == "37" /**arrow left */) {
      if (currentIDChoice == 0) {
        ctx.strokeStyle = "#000";

        ctx.strokeRect(
          boardRectCoord[0]["x"],
          boardRectCoord[0]["y"],
          SPACE_SIZE,
          SPACE_SIZE
        );
        boardRectCoord[0]["isActive"] = false;
        currentIDChoice = boardRectCoord.length - 1;

        ctx.strokeStyle = "yellow";
        ctx.strokeRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          150,
          150
        );

        boardRectCoord[currentIDChoice]["isActive"] = true;
      } else {
        ctx.strokeStyle = "#000";

        ctx.strokeRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          SPACE_SIZE,
          SPACE_SIZE
        );
        boardRectCoord[currentIDChoice]["isActive"] = false;
        currentIDChoice--;
        ctx.strokeStyle = "yellow";
        ctx.strokeRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          SPACE_SIZE,
          SPACE_SIZE
        );
        boardRectCoord[currentIDChoice]["isActive"] = true;
      }
    } else if (e.which == "39" /**arrow right */) {
      if (currentIDChoice == boardRectCoord.length - 1) {
        ctx.strokeStyle = "#000";

        ctx.strokeRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          SPACE_SIZE,
          SPACE_SIZE
        );
        boardRectCoord[currentIDChoice]["isActive"] = false;
        currentIDChoice = 0;
        ctx.strokeStyle = "yellow";

        ctx.strokeRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          SPACE_SIZE,
          SPACE_SIZE
        );
        boardRectCoord[currentIDChoice]["isActive"] = true;
      } else {
        ctx.strokeStyle = "#000";

        ctx.strokeRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          SPACE_SIZE,
          SPACE_SIZE
        );
        boardRectCoord[currentIDChoice]["isActive"] = false;
        currentIDChoice++;
        ctx.strokeStyle = "yellow";

        ctx.strokeRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          SPACE_SIZE,
          SPACE_SIZE
        );
        boardRectCoord[currentIDChoice]["isActive"] = true;
      }
    } else if (e.which == "38" /**arrow up */) {
      if (currentIDChoice - 3 < 0) {
        ctx.strokeStyle = "#000";

        ctx.strokeRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          SPACE_SIZE,
          SPACE_SIZE
        );
        boardRectCoord[currentIDChoice]["isActive"] = false;
        //color new place

        currentIDChoice = boardRectCoord.length + (currentIDChoice - 3);

        ctx.strokeStyle = "yellow";

        ctx.strokeRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          SPACE_SIZE,
          SPACE_SIZE
        );
        boardRectCoord[currentIDChoice]["isActive"] = true;
      } else {
        //erase old place
        ctx.strokeStyle = "#000";

        ctx.strokeRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          SPACE_SIZE,
          SPACE_SIZE
        );
        boardRectCoord[currentIDChoice]["isActive"] = false;
        //color new place

        currentIDChoice -= 3;

        ctx.strokeStyle = "yellow";

        ctx.strokeRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          SPACE_SIZE,
          SPACE_SIZE
        );
        boardRectCoord[currentIDChoice]["isActive"] = true;
      }
    } else if (e.which == "40" /**arrow down */) {
      if (currentIDChoice + 3 > boardRectCoord.length - 1) {
        //erase old place

        ctx.strokeStyle = "#000";

        ctx.strokeRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          SPACE_SIZE,
          SPACE_SIZE
        );
        boardRectCoord[currentIDChoice]["isActive"] = false;
        //color new place

        currentIDChoice = currentIDChoice + 3 - boardRectCoord.length;

        ctx.strokeStyle = "yellow";

        ctx.strokeRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          SPACE_SIZE,
          SPACE_SIZE
        );
        boardRectCoord[currentIDChoice]["isActive"] = true;
      } else {
        //erase old place

        ctx.strokeStyle = "#000";

        ctx.strokeRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          SPACE_SIZE,
          SPACE_SIZE
        );
        boardRectCoord[currentIDChoice]["isActive"] = false;
        //color new place

        currentIDChoice = currentIDChoice + 3;

        ctx.strokeStyle = "yellow";

        ctx.strokeRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          SPACE_SIZE,
          SPACE_SIZE
        );
        boardRectCoord[currentIDChoice]["isActive"] = true;
      }
    } else if (e.which == "13" /**IF PLAYER HIT ENTER */) {
      console.log(`Enter hitted ${currentIDChoice}`);
      if (boardRectCoord[currentIDChoice].value === "") {
        boardRectCoord[currentIDChoice].value = currentPlayer;
        drowOnBoard(
          currentPlayer,
          boardRectCoord[currentIDChoice].y,
          boardRectCoord[currentIDChoice].x
        );

        //window.removeEventListener("keyup", PlayerChoice);
        if (isWinner(currentPlayer)) {
          showGameOver(currentPlayer);
          GAME_OVER = true;
          return;
        }
        if (isTie()) {
          showGameOver("tie");
          GAME_OVER = true;
          return;
        }
        if (currentPlayer == human) {
          console.log(`switching player to ${computer}`);
          currentPlayer = computer;
          console.log(`current player now is ${currentPlayer}`);
        } else {
          currentPlayer = human;
        }
      } else {
        drowOnBoard(
          boardRectCoord[currentIDChoice].value,
          boardRectCoord[currentIDChoice].y,
          boardRectCoord[currentIDChoice].x
        );
      }
    }
    // window.addEventListener("keyup", PlayerChoice);
    console.log(boardRectCoord);
  }
  /**DROWING X OR O */
  function drowOnBoard(player, i, j) {
    const img = player == "X" ? xImage : oImage;
    ctx.drawImage(img, j, i, SPACE_SIZE, SPACE_SIZE);
    console.log("in draw on board function");
  }
  /**CHECKIN THE WIN COMBINATION */
  function isWinner(player) {
    console.log("is winner fucntion");
    const COMBOS = [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < COMBOS.length; i++) {
      let won = true;
      for (let j = 0; j < COMBOS[i].length; j++) {
        let id = COMBOS[i][j];
        won = boardRectCoord[id].value == player && won; //if at least one index false=> all array[i] will be false
      }
      if (won) return true;
    }
    return false;
  }
  function isTie() {
    ///let isBoardFill = true;
    console.log("in isTie() func");
    console.log(boardRectCoord.every((dict) => dict.value != ""));
    if (boardRectCoord.every((dict) => dict.value != "")) {
      //if all board if filled out
      return true;
    }
    return false;
  }
  function showGameOver(player) {
    let imgSrc = `./${player.toLowerCase()}Image.png`;
    let message = player == "tie" ? "No Winner" : "The Winner is";
    gameOverElem.style.textAlign = "center";
    gameOverElem.style.width = "450px";
    gameOverElem.style.height = "350px";
    gameOverElem.style.backgroundColor = "gray";
    gameOverElem.style.borderRadius = "25%";
    gameOverElem.innerHTML = `
  <h1 class="enter">${message}</h1>
  <img class="winner-img"  style="width:100px;height:100px;"src=${imgSrc}>
  <h2>PLAY AGAIN?</h2>
  <h3>Hit <a class="enter">ENTER</a> to <a class="enter"> RESTART</a></h3>
  <h3>Hit <a class="cancel">BACKSPACE</a> to <a class="cancel">CANCEL</a></h3>`;
    gameOverElem.classList.remove("hide");
    canvas.style.display = "none";
    window.addEventListener("keyup", restartGame);
  }
  function restartGame(e) {
    if (e.which == "13") {
      gameOverElem.classList.add("hide");
      window.location.reload();

      //Game(human, computer);
    } else if (e.which == "8") {
      window.open("https://google.com");
    }
  }
}
