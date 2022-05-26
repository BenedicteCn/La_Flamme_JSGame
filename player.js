class Player {
  constructor(className, name, image) {
    this.className = className;
    this.name = name;
    this.image = image;
    this.cellIndex = 0;
    this.isReady = false;
    this.position = 0;
    this.steps = 0;
  }

  setAvailableSteps(steps) {
    this.steps = steps;
    if (this.steps === 0) {
      this.isFinishedTurn = true
    }
    else {
      this.isFinishedTurn = false;
    }
    const status = document.getElementById( 'status' );
    status.textContent = `${this.name} has ${this.steps} steps`
  }
  addAdditionalSteps(steps) {
    this.setAvailableSteps(this.steps + steps);
  }

  rollDice() {
    if (this.isFinishedTurn || this.steps > 0) {
      return;
    }
    //this.name
    // dans la même fonction les 2 jours, juste des selectors différents
    const side1 = Math.floor(Math.random() * 6) + 1;
    const side2 = Math.floor(Math.random() * 6) + 1;
    const diceTotal = side1 + side2;

    dice[0].innerHTML = side1;
    dice[1].innerHTML = side2;

    statusElement.innerHTML = `${this.name}` + " " + "rolled" + " " + diceTotal;

    this.setAvailableSteps(diceTotal);
  }

  getRow() {
    return Math.floor(this.cellIndex / grid.width);
  }
  getColumn() {
    return this.cellIndex % grid.width;
  }
  isInLastRow() {
    return this.getRow() === grid.height - 1;
  }
  isInFirstRow() {
    return this.getRow() === 0;
  }
  isInLastColumn() {
    return this.getColumn() === grid.width - 1;
  }
  isInFirstColumn() {
    return this.getColumn() === 0;
  }
  moveRight() {
    if (this.isInLastColumn()) {
      return;
    }
    this.cellIndex += 1;
  }
  moveLeft() {
    if (this.isInFirstColumn()) {
      return;
    }
    this.cellIndex += -1;
  }
  moveUp() {
    if (this.isInFirstRow()) {
      return;
    }
    this.cellIndex += -grid.width;
  }
  moveDown() {
    // detect bottom row case "boundary case"
    if (this.isInLastRow()) {
      // if (this.cellIndex >= 215 && this.cellIndex <= 218) {
      //   this.cellIndex = 224;
      // }
      return;
    }
    // if (this.isDirectlyAboveMarc()) {
    //   this.cellIndex = marcCellIndex
    //   return
    // }

    this.cellIndex += grid.width;
  }
  move(direction) {
    // first hide the old player position
    this.hide();

    // now move
    switch (direction) {
      case "right":
        this.moveRight();
        break;
      case "left":
        this.moveLeft();
        break;
      case "down":
        this.moveDown();
        break;
      case "up":
        this.moveUp();
        break;
    }
    this.win();
    this.setUpVideo();
    this.givesLove();
    this.doesMagic();
    this.askQuestion();
    // now show the new one
    this.addAdditionalSteps(-1);
    this.show();
  }
  hide() {
    const currentPlayerCell = grid.cells[this.cellIndex];
    if (currentPlayerCell) {
      currentPlayerCell.classList.remove(this.image);
      currentPlayerCell.classList.remove(this.className);
    }
  }
  show() {
    const currentPlayerCell = grid.cells[this.cellIndex];
    if (currentPlayerCell) {
      currentPlayerCell.classList.add(this.image);
      currentPlayerCell.classList.add(this.className);
    }
  }
  win() {
    const currentPlayerCell = grid.cells[this.cellIndex];
    const winningCell = grid.cells[224];
    if (currentPlayerCell === winningCell) {
      document.getElementById("game-start").classList.remove("wrapper");
      document.getElementById("game-start").classList.remove("h2");

      console.log(`${this.steps}`);

      document.querySelector(".grid").classList.add("finalDisplay");
      document.querySelector(
        ".grid"
      ).innerHTML = `Congrats to the winner ${this.name}!!`;
      console.log(`${this.steps}`);
      document.querySelector(".wrapper").innerHTML =
        '<img src="../images/marcparty.gif" width="200px" height="250px">';
    }
  }
  givesLove() {
    const size = grid.height * grid.width;
    const currentPlayerCell = grid.cells[this.cellIndex];
    if (
      currentPlayerCell === grid.cells[size - 23] ||
      currentPlayerCell === grid.cells[size - 131]
    ) {
      document.getElementById("status").innerHTML =
        `${this.name}` + " wins 2 moves";
      this.addAdditionalSteps(2);
    }
    if (currentPlayerCell === grid.cells[size - 59]) {
      document.getElementById("status").innerHTML =
        `${this.name}` + " wins 1 move";
      this.addAdditionalSteps(1);
    }
    if (currentPlayerCell === grid.cells[size - 202]) {
      document.getElementById("status").innerHTML =
        `${this.name}` + " wins 2 moves";
      this.addAdditionalSteps(2);
    }
    if (currentPlayerCell === grid.cells[size - 194]) {
      document.getElementById("status").innerHTML =
        `${this.name}` + " wins 3 moves";
      this.addAdditionalSteps(3);
    }
  }
  setUpVideo() {
    const size = grid.height * grid.width;
    const currentPlayerCell = grid.cells[this.cellIndex];
    if (currentPlayerCell === grid.cells[size - 69]) {
      grid.cells[size - 69].appendChild(modal);
      modal.classList.remove("hidden");
      modal.onclick = function () {
        document.getElementById("myModal").style.display = "block";
      };
      window.onclick = function (event) {
        if (event.target == document.getElementById("myModal")) {
          document.getElementById("myModal").style.display = "none";
        }
      };
    }

    if (currentPlayerCell === grid.cells[size - 49]) {
      grid.cells[size - 49].appendChild(modal);
      modal.classList.remove("hidden");
      modal.onclick = function () {
        document.getElementById("myModal1").style.display = "block";
      };
      window.onclick = function (event) {
        if (event.target == document.getElementById("myModal1")) {
          document.getElementById("myModal1").style.display = "none";
        }
      };
    }

    if (currentPlayerCell === grid.cells[size - 88]) {
      grid.cells[size - 88].appendChild(modal);
      modal.classList.remove("hidden");
      modal.onclick = function () {
        document.getElementById("myModal2").style.display = "block";
      };
      window.onclick = function (event) {
        if (event.target == document.getElementById("myModal2")) {
          document.getElementById("myModal2").style.display = "none";
        }
      };
    }

    if (currentPlayerCell === grid.cells[size - 124]) {
      grid.cells[size - 124].appendChild(modal);
      modal.classList.remove("hidden");
      modal.onclick = function () {
        document.getElementById("myModal3").style.display = "block";
      };
      window.onclick = function (event) {
        if (event.target == document.getElementById("myModal3")) {
          document.getElementById("myModal3").style.display = "none";
        }
      };
    }

    if (currentPlayerCell === grid.cells[size - 220]) {
      grid.cells[size - 220].appendChild(modal);
      modal.classList.remove("hidden");
      modal.onclick = function () {
        document.getElementById("myModal4").style.display = "block";
      };
      window.onclick = function (event) {
        if (event.target == document.getElementById("myModal4")) {
          document.getElementById("myModal4").style.display = "none";
        }
      };
    }

    if (currentPlayerCell === grid.cells[size - 169]) {
      grid.cells[size - 169].appendChild(modal);
      modal.classList.remove("hidden");
      modal.onclick = function () {
        document.getElementById("myModal5").style.display = "block";
      };
      window.onclick = function (event) {
        if (event.target == document.getElementById("myModal5")) {
          document.getElementById("myModal5").style.display = "none";
        }
      };
    }
  }

  doesMagic() {
    const size = grid.height * grid.width;
    const currentPlayerCell = grid.cells[this.cellIndex];

    if (currentPlayerCell === grid.cells[size - 35]) {
      `${this.name}` + " back to start!";
      this.hide();
      this.cellIndex = 0;
      this.show();
      this.setAvailableSteps(1);
    }

    if (currentPlayerCell === grid.cells[size - 99]) {
      document.getElementById("status").innerHTML =
        `${this.name}` + " back to start!";
      this.hide();
      this.cellIndex = 0;
      this.show();
      this.setAvailableSteps(1);
    }
    // document.querySelector(currentPlayerCell).style.visibility = 'hidden';
    // document.querySelector(`#card-${this.cellIndex} .player${playerIndex + 1}-color`).style.visibility = 'visible';

    if (
      currentPlayerCell === grid.cells[size - 150] ||
      currentPlayerCell === grid.cells[size - 11] ||
      currentPlayerCell === grid.cells[size - 106]
    ) {
      document.getElementById("status").innerHTML =
        `${this.name}` + " back to start";
      this.hide();
      this.cellIndex = 0;
      this.show();
      this.setAvailableSteps(1);
    }

    if (currentPlayerCell === grid.cells[size - 156]) {
      document.getElementById("status").innerHTML =
        `${this.name}` + ", victory is waiting for you!";
      this.hide();
      this.cellIndex = 210;
      this.show();
      this.setAvailableSteps(1);
    }

    if (currentPlayerCell === grid.cells[14]) {
      document.getElementById("status").innerHTML =
        `${this.name}` + ", victory is waiting for you!";
      this.hide();
      this.cellIndex = 198;
      this.show();
      this.setAvailableSteps(1);
    }
  }

  getQuestionForCell() {
    switch (this.cellIndex) {
      case 50:
        return questions[0];
      case 40:
        return questions[1];
      default:
        return null;
    }
  }

  askQuestion() {
    const currentQuestion = this.getQuestionForCell();
    if (currentQuestion) {
      setupQuestion(currentQuestion, this);
    }
  }
}
