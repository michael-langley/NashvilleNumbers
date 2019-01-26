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
    setInput('');
  }

  function dismissIncorrect() {
    setGuessResult(null);
    setInput('');
  }

  function advanceToNext() {
    setGuessResult(null);
    setInput('');
    generateRandomNashNumber();
  }

  function processResult(status) {
    if (status) {
      setGuessResult('correct');
    } else {
      setGuessResult('incorrect');
    }
  }

  function getCorrectAnswer() {
    return numberKeys[selectedKey.value][randomNumber];
  }

  function compareGuess(e) {
    e.preventDefault();
    const answer = getCorrectAnswer();
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
      getCorrectAnswer,
      dismissIncorrect,
      advanceToNext,
    },
    pianoKey: { selectedKey, setSelectedKey },
    input: { value: inputValue, handleInput },
  };
}

export default appState;
