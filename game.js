function Game(human, computer) {
  const canvas = document.getElementById("cvs");
  const ctx = canvas.getContext("2d");
  const COLUMN = 3;
  const ROW = 3;
  const SPACE_SIZE = 150;
  let board = [];
  let id = 0;
  console.log(canvas.clientHeight);
  console.log(canvas.clientWidth);
  for (let i = 0; i < ROW; i++) {
    board[i] = [];
    for (let j = 0; j < COLUMN; j++) {
      board[i][j] = id;
      ctx.strokeStyle = "#000";

      ctx.strokeRect(j * SPACE_SIZE, i * SPACE_SIZE, SPACE_SIZE, SPACE_SIZE);

      id++;
    }
  }
}
