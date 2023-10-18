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
    const mapa = maps[0];
    const mapaRows = mapa.trim().split('\n');
    const mapaColsRows = mapaRows.map(row => row.trim().split(''));

    //Se realiza el render del mapa mediante un ForEach. 
    mapaColsRows.forEach((row, rowI) => { //element, index
      row.forEach((col, colI)=> { //element, index
        const emoji = emojis[col];
        const x = elementsSize * (colI + 1);
        const y = (elementsSize * (rowI + 1)) - 15;
        game.fillText(emoji, x, y);
      })
    })

    /** 
     * Forma alternativa de hacerlo. 
     */
    //Se establece la posición de los elementos del canvas según el tamaño de los elementos realizando un ciclo for para llenar cada cuadricula
    // for (let row = 1; row <= 10; row++) {
    //   for (let col = 1; col <= 10; col++) {
    //       const emoji = emojis[mapaColsRows[row - 1][col -1]];
    //       const x = elementsSize * col;
    //       const y = (elementsSize * row) - 15;
    //       game.fillText(emoji, x, y);        
    //   }
    // }
}

