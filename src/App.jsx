import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard"
import { Routes,Route } from 'react-router-dom';


function APP() {
    return ( 
        
        <div className="d-flex align-items-center justify-content-center cont bg-info ">
          <Routes>
          <Route index  element={<Login/>}></Route>
          <Route path="/Register" element={<Register/>}></Route>
          <Route path="/Dashboard" element={<Dashboard/>}></Route>
        </Routes>
        </div>
        
     );
}

export default APP;