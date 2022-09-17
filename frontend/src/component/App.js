
import './App.css';

import {  Routes, Route } from 'react-router-dom';
import ClubAdmin from "./Club_Admin"
import HomePage from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageNotFound from "./PageNotFound";
import React,{createContext,useReducer} from 'react';
import { initialState,reducer } from '../reducer/UseReducer';
import Logout from "./Logout";
import Faculty from "./Faculty"


export const UserContext=createContext();

function App() {
const [state,dispatch]=useReducer(reducer,initialState);

  return (

  <div style={{backgroundColor:"#f9f9f9"}} className="maindiv">
  <UserContext.Provider value={{state,dispatch}}>
  
  <Navbar/>
    <Routes>
  
           
           <Route  path="/club_admin" element={<ClubAdmin/>}/>
           <Route  path="/" element={<HomePage/>}/>
           <Route  path="/login" element={<Login/>}/>
           <Route  path="/signup" element={<Signup/>}/>
           <Route path="/Logout" element={<Logout/>}/>
           <Route path="/faculty"  element={<Faculty/>}/>
          
           <Route path='*' exact={true} element={<PageNotFound/>}/>
           
             
   </Routes>
   </UserContext.Provider>
   <Footer/>
  </div>
  );
}

export default App;
