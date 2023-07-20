import React from 'react';
import { SearchPage } from './components/SearchPage/SearchPage';
import i18n from './i18n';

i18n.changeLanguage();

const App: React.FC = () => {
  return <SearchPage />;
};

export default App;
