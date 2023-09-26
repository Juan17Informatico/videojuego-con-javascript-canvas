const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
let canvasSize;
let elementsSize;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize(){
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }
  
  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);
  
  elementsSize = canvasSize / 10;

  startGame();
}
function startGame() {
    console.log({ canvasSize, elementsSize });
  
    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';
  
    for (let i = 1; i <= 10; i++) {
      game.fillText(emojis['X'], elementsSize, elementsSize * i);
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