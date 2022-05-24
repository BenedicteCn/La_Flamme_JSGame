// for boucle
// generate div, class
// l'ajouter au container

// div class "cell"

// const cellSpecific = : {title: "Death";
// id: }

// <-------------> PLAYERS' CHARACTER SELECTION <------------->

// 1: hide section 2
// 2: player 1 choose his character
// 3: player 2 choose his character (title changes)
// 4: hide section 1, display section 2

//Section 2(board game) is hidden
const section1 = document.getElementById("character-selection");
const section2 = document.getElementById("game-start");
const modal = document.getElementById("myBtnModal");

section2.classList.add("hidden");
modal.classList.add("hidden");

//Player1 choose his character

const chooseButtons = document.querySelectorAll(".alert-button");
const title = document.getElementById("players-order-title");

for (let i = 0; i < chooseButtons.length; i++) {
  chooseButtons[i].addEventListener("click", function () {
    if (!player1.isReady) {
      player1.name = chooseButtons[i].dataset.name;
      player1.image = chooseButtons[i].dataset.image;
      chooseButtons[i].style.background = "#fe7171";
      chooseButtons[i].style.color = "white";
      chooseButtons[i].innerHTML = "PLAYER 1";
      title.innerHTML = "PLAYER 2: Choose your character";
      player1.isReady = true;
    } else if (!player2.isReady) {
      player2.name = chooseButtons[i].dataset.name;
      player2.image = chooseButtons[i].dataset.image;

      chooseButtons[i].style.background = "#d90707d3";
      chooseButtons[i].style.color = "white";
      chooseButtons[i].innerHTML = "PLAYER 2";
      player2.isReady = true;

      const startbutton = document.createElement("button");
      startbutton.textContent = "START THE GAME";
      startbutton.classList.add("buttonStartGame");
      startbutton.addEventListener("click", function () {
        section2.classList.remove("hidden");
        section1.classList.add("hidden");
      });
      const insertedNode = section1.insertBefore(startbutton, title);
      title.innerHTML = "";
    }

    // after player2 chooses, we can start the game with player1
    grid.currentPlayer = player1;
  });
}

// document.getElementsByClassName('cell player1').classList.add(player1.image)
// document.getElementsByClassName('cell player2').innerHTML = `${player2.image}`

// <-------------> PLAYERS' CHARACTER SELECTION <------------->

// <-------------> DICES <------------->

// window.addEventListener( 'DOMContentLoaded', function () {

// }, false);

// const buttonRoolDice = document.querySelector( '.dice-roll' );

// function rollDice () {

//     const diceSide1 = document.getElementById( 'dice-side-1' );
//     const diceSide2 = document.getElementById( 'dice-side-2' );
//     const status = document.getElementById( 'status' );

//     const side1 = Math.floor( Math.random() * 6 ) + 1;
//     const side2 = Math.floor( Math.random() * 6 ) + 1;
//     const diceTotal = side1 + side2;

//     diceSide1.innerHTML = side1;
//     diceSide2.innerHTML = side2;

//     status.innerHTML = `${player1.name}` + ' ' + "rolled" + ' ' + diceTotal + '.';

//     if ( side1 === side2 ) {
//         status.innerHTML += ` Doubles! ${player1.name} gets a free turn!`;
//     }
// }

// buttonRoolDice.addEventListener( 'click', rollDice, false );

// <-------------> END DICES <------------->

// <-------------> GRID <------------->

const gridContainer = document.querySelector(".grid");

const grid = {
  height: 15,
  width: 15,
  container: gridContainer,
  cells: null,
  // function to generate a number of cells inside gridContainer
  generateCells() {
    const size = this.height * this.width;
    this.cells = [];
    for (let i = 0; i < size; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.textContent = i;
      gridContainer.appendChild(cell);
      this.cells.push(cell);
    }

    grid.cells[size - 1].classList.add("winner");

    grid.cells[size - 23].classList.add("heart");

    grid.cells[size - 59].classList.add("heart");

    grid.cells[size - 200].classList.add("heart");

    grid.cells[size - 194].classList.add("heart");

    grid.cells[size - 131].classList.add("heart");

    grid.cells[size - 49].classList.add("group");

    grid.cells[size - 69].classList.add("group");

    grid.cells[size - 88].classList.add("group");

    grid.cells[size - 124].classList.add("group");

    grid.cells[size - 220].classList.add("group");

    grid.cells[size - 169].classList.add("group");

    grid.cells[size - 150].classList.add("magic");

    grid.cells[size - 99].classList.add("magic");

    grid.cells[size - 11].classList.add("magic");

    grid.cells[size - 106].classList.add("magic");

    grid.cells[size - 156].classList.add("magic");

    grid.cells[size - 4].classList.add("magic");

    grid.cells[size - 77].classList.add("interro");

    grid.cells[size - 110].classList.add("interro");

    grid.cells[size - 14].classList.add("interro");

    grid.cells[size - 25].classList.add("interro");

    grid.cells[size - 39].classList.add("interro");

    grid.cells[size - 185].classList.add("interro");

    grid.cells[size - 175].classList.add("interro");
  },
  currentPlayer: null,
};

grid.generateCells();

// <-------------> END GRID <------------->

// <-------------> PLAYERS <------------->

const dice = document.querySelectorAll(".die");
const statusElement = document.getElementById("status");
const buttonRoolDice = document.querySelector(".dice-roll");

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
  }

  rollDice() {
    //this.name
    // dans la même fonction les 2 jours, juste des selectors différents
    const side1 = Math.floor(Math.random() * 6) + 1;
    const side2 = Math.floor(Math.random() * 6) + 1;
    const diceTotal = side1 + side2;

    dice[0].innerHTML = side1;
    dice[1].innerHTML = side2;

    statusElement.innerHTML =
      `${this.name}` + " " + "rolled" + " " + diceTotal + ".";

    if (side1 === side2) {
      statusElement.innerHTML += ` Doubles! ${this.name} gets a free turn!`;
    }

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
    this.cellIndex += -(grid.width - 1);
  }
  moveDown() {
    // detect bottom row case "boundary case"
    if (this.isInLastRow()) {
      if (this.cellIndex >= 215 && this.cellIndex <= 218) {
        this.cellIndex = 224;
      }
      return;
    }

    this.cellIndex += grid.width - 1;
  }
  move(direction) {
    // player can only move if they have spare steps
    // if (this.steps <= 0) {
    //   if (grid.currentPlayer === player1){
    //     grid.currentPlayer = player2
    //   }
    //   else {
    //     grid.currentPlayer = player1 }
    //   return
    // } else {
    //   this.steps -= 1
    // }

    // first hide the old player position
    this.hide();

    // now move
    switch (direction) {
      case "right":
        this.moveRight();
        this.win();
        this.group();
        this.heart();
        this.magic();
        break;
      case "left":
        this.moveLeft();
        this.win();
        this.group();
        this.heart();
        this.magic();
        break;
      case "down":
        this.moveDown();
        this.win();
        this.group();
        this.heart();
        this.magic();
        break;
      case "up":
        this.moveUp();
        this.win();
        this.group();
        this.heart();
        this.magic();
        break;
    }
    // now show the new one
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
    const size = grid.height * grid.width;
    const currentPlayerCell = grid.cells[this.cellIndex];
    const winningCell = grid.cells[size - 1];
    if (currentPlayerCell === winningCell) {
      document.getElementById("game-start").classList.remove("wrapper");
      document.getElementById("game-start").classList.remove("h2");

      document.querySelector(".grid").classList.add("finalDisplay");
      document.querySelector(".grid").classList.add(`${this.image}`);
      document.querySelector(
        ".grid"
      ).innerHTML = `Congrats to the winner ${this.name}!!`;
      document.querySelector(".wrapper").innerHTML =
        '<img src="../images/marcparty.gif" width="200px" height="250px">';
    }
  }
  heart() {
    const size = grid.height * grid.width;
    const currentPlayerCell = grid.cells[this.cellIndex];
    if (
      (currentPlayerCell === grid.cells[size - 23]) &
      (currentPlayerCell === grid.cells[size - 131])
    ) {
      document.getElementById("status").innerHTML =
        `${this.name}` + " gagne 2 déplacements";
      this.steps += 2;
    }
    if (currentPlayerCell === grid.cells[size - 59]) {
      document.getElementById("status").innerHTML =
        `${this.name}` + " gagne 3 déplacements";
      this.steps += 1;
    }
    if (currentPlayerCell === grid.cells[size - 200]) {
      document.getElementById("status").innerHTML =
        `${this.name}` + " gagne 3 déplacements";
      this.steps += 2;
    }
    if (currentPlayerCell === grid.cells[size - 194]) {
      document.getElementById("status").innerHTML =
        `${this.name}` + " gagne 3 déplacements";
      this.steps += 1;
    }
  }

  group() {
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

  interro() {
    const size = grid.height * grid.width;
    const currentPlayerCell = grid.cells[this.cellIndex];
    if (currentPlayerCell === grid.cells[size - 77]) {
      document.getElementById("status").innerHTML =
        `${this.name}` + " wins 2 moves";
      this.steps += 2;
    }
    if (currentPlayerCell === grid.cells[size - 110]) {
      document.getElementById("status").innerHTML =
        `${this.name}` + " must move back of 5 cells";
      this.steps += 5;
    }
    if (currentPlayerCell === grid.cells[size - 14]) {
      document.getElementById("status").innerHTML =
        `${this.name}` + " must move back of 2 cells";
      this.steps += 2;
    }
  }

  magic() {
    const size = grid.height * grid.width;
    const currentPlayerCell = grid.cells[this.cellIndex];

    if (currentPlayerCell === grid.cells[size - 4]) {
      document.getElementById("status").innerHTML =
        `${this.name}` + ", victory is waiting for you!";
      this.position = grid.cells[size - 8];
    }

    if (currentPlayerCell === grid.cells[size - 99]) {
      document.getElementById("status").innerHTML =
        `${this.name}` + " back to start";
      this.position = grid.cells[size - 224];
    }

    if (currentPlayerCell === grid.cells[size - 150]) {
      document.getElementById("status").innerHTML =
        `${this.name}` + " back to start";
      this.position = grid.cells[size - 224];
    }

    if (currentPlayerCell === grid.cells[size - 11]) {
      document.getElementById("status").innerHTML =
        `${this.name}` + " back to start";
      this.position = grid.cells[size - 224];
    }

    if (currentPlayerCell === grid.cells[size - 106]) {
      document.getElementById("status").innerHTML =
        `${this.name}` + " back to start";
      this.position = grid.cells[size - 224];
    }

    if (currentPlayerCell === grid.cells[size - 156]) {
      document.getElementById("status").innerHTML =
        `${this.name}` + ", victory is waiting for you!";
      this.position = grid.cells[size - 7];
    }
  }
}

document.addEventListener("keydown", (event) => {
  // console.log('code', event.code)

  let player = grid.currentPlayer;
  console.log(`before move: I am ${player.name} and I have ${player.steps} steps remaining`)

  if (!player || player.steps === 0) {
    return;
  }

  switch (event.code) {
    case "ArrowLeft":
      player.move("left");
      break;
    case "ArrowRight":
      player.move("right");
      break;
    case "ArrowDown":
      player.move("down");
      break;
    case "ArrowUp":
      player.move("up");
      break;
  }
  if (player.steps <= 1) {
    if (grid.currentPlayer === player1) {
      grid.currentPlayer = player2;
    } else {
      grid.currentPlayer = player1;
    }
    return;
  }
  player.steps -= 1;
  player = grid.currentPlayer;
  console.log(`after move: I am ${player.name} and I have ${player.steps} steps remaining`)
});

// <-------------> PLAYERS <------------->

const player1 = new Player("player1");
const player2 = new Player("player2");

player1.show();
player2.show();

buttonRoolDice.addEventListener("click", () => {
  // get the current player
  // if the current player is set, we call their rollDice function
  grid.currentPlayer.rollDice();
});
// je définis les boutons au début avant la class player

player1.win();
player2.win();
