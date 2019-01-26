/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import ReactBreakpoints from 'react-breakpoints';
import Header from './components/Global/Layout/Header';
import Dropdown from './components/Global/Dropdown';
import Button from './components/Global/Button';
import Input from './components/Global/Input';
import Form from './components/Global/Form';
import Label from './components/Global/Label';
import appStyles from './App.module.scss';
import appState from './stateLogic';
import './styles/index.scss';

const breakpoints = {
  mobile: 320,
  mobileLandscape: 480,
  tablet: 768,
  tabletLandscape: 992,
  desktop: 1200,
  desktopLarge: 1500,
  desktopWide: 1920,
};

function App() {
  const {
    quiz, keysOptions, pianoKey, input,
  } = appState();
  console.log(quiz);
  console.log(keysOptions);
  return (
    <ReactBreakpoints breakpoints={breakpoints}>
      <Header
        style={{
          borderBottom: '3px solid white',
          backgroundColor: 'transparent',
        }}
        customClasses="shadow"
      />
      <div className="container">
        <div className="row mt-2 justify-content-between px-3">
          <div
            className="d-flex flex-column"
            style={{ fontSize: '0.7rem' }}
          >
            <span className="mb-1">m = Minor</span>
            <span className="mb-1">_ = Flat</span>
            <span className="mb-1"># = Sharp</span>
          </div>
          {pianoKey.selectedKey && (
            <div className="d-flex flex-column align-items-center">
              <div className="mb-2">Selected Key</div>
              <h4 className="align-self-center">
                {pianoKey.selectedKey.value}
              </h4>
            </div>
          )}
        </div>
        <div className="row d-flex justify-content-center">
          {!quiz.active && (
            <StartQuizScreen
              options={keysOptions}
              pianoKey={pianoKey}
              quiz={quiz}
            />
          )}
          {quiz.active && (
            <GuessScreen
              quiz={quiz}
              keysOptions={keysOptions}
              pianoKey={pianoKey}
              input={input}
            />
          )}
        </div>
      </div>
    </ReactBreakpoints>
  );
}

export default App;

const homeScreen = document.getElementById('home-screen');

const StartQuizScreen = ({ options, pianoKey, quiz }) => {
  homeScreen.className = 'row justify-content-center';
  return ReactDOM.createPortal(
    <div className={`${appStyles['center-tile']} col-sm-10 col-md-5`}>
      <h4>Start a New Quiz</h4>
      <Form customClasses="w-100">
        <Dropdown
          additonalLabelClasses="text-white"
          dropdownLabel="Key to Test"
          options={options}
          placeholder="Select Key"
          value={pianoKey.selectedKey}
          onChange={pianoKey.setSelectedKey}
          additionalContainerClasses={`${
            appStyles['center-tile__dropdown']
          } w-100`}
        />
        <Button
          disabled={!pianoKey.selectedKey}
          customClasses={`${appStyles['center-tile__button']} w-100`}
          onClick={(e) => {
            e.preventDefault();
            quiz.startQuiz();
          }}
        >
          Start Quiz!
        </Button>
      </Form>
    </div>,
    homeScreen,
  );
};

const GuessScreen = ({
  quiz, keysOptions, pianoKey, input,
}) => (
  <div
    className={`${
      appStyles['center-tile']
    } col-sm-10 col-md-5 mt-5 d-flex`}
  >
    <h3>Nashville Number</h3>

    <div className="py-2 px-3 mt-2 bg-white text-align-center">
      <h3 className="text-primary mb-0">{quiz.randomNumber}</h3>
    </div>

    {!quiz.guessResult && (
      <Form
        customClasses="mt-5"
        style={{ width: '90%' }}
        htmlAttributes={{
          autoComplete: 'off',
          onSubmit: e => quiz.compareGuess(e),
        }}
      >
        <Label htmlFor="key_guess" style={{ fontSize: '0.7rem' }}>
          Enter corresponding key value
        </Label>
        <Input
          type="text"
          customClasses="w-100 border-0 shadow-sm"
          value={input.value}
          placeholder="Enter Key"
          handleValue={input.handleInput}
          htmlAttributes={{ id: 'key_guess' }}
        />
        <div className="row justify-content-between mt-3">
          <Button onClick={quiz.endQuiz}>End Quiz</Button>
          <Button onClick={e => quiz.compareGuess(e)}>
            Submit Guess
          </Button>
        </div>
      </Form>
    )}
    {quiz.guessResult
      && quiz.guessResult === 'correct' && (
        <CorrectGuessMessage
          pianoKey={pianoKey}
          quiz={quiz}
          input={input}
        />
    )}
    {quiz.guessResult
      && quiz.guessResult === 'incorrect' && (
        <IncorrectGuessMessage quiz={quiz} input={input} />
    )}
  </div>
);

const CorrectGuessMessage = ({ pianoKey, quiz, input }) => (
  <div className="p-2 mt-4 d-flex flex-column align-items-center">
    <h5 className="text-success">Correct!</h5>
    <p className="text-center">
      In the key of {pianoKey.selectedKey.value}, the Nashville Number{' '}
      {quiz.randomNumber} corresponds to the key of {input.value}
    </p>
    <Button onClick={quiz.advanceToNext}>Next Question</Button>
  </div>
);

const IncorrectGuessMessage = ({ quiz, input }) => (
  <div className="p-2 mt-4 d-flex flex-column align-items-center">
    <h5 className="text-danger">Wrong Answer, Try Again!</h5>
    <p className="text-center">
      {input.value} is not the corresponding key
    </p>
    <Button onClick={quiz.dismissIncorrect}>Dismiss</Button>
  </div>
);
