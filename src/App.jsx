import CodeEditor from './Component/Editor'
import './App.css'
import Landing from './Component/Landing'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LoginForm } from './Component/Login';
import { SignupForm } from './Component/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/convert" element={<CodeEditor />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
