import { useState } from 'react';
import numberKeys from './keyToNumberData';

function appState() {
  const [quizActive, setQuizActive] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);
  const [randomNumber, setRandomNumber] = useState(null);
  const [inputValue, setInput] = useState('');
  const [guessResult, setGuessResult] = useState(null);

  function generateRandomNashNumber() {
    const options = Object.keys(numberKeys[selectedKey.value]);
    const randomNum = options[Math.floor(Math.random() * options.length)];
    setRandomNumber(randomNum);
  }

  function startQuiz() {
    setQuizActive(true);
    generateRandomNashNumber();
  }

  function endQuiz() {
    setQuizActive(false);
    setSelectedKey(null);
    setRandomNumber(null);
  }
  function processResult(status) {
    if (status) {
      setGuessResult('correct');
    } else {
      setGuessResult('incorrect');
    }
    setTimeout(() => {
      setGuessResult(null);
      setInput('');
      generateRandomNashNumber();
    }, 3000);
  }

  function compareGuess(e) {
    e.preventDefault();
    const answer = numberKeys[selectedKey.value][randomNumber];
    const correct = inputValue.trim().toLowerCase() === answer.trim().toLowerCase();
    processResult(correct);
  }

  function handleInput(value) {
    setInput(value);
  }

  const keysMapped = Object.keys(numberKeys).map(key => ({
    value: key,
    label: key,
  }));
  return {
    keysOptions: keysMapped,
    quiz: {
      active: quizActive,
      randomNumber,
      startQuiz,
      endQuiz,
      generateRandomNashNumber,
      compareGuess,
      guessResult,
    },
    pianoKey: { selectedKey, setSelectedKey },
    input: { value: inputValue, handleInput },
  };
}

export default appState;
