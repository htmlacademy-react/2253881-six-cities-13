import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainScreen from '../../pages/main-screen/main-screen';
import { offersCount } from '../../consts';

const App: React.FC = () => (
  <BrowserRouter>
    <MainScreen countOffers={offersCount} />
  </BrowserRouter>
);

export default App;
