//main selector
let main = document.querySelector('body');

//input
let input = document.querySelector('input');

//btns
let checkBtn = document.querySelector('.check');
let resetBtn = document.querySelector('.again');

//messages
let message = document.querySelector('.message');
let number = document.querySelector('.number');
let score = document.querySelector('.score');
let highScore = document.querySelector('.highscore');

//end style class variables
const failClass = 'fail';
const successClass = 'success';

//end screen selector
const end = document.querySelector('#end');

//available game states
const gameStates = {
  playing: 'GAME_PLAYING',
  done: 'GAME_FINISHED',
};

//game state variable
let gameState;

//random number to find from 0 to 20
let randomNum;

//reset
const resetGame = e => {
  //reset background color
  main.classList.remove(failClass);
  main.classList.remove(successClass);

  //reset end screen
  end.classList.remove(failClass);
  end.classList.remove(successClass);

  //reset messages/input value
  input.value = 0;
  message.textContent = 'Start guessing...';
  number.textContent = '?';
  score.textContent = 20;
};

// start game function
const startGame = () => {
  //reset game messages
  resetGame();

  gameState = gameStates.playing;

  randomNum = Math.floor(Math.random() * 20);
  console.log(randomNum);
};

//handle input change
const handleInputCheck = e => {
  if (gameState === gameStates.done) {
    resetGame();
    startGame();
    return;
  }

  if (randomNum == input.value) handleSuccess();
  else handleFail();
};

//handle fail
const handleFail = () => {
  score.textContent--;

  if (score.textContent == 0) {
    number.textContent = randomNum;

    //set background
    main.classList.add(failClass);

    //set end screen
    end.classList.add(failClass);

    //set message
    message.textContent = 'oops, you run out of tries!';

    gameState = gameStates.done;
  }

  if (randomNum > input.value) {
    message.textContent = 'too low !';
    return;
  }

  if (randomNum < input.value) {
    message.textContent = 'too high !';
    return;
  }
};

//handle success
const handleSuccess = () => {
  message.textContent = 'Good job !';
  number.textContent = randomNum;
  gameState = gameStates.done;

  //set background
  main.classList.add(successClass);

  //set end screen
  end.classList.add(successClass);

  if (highScore.textContent < score.textContent) {
    highScore.textContent = score.textContent;
    message.textContent += ' (new highscore !)';
  }
};

//start the game
startGame();

//event listeners
input.addEventListener('keypress', e => {
  if (e.key === 'Enter') handleInputCheck(e);
});
checkBtn.addEventListener('click', handleInputCheck);
resetBtn.addEventListener('click', resetGame);
