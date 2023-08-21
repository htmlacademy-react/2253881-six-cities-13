import React from 'react';
import Header from '../../components/header/header';

import MainPageContent from '../../components/main-page-content/main-page-content';
import './main-screen.css';

const MainScreen: React.FC = () => (
  <div className="page page--gray page--main">
    <Header />
    <MainPageContent />
  </div>
);
export default MainScreen;
