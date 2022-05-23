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
const section1 = document.getElementById("character-selection")
const section2 = document.getElementById("game-start")

section2.classList.add('hidden')

//Player1 choose his character

const chooseButtons = document.querySelectorAll('.alert-button');
const title = document.getElementById("players-order-title")

for (let i = 0; i < chooseButtons.length ; i++){
  chooseButtons[i].addEventListener('click', function(){
  if (!player1.isReady){
    player1.name = chooseButtons[i].dataset.name;
    player1.image = chooseButtons[i].dataset.image;
    chooseButtons[i].style.background = "red";
    chooseButtons[i].style.color = "white";
    chooseButtons[i].innerHTML = "PLAYER 1"
    title.innerHTML = "PLAYER 2: Choose your character"
    player1.isReady = true
  }
  else if (!player2.isReady){
    player2.name = chooseButtons[i].dataset.name;
    player2.image = chooseButtons[i].dataset.image;
    chooseButtons[i].style.background = "red";
    chooseButtons[i].style.color = "white";
    chooseButtons[i].innerHTML = "PLAYER 2";
    player2.isReady = true

    const startbutton = document.createElement("button")
    startbutton.textContent = 'START THE GAME';
    startbutton.classList.add('buttonStartGame');
      startbutton.addEventListener('click', function() {
        section2.classList.remove('hidden')
        section1.classList.add('hidden')
      })
      const insertedNode = section1.insertBefore(startbutton, title)
      title.innerHTML=''
    }

  });
}

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

const gridContainer = document.querySelector('.grid')


const grid = {
  height: 10,
  width: 10,
  container: gridContainer,
  cells: null,
  // function to generate a number of cells inside gridContainer
  generateCells() {
    const size = this.height * this.width
    this.cells = []
    for (let i = 0; i < size; i++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.textContent = i
      gridContainer.appendChild(cell)
      this.cells.push(cell)
    }
  },
}

grid.generateCells()

// <-------------> END GRID <------------->

// <-------------> PLAYERS <------------->

class Player {

  constructor(name, image){

    this.name = name;
    this.image = image;
    this.cellIndex = 0;
    this.isReady = false;
  }

  rollDice(){

    const buttonRoolDice = document.querySelector( '.dice-roll ' );
    //this.name
    // dans la même fonction les 2 jours, juste des selectors différents

    buttonRoolDice.addEventListener( 'click', () => {

      const diceSide1 = document.getElementById( 'dice-side-1' );
      const diceSide2 = document.getElementById( 'dice-side-2' );
      const status = document.getElementById( 'status' );

      const side1 = Math.floor( Math.random() * 6 ) + 1;
      const side2 = Math.floor( Math.random() * 6 ) + 1;
      const diceTotal = side1 + side2;

      diceSide1.innerHTML = side1;
      diceSide2.innerHTML = side2;

      status.innerHTML = `${this.name}` + ' ' + "rolled" + ' ' + diceTotal + '.';

      if ( side1 === side2 ) {
        status.innerHTML += ` Doubles! ${this.name} gets a free turn!`;
      }

      this.position += diceTotal % grid.length

    }
    , false );

  }

  getRow() {
    return Math.floor(this.cellIndex / grid.width)
  }
  getColumn() {
    return this.cellIndex % grid.width
  }
  isInLastRow() {
    return this.getRow() === grid.height - 1
  }
  isInFirstRow() {
    return this.getRow() === 0
  }
  isInLastColumn() {
    return this.getColumn() === grid.width - 1
  }
  isInFirstColumn() {
    return this.getColumn() === 0
  }
  moveRight() {
    if (this.isInLastColumn()) {
      return
    }
    this.cellIndex += 1
  }
  moveLeft() {
    if (this.isInFirstColumn()) {
      return
    }
    this.cellIndex += -1
  }
  moveUp() {
    if (this.isInFirstRow()) {
      return
    }
    this.cellIndex += -grid.width
  }
  moveDown() {
    // detect bottom row case "boundary case"
    if (this.isInLastRow()) {
      return
    }

    this.cellIndex += grid.width
  }
  move(direction) {
    // first hide the old player position
    this.hide()
    // now move
    switch (direction) {
      case 'right':
        this.moveRight()
        break
      case 'left':
        this.moveLeft()
        break
      case 'down':
        this.moveDown()
        break
      case 'up':
        this.moveUp()
        break
    }
    // now show the new one
    this.show()
  }
  hide() {
    const currentPlayerCell = grid.cells[this.cellIndex]
    if (currentPlayerCell) {
      currentPlayerCell.classList.remove('player')
    }
  }
  show() {
    const currentPlayerCell = grid.cells[this.cellIndex]
    if (currentPlayerCell) {
      currentPlayerCell.classList.add('player')
    }
  }
}

document.addEventListener('keydown', (event) => {
  console.log('code', event.code)

  switch (event.code) {
    case 'ArrowLeft':
      player1.move('left')
      break
    case 'ArrowRight':
      player1.move('right')
      break
    case 'ArrowDown':
      player1.move('down')
      break
    case 'ArrowUp':
      player1.move('up')
      break
  }
})

// <-------------> PLAYERS <------------->

let player1 = new Player();
let player2 = new Player();

player1.show()
player1.rollDice()
player2.rollDice()


// je définis les boutons au début avant la class player
