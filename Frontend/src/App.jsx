import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './Pages/Home';
import { SignUp } from './Pages/SignUp';
import { Login } from './Pages/Login';
import { CodeEditor } from './Pages/CodeEditor';
import "./App.css";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

function App() {

    const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');

    return (
        <BrowserRouter>
            <Routes>
            {!token ? (
                    <>
                        <Route path='/signup' element={<SignUp />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='*' element={<Navigate to='/login' replace />} />
                    </>
                ) : (
                    <>
                        <Route path='/' element={<Home />} />
                        <Route path='/codeEditor/:projectID' element={<CodeEditor />} />
                        <Route path='/signup' element={<SignUp />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='*' element={<Navigate to='/' replace />} />
                    </>
                )}
            </Routes>
            <Toaster />
        </BrowserRouter>
    );
}

export default App;