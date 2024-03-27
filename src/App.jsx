import CodeEditor from './Component/Editor'
import './App.css'
import Landing from './Component/Landing'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LoginForm } from './Component/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} >
          <Route index element={<Landing />} />
        </Route>
        <Route path="/convert" element={<CodeEditor />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
