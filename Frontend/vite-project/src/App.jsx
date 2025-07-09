import { useState } from 'react'
import React from 'react'
import './App.css'
import AllRouter from './router.jsx'
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function App() {

  const Login_status = localStorage.getItem("key");
  console.log(Login_status);
  const navigate=useNavigate();




  return (
    < div className='w-full h-full'>
      <header className="flex w-full bg-gradient-to-l from-yellow-500   py-6 shadow-md">
        <div className="text-Start ml-2 text-2xl font-bold text-gray-800">
          Get ALL At One Place
          

        </div>
        <div className='w-full text-end mr-8 mt-3'>
            {
              Login_status
                ? <Button type='primary' onClick={()=>{navigate("/login"); localStorage.removeItem("key") }}>Logout</Button>
                : <Button type='primary'>Login</Button>
            }
          </div>


      </header>

      <AllRouter />
    </div>
  )
}

export default App

