//Variables para traer los elementos del DOM
const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
let canvasSize;
let elementsSize;


window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

/**
 * Función para establecer el tamaño del canvas según el tamaño de la pantalla
 */
function setCanvasSize(){
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.75;
  } else {
    canvasSize = window.innerHeight * 0.75;
  }
  
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
    // console.log({ canvasSize, elementsSize });
  
    // console.log({game});

    //La variable game es el contexto del canvas
    // Se establece el tamaño de los elementos del canvas
    game.font = (elementsSize - 10) + 'px Verdana';
    game.textAlign = 'end';

    // console.log({game});

    //Trim es una función que sirve para eliminar los espacios en blanco al inicio y al final de un string
    //Split es una función que sirve para separar un string en un array de strings
    //Se establece el mapa del juego 
    const mapa = maps[0];
    //Se crea una variable para almacenar el mapa en un array de strings, eliminando los espacios al inicio y al final
    const mapaRows = mapa.trim().split('\n');
    //Se crea una variable para almacenar el mapa en un array de arrays, eliminando los espacios al inicio y al final y separando cada string en un array
    const mapaColsRows = mapaRows.map(row => row.trim().split(''));
    console.log({mapaColsRows});

    //Se establece la posición de los elementos del canvas según el tamaño de los elementos realizando un ciclo for para llenar cada cuadricula
    for (let row = 1; row <= 10; row++) {
      for (let col = 1; col <= 10; col++) {
          game.fillText(emojis[mapaColsRows[row - 1][col- 1]], elementsSize * col, (elementsSize * row) - 15);        
      }
    }

    // window.innerHeight
    // window.innerWidth
    // game.fillRect(100, 25, 100, 100);
    // game.clearRect(105, 30, 90, 87);


    // game.fillStyle = 'blue';
    // game.font = '25px Arial';
    // game.textAlign = 'start';
    // game.fillText('Platzi', 120, 85);
    // //Pone el texto "Platzi" en negrilla 
    // game.strokeText('Platzi', 100, 100);
}