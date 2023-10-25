import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import Routes from './routes';
import AppProvider from './hooks/index';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes />
      </Router>
    </AppProvider>
  );
}

export default App;