/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import ReactBreakpoints from 'react-breakpoints';
import Header from './components/Global/Layout/Header';
import Dropdown from './components/Global/Dropdown';
import Button from './components/Global/Button';
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
  const { quiz, keysOptions, pianoKey } = appState();
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
        <div className="row">
          {!quiz.active && (
            <CenterTile options={keysOptions} pianoKey={pianoKey} />
          )}
        </div>
      </div>
    </ReactBreakpoints>
  );
}

export default App;

const homeScreen = document.getElementById('home-screen');

const CenterTile = ({ options, pianoKey }) => {
  homeScreen.className = 'row justify-content-center';
  return ReactDOM.createPortal(
    <div className={`${appStyles['center-tile']} col-sm-10 col-md-5`}>
      <h4>Start a New Quiz</h4>
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
        customClasses={`${appStyles['center-tile__button']} w-100`}
      >
        Start Quiz!
      </Button>
    </div>,
    homeScreen,
  );
};
