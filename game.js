//Variables para traer los elementos del DOM
const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

let canvasSize;
let elementsSize;
let level = 0;

const btnLeft = document.getElementById('left');
const btnRight = document.getElementById('right');
const btnUp = document.getElementById('up');
const btnDown = document.getElementById('down');
//
const playerPosition = {
  x: undefined,
  y: undefined,
}

const giftPosition = {
  x: undefined,
  y: undefined,
}

let enemyPositions = [];


window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

/**
 * Función para establecer el tamaño del canvas según el tamaño de la pantalla
*/
function setCanvasSize() {

  if (window.innerHeight > window.innerWidth) {
    // Para dispositivos moviles
    canvasSize = window.innerWidth * 0.75;
  } else {
    // Para computadoras
    canvasSize = window.innerHeight * 0.75;
  }

  //Se establece el tamaño del canvas según el tamaño de la pantalla
  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);

  elementsSize = canvasSize / 10;

  //Se inicializa la función StartGame() para que se ejecute al cargar la página
  startGame();
}

/**
 * Función para iniciar el juego
**/
function startGame() {
  // Se establece el tamaño de los elementos del texto del canvas 
  game.font = (elementsSize - 10) + 'px Verdana';
  game.textAlign = 'end';

  //Trim es una función que sirve para eliminar los espacios en blanco al inicio y al final de un string
  //Split es una función que sirve para separar un string en un array de strings
  //Configuración del mapa del juego
  const mapa = maps[level];

  if (!mapa) {
    gameWin();
    return;
  }

  const mapaRows = mapa.trim().split('\n');
  const mapaColsRows = mapaRows.map(row => row.trim().split(''));

  enemyPositions = [];

  
  clearMap();
  //Se realiza el render del mapa mediante un ForEach. 
  mapaColsRows.forEach((row, rowI) => { //element, index

    row.forEach((col, colI) => { //element, index

      const emoji = emojis[col];
      const x = elementsSize * (colI + 1);
      const y = (elementsSize * (rowI + 1)) - 15;

      if (emoji == emojis['O'] && playerPosition.x == undefined && playerPosition.y == undefined) {
        playerPosition.x = x;
        playerPosition.y = y;
      } else if (emoji == emojis['I']) {
        giftPosition.x = x;
        giftPosition.y = y;
      } else if (col == 'X') {
        enemyPositions.push({
          posX: x,
          posY: y,
        });
      }

      game.fillText(emoji, x, y);
    })


  });


  movePlayer();
}

/*Move player*/
function movePlayer() {

  const giftCollisionX = Math.floor(playerPosition.x) == Math.floor(giftPosition.x);
  const giftCollisionY = Math.floor(playerPosition.y) == Math.floor(giftPosition.y)
  const giftCollision = giftCollisionX && giftCollisionY;


  if (giftCollision) {
    enemyCollisionX = [];
    enemyCollisionY = [];
    return levelWin();
  }

  const enemyCollision = enemyPositions.find(enemy => {
    const enemyCollisionX = enemy.posX.toFixed(3) == playerPosition.x.toFixed(3);
    const enemyCollisionY = enemy.posY.toFixed(3) == playerPosition.y.toFixed(3);
    return enemyCollisionX && enemyCollisionY;
  });

  //Enemy Collision
  // enemyCollisionX = enemyPosition.x.find(xi => {
  //   if (Math.floor(playerPosition.x) == Math.floor(xi)) {
  //     return true;
  //   }
  // }
  // );

  // enemyCollisionY = enemyPosition.y.find(yi => {

  //   if (Math.floor(playerPosition.y) == Math.floor(yi)) {
  //     return true;
  //   }
  
  // });

  // let enemyCollision;
  // if(Math.floor(enemyCollisionX) && Math.floor(enemyCollisionY)){
    
  //   enemyCollision = true;
  
  // }else{
  //   enemyCollision = false;
  // }


  if (enemyCollision) {
    level = 0;
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
  }

  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelWin() {
  level++;
  startGame();
}

function gameWin() {
  console.log('ganaste');
}

function clearMap() {
  game.clearRect(0, 0, canvasSize, canvasSize);
}
/**
 * Se captura el evento para captar correctamente los movimiento del jugador. 
 */
window.addEventListener('keydown', moveKeys);
btnUp.addEventListener('click', moveUp);
btnDown.addEventListener('click', moveDown);
btnRight.addEventListener('click', moveRight);
btnLeft.addEventListener('click', moveLeft);

/**La lógica para realizar acciones al momento de presionar un botón */
function moveUp() {
  //Se valida si la posición en Y es menor al elementSize(al tamaño de cada emoji ya que este es el valor que se acerca más al punto cero en Y)
  //En caso de ser menor o igual que elementSize no se renderizara una nueva posicion para el personake
  if (playerPosition.y <= elementsSize) {
    return;
  } else if (playerPosition.y == elementsSize || playerPosition.y >= elementsSize) {
    clearMap();
    playerPosition.y -= elementsSize;
    startGame();
    return;
  }

}

function moveDown() {
  //Se valida si la posición en Y, si es mayor al canvasSize(al tamaño de total del canvas - 15(por que en lineas anterior este valor es modificado para un responsive mejor) 
  // ya que este es el valor que se acerca más al punto oversize en Y)
  //En caso de ser menor o igual que elementSize no se renderizara una nueva posicion para el personake
  if (playerPosition.y >= (canvasSize - 15)) {
    return;
  } else if (playerPosition.y < (canvasSize - 15)) {
    clearMap();
    playerPosition.y += elementsSize;
    startGame();
    return;
  }
}

function moveLeft() {
  //Se valida si la posición en X es menor al elementSize(al tamaño de cada emoji ya que este es el valor que se acerca más al punto cero en x)
  //En caso de ser menor o igual que elementSize no se renderizara una nueva posicion para el personake
  if (playerPosition.x <= elementsSize) {
    return;
  } else if (playerPosition.x == elementsSize || playerPosition.x > elementsSize) {
    clearMap();
    playerPosition.x -= elementsSize;
    startGame();
    return;
  }

}

function moveRight() {
  //Se valida si la posición en X, si es mayor al canvasSize(al tamaño de total del canvas - 15(por que en lineas anterior este valor es modificado para un responsive mejor) 
  // ya que este es el valor que se acerca más al punto oversize en Y)
  //En caso de ser menor o igual que elementSize no se renderizara una nueva posicion para el personake
  if (playerPosition.x >= (canvasSize - 15)) {
    return;
  } else if (playerPosition.x < (canvasSize - 15)) {
    clearMap();
    playerPosition.x += elementsSize;
    startGame();
    return;
  }

}

//Captura los movimientos de teclado
function moveKeys(event) {
  //Movimientos
  const up = 38;
  const down = 40;
  const left = 37;
  const right = 39;

  const key = event.keyCode;

  if (key == up)
    moveUp()
  else if (key == down)
    moveDown()
  else if (key == left)
    moveLeft()
  else if (key == right)
    moveRight()


}