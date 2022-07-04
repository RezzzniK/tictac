function Game(human, computer) {
  const canvas = document.getElementById("cvs");
  const ctx = canvas.getContext("2d");
  const COLUMN = 3;
  const ROW = 3;
  const SPACE_SIZE = 150;
  let board = [];
  let boardRectCoord = [];
  let id = 0;
  let currentIDChoice = 0;
  drawBoard();

  function drawBoard() {
    for (let i = 0; i < ROW; i++) {
      board[i] = [];
      //boardRectCoord[i] = [];
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
      ctx.fillStyle = "#FF0000";
      ctx.fillRect(boardRectCoord[0]["x"], boardRectCoord[0]["y"], 150, 150);
      boardRectCoord[0]["isActive"] = true;
      currentIDChoice = 0;

      window.addEventListener("keyup", PlayerChoice);
    }
  }

  function PlayerChoice(e) {
    console.log("inside player choise");
    if (e.which == "37" /**arrow left */) {
      if (currentIDChoice == 0) {
        ctx.fillStyle = "darkgrey";
        ctx.strokeStyle = "#000";
        ctx.fillRect(
          boardRectCoord[0]["x"],
          boardRectCoord[0]["y"],
          SPACE_SIZE,
          SPACE_SIZE
        );
        ctx.strokeRect(
          boardRectCoord[0]["x"],
          boardRectCoord[0]["y"],
          SPACE_SIZE,
          SPACE_SIZE
        );
        boardRectCoord[0]["isActive"] = false;
        currentIDChoice = boardRectCoord.length - 1;
        ctx.fillStyle = "#FF0000";
        ctx.strokeStyle = "#000";
        ctx.fillRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          150,
          150
        );
        ctx.strokeRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          SPACE_SIZE,
          SPACE_SIZE
        );
        boardRectCoord[currentIDChoice]["isActive"] = true;
      } else {
        ctx.fillStyle = "darkgray";
        ctx.strokeStyle = "#000";
        ctx.fillRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          150,
          150
        );
        ctx.strokeRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          SPACE_SIZE,
          SPACE_SIZE
        );
        boardRectCoord[currentIDChoice]["isActive"] = false;
        currentIDChoice--;
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          150,
          150
        );
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
        ctx.fillStyle = "darkgrey";
        ctx.strokeStyle = "#000";
        ctx.fillRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          SPACE_SIZE,
          SPACE_SIZE
        );
        ctx.strokeRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          SPACE_SIZE,
          SPACE_SIZE
        );
        boardRectCoord[currentIDChoice]["isActive"] = false;
        currentIDChoice = 0;
        ctx.fillStyle = "#FF0000";
        ctx.strokeStyle = "#000";
        ctx.fillRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          150,
          150
        );
        ctx.strokeRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          SPACE_SIZE,
          SPACE_SIZE
        );
        boardRectCoord[currentIDChoice]["isActive"] = true;
      } else {
        ctx.fillStyle = "darkgray";
        ctx.strokeStyle = "#000";
        ctx.fillRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          150,
          150
        );
        ctx.strokeRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          SPACE_SIZE,
          SPACE_SIZE
        );
        boardRectCoord[currentIDChoice]["isActive"] = false;
        currentIDChoice++;
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          150,
          150
        );
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
        //erase old place
        ctx.fillStyle = "darkgrey";
        ctx.strokeStyle = "#000";
        ctx.fillRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          SPACE_SIZE,
          SPACE_SIZE
        );
        ctx.strokeRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          SPACE_SIZE,
          SPACE_SIZE
        );
        boardRectCoord[currentIDChoice]["isActive"] = false;
        //color new place
        console.log(currentIDChoice);
        currentIDChoice = boardRectCoord.length + (currentIDChoice - 3);
        console.log(currentIDChoice);
        ctx.fillStyle = "#FF0000";
        ctx.strokeStyle = "#000";
        ctx.fillRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          150,
          150
        );
        ctx.strokeRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          SPACE_SIZE,
          SPACE_SIZE
        );
        boardRectCoord[currentIDChoice]["isActive"] = true;
      } else {
        //erase old place
        ctx.fillStyle = "darkgrey";
        ctx.strokeStyle = "#000";
        ctx.fillRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          SPACE_SIZE,
          SPACE_SIZE
        );
        ctx.strokeRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          SPACE_SIZE,
          SPACE_SIZE
        );
        boardRectCoord[currentIDChoice]["isActive"] = false;
        //color new place
        console.log(currentIDChoice);
        currentIDChoice -= 3;
        console.log(currentIDChoice);
        ctx.fillStyle = "#FF0000";
        ctx.strokeStyle = "#000";
        ctx.fillRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          150,
          150
        );
        ctx.strokeRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          SPACE_SIZE,
          SPACE_SIZE
        );
        boardRectCoord[currentIDChoice]["isActive"] = true;
      }
    } else if (e.which == "40" /**arrow down */) {
      console.log("arrow down");
      if (currentIDChoice + 3 > boardRectCoord.length - 1) {
        //erase old place
        ctx.fillStyle = "darkgrey";
        ctx.strokeStyle = "#000";
        ctx.fillRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          SPACE_SIZE,
          SPACE_SIZE
        );
        ctx.strokeRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          SPACE_SIZE,
          SPACE_SIZE
        );
        boardRectCoord[currentIDChoice]["isActive"] = false;
        //color new place
        console.log(currentIDChoice);
        currentIDChoice = currentIDChoice + 3 - boardRectCoord.length;
        console.log(currentIDChoice);
        ctx.fillStyle = "#FF0000";
        ctx.strokeStyle = "#000";
        ctx.fillRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          150,
          150
        );
        ctx.strokeRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          SPACE_SIZE,
          SPACE_SIZE
        );
        boardRectCoord[currentIDChoice]["isActive"] = true;
      } else {
        //erase old place
        ctx.fillStyle = "darkgrey";
        ctx.strokeStyle = "#000";
        ctx.fillRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          SPACE_SIZE,
          SPACE_SIZE
        );
        ctx.strokeRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          SPACE_SIZE,
          SPACE_SIZE
        );
        boardRectCoord[currentIDChoice]["isActive"] = false;
        //color new place
        console.log(currentIDChoice);
        currentIDChoice = currentIDChoice + 3;
        console.log(currentIDChoice);
        ctx.fillStyle = "#FF0000";
        ctx.strokeStyle = "#000";
        ctx.fillRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          150,
          150
        );
        ctx.strokeRect(
          boardRectCoord[currentIDChoice]["x"],
          boardRectCoord[currentIDChoice]["y"],
          SPACE_SIZE,
          SPACE_SIZE
        );
        boardRectCoord[currentIDChoice]["isActive"] = true;
      }
    } else if (e.which == "13") {
      if (boardRectCoord[currentIDChoice].value === "") {
        boardRectCoord[currentIDChoice].value = human;
        drowOnBoard();
        window.removeEventListener("keyup", PlayerChoice);
      }
    }

    console.log(boardRectCoord);
  }
  function drowOnBoard() {
    console.log("in draw on board function");
  }
  function isWinner() {
    return false;
  }
}
