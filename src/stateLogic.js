/* eslint-env browser */
import { useState, useEffect } from 'react';
import numberKeys from './keyToNumberData';

function appState() {
  const [quizActive, setQuizActive] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);
  const [randomNumber, setRandomNumber] = useState(null);
  const [inputValue, setInput] = useState('');
  const [guessResult, setGuessResult] = useState(null);
  const [genNewNumber, setGenNewNumber] = useState(false);
  const [arrayOfNumbers, setArrayOfNumbers] = useState([]);

  useEffect(
    () => {
      if (genNewNumber) {
        generateRandomNashNumber();
      }
    },
    [genNewNumber],
  );

  useEffect(
    () => {
      if (arrayOfNumbers.length === 0 && quizActive) {
        setArrayOfNumbers(Object.keys(numberKeys[selectedKey.value]));
      }
    },
    [arrayOfNumbers],
  );

  function generateRandomNashNumber() {
    const randomNum = arrayOfNumbers[
      Math.floor(Math.random() * arrayOfNumbers.length)
    ];
    const index = arrayOfNumbers.indexOf(randomNum);
    setGenNewNumber(false);
    setRandomNumber(randomNum);
    arrayOfNumbers.splice(index, 1);
    setArrayOfNumbers(arrayOfNumbers);
  }

  function startQuiz() {
    setQuizActive(true);
    setArrayOfNumbers(Object.keys(numberKeys[selectedKey.value]));
    setGenNewNumber(true);
    window.scrollTo(0, 0);
  }

  function endQuiz() {
    setQuizActive(false);
    setSelectedKey(null);
    setRandomNumber(null);
    setInput('');
    setArrayOfNumbers([]);
    setGenNewNumber(false);
    window.scrollTo(0, 0);
  }

  function dismissIncorrect() {
    setGuessResult(null);
    setInput('');
    window.scrollTo(0, 0);
  }

  function advanceToNext() {
    setGuessResult(null);
    setInput('');
    setGenNewNumber(true);
    window.scrollTo(0, 0);
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
    window.scrollTo(0, 0);
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
