import { useState, useEffect } from 'react';
import numberKeys from './keyToNumberData';

function appState() {
  const [quizActive, setQuizActive] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);

  useEffect(
    () => {
      console.log('using effect');
    },
    [quizActive],
  );

  function startQuiz(selectedKey) {
    setSelectedKey(selectedKey.value);
    setQuizActive(true);
  }

  function endQuiz() {
    setQuizActive(false);
  }

  const keysMapped = Object.keys(numberKeys).map(key => ({
    value: key,
    label: key,
  }));
  return {
    keysOptions: keysMapped,
    quiz: { active: quizActive, startQuiz, endQuiz },
    pianoKey: { selectedKey, setSelectedKey },
  };
}

export default appState;
