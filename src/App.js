import React from 'react';
import ReactBreakpoints from 'react-breakpoints';
import Header from './components/Global/Layout/Header';
import Dropdown from './components/Global/Dropdown';
import Button from './components/Global/Button';
import appStyles from './App.module.scss';
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

const App = () => (
  <ReactBreakpoints breakpoints={breakpoints}>
    <Header />
    <div className="container">
      <CenterTile />
    </div>
  </ReactBreakpoints>
);

export default App;

const CenterTile = () => (
  <div className={appStyles['center-tile']}>
    <h4>Start a New Lesson</h4>
    <Dropdown
      dropdownLabel="Select Key"
      options={[{ value: 'test', key: 'test' }]}
      additionalContainerClasses={`${
        appStyles['center-tile__dropdown']
      } w-100`}
    />
    <Button
      customClasses={`${appStyles['center-tile__button']} w-100`}
    >
      Start!
    </Button>
  </div>
);
