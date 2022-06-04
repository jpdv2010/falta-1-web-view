import './App.css';
import DefaultLayout from './views/DefaultLayout';
import React, { Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

function App() {
  return (
    <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
    </HashRouter>
  );
}

export default App;
