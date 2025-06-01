import React from "react";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

import Register from "./Pages/Register";
import Home from "./Components/Home";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";



const App=()=>{
  return(
     <Router>
    <ToastContainer/>
    <Routes>
      
      <Route path="/" element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
  </Router>
  )
 
}

export default App;