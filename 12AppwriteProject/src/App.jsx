import { useState ,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import authService from './Appwrite/auth'
import {login ,logout  } from "./Store/authSlice";

import './App.css'

function App() {
  const [loading , setLoading] =useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userdata)=>{
     if (userdata) {
      dispatch(login({userdata}))
     }
     else{
      dispatch(logout())
     }
    })
    .finally(()=>setLoading(false))
  },[])

  return !loading (
    <div>
    <h1 className='text-4xl min-h-screen flex flex-wrap bg-gray-400'>

    </h1>
    <div className='w-full block'>
    <Headers/>
    <main>
      
    </main>
    </div>
    </div>
  )
}

export default App
