import React from 'react';
import ReactDOM from 'react-dom/client';
import ContextProvider from '../GlobalState/provider'
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import './App.css';
import StartPage from './pages/StartPage/StartPage';
import Header from './components/Header/Header';
import SignUpForm from './components/AuthForms/SignUpForm';
import SignInForm from './components/AuthForms/SignInForm';
import AdminPanel from './pages/AdminPanelPage/AdminPanel';
import FileStorage from './pages/FileStoragePage/FileStorage';
import Page404 from './pages/Error404Page/Page404';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ContextProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/my-storage" element={<FileStorage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  </ContextProvider>,
);

