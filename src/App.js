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

const Login = React.lazy(() => import('./views/pages/Login'))
const Register = React.lazy(() => import('./views/pages/Register'))

function App() {
  return (
    <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="*" name="Home" element={<DefaultLayout />} />
            <Route exact path="/logout" name="Login Page" element={<Login logout={true}/>} />
          </Routes>
        </Suspense>
    </HashRouter>
  );
}

export default App;
