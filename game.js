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
      const status = document.getElementById( 'status' );
      grid.isStarted = true
      status.innerHTML = `${player1.name}` + ': ' + "Roll the die!";
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
//     const status = document.getElementById( 'status' );
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
  isStarted: false,
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

    grid.cells[224].classList.add("winner");

    grid.cells[size - 23].classList.add("heart");

    grid.cells[size - 59].classList.add("heart");

    grid.cells[size - 202].classList.add("heart");

    grid.cells[size - 194].classList.add("heart");

    grid.cells[size - 131].classList.add("heart");

    grid.cells[size - 49].classList.add("group");

    grid.cells[size - 69].classList.add("group");

    grid.cells[size - 88].classList.add("group");

    grid.cells[size - 122].classList.add("group");

    grid.cells[size - 220].classList.add("group");

    grid.cells[size - 169].classList.add("group");

    grid.cells[size - 150].classList.add("magic");

    grid.cells[14].classList.add("magic");

    grid.cells[size - 99].classList.add("magic");

    grid.cells[size - 11].classList.add("magic");

    grid.cells[size - 106].classList.add("magic");

    grid.cells[size - 156].classList.add("magic");

    grid.cells[size - 35].classList.add("magic");

    grid.cells[50].classList.add("interro");

    grid.cells[40].classList.add("interro");

    grid.cells[108].classList.add("interro");

    grid.cells[200].classList.add("interro");

    grid.cells[186].classList.add("interro");

    grid.cells[82].classList.add("interro");

    grid.cells[144].classList.add("interro");

    grid.cells[size - 225].classList.add("start");


  },
  currentPlayer: null,
};

grid.generateCells();

// <-------------> END GRID <------------->

// <-------------> PLAYERS <------------->

const dice = document.querySelectorAll(".die");
const statusElement = document.getElementById("status");
const buttonRoolDice = document.querySelector(".dice-roll");


document.addEventListener("keydown", (event) => {
  if (!grid.isStarted) {
    return
  }
  if (!grid.currentPlayer) {
    throw new Error('KEYDOWN WITHOUT PLAYER')
  }
  console.log('keydown', grid.currentPlayer)

  if (grid.currentPlayer.isFinishedTurn) {
    if (grid.currentPlayer === player1) {
      grid.currentPlayer = player2;
    } else {
      grid.currentPlayer = player1;
    }
    // start a new turn
    grid.currentPlayer.isFinishedTurn = false
  }

  if (grid.currentPlayer.steps === 0) {
    return;
  }

  let player = grid.currentPlayer;
  console.log(`before move: I am ${player.name} and I have ${player.steps} steps remaining`)

  switch (event.code) {
    case "ArrowLeft":
      player.move("left");
      break;
    case "ArrowRight":
      player.move("right");
      break
    case "ArrowDown":
      player.move("down");
      break;
    case "ArrowUp":
      player.move("up");
      break;
  }


  // player = grid.currentPlayer;
  // const status = document.getElementById( 'status' );
  // status.innerHTML = "She has"`${this.steps}` + " steps remaining"
  console.log(`after move: I am ${player.name} and I have ${player.steps} steps remaining`)
});

// <-------------> PLAYERS <------------->

const player1 = new Player("player1");
const player2 = new Player("player2");

setupQuestionModalEventListeners()
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


      // status.innerHTML = `${player2.name}` + ': ' + "it is your turn.";
