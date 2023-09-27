const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
let canvasSize;
let elementsSize;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize(){
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.75;
  } else {
    canvasSize = window.innerHeight * 0.75;
  }
  
  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);
  
  elementsSize = canvasSize / 10; ;

  startGame();
}
function startGame() {
    console.log({ canvasSize, elementsSize });
  
    console.log({game});
    game.font = elementsSize - 10 + 'px Verdana';
    game.textAlign = 'end';
    console.log({game});
    game.fillStyle = 'black';

    for (let i = 1; i <= 10; i++) {
      for (let y = 1; y <= 10; y++) {
          game.fillText(emojis['X'], elementsSize * i, elementsSize * y - 13);        
        
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