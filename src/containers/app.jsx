import React, { useEffect, useState } from 'react';
// import Header from './header';
import { Suspense } from 'react';
// import {  Routes } from "react-router-dom"
import { auth } from '../firebase/firebase';
import Login from '../components/Login';
import Register from '../components/Register';
import Home from '../pages/Home';
import { Navigate, Route,Routes } from 'react-router-dom';
// import SignOut from '../components/SignOut';



const App = () => {

  const [authUser,setAuthUser ]= useState(null);

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((user)=>{
      setAuthUser(user);
    });
    return unsubscribe;
  },[]);




  return (
    <>        
   <Suspense fallback={<div>loading...</div>}>
   
    <Routes>
       <Route path="/Login" element={<Login />} /> 
       <Route path="/Register" element={<Register />} /> 

       <Route path="/home" element={ authUser ? <Home/> : <Navigate to="/Login"/>} />
       <Route path='*' element={<Navigate to={authUser ? "/home ":"/Login"}/>}/> 
        </Routes> 
       

      
       </Suspense>
    </>
  )
}

export default App;