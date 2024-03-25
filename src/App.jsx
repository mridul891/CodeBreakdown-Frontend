import CodeEditor from './Component/Editor'
import './App.css'
import Landing from './Component/Landing'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} >
        </Route>
        <Route path="/convert" element={<CodeEditor />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
