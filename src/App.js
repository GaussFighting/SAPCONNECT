// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Table from './components/Table'; 

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Table />} />
    </Routes>
  </Router>
);

export default App;
