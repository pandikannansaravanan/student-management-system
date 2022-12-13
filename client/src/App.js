import React from 'react'
//import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Process from "./process";
import User from "./newuser";
//import { create } from "@mui/material/styles/createTransitions";
const App = () => {
  return (
    <Router>
    <Routes>
     <Route path="/" element={<Process />} />
     <Route path="/add" element={<User />} />
    </Routes>
   </Router>
  )
}
export default App