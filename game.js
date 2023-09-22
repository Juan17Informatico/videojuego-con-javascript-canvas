const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', startGame);

function startGame(){
    game.fillRect(100, 25, 100, 100);
    game.clearRect(105, 30, 90, 87);

    game.fillStyle = 'blue';
    game.font = '25px Arial';
    game.textAlign = 'start';
    game.fillText('Platzi', 120, 85);
    //Pone el texto "Platzi" en negrilla 
    // game.strokeText('Platzi', 100, 100);
}