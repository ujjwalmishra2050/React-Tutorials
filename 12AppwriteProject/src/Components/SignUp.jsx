import React, { useState } from 'react'
import authservice from '../Appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import {Button  , Input , Logo} from './indes'
import { login } from '../Store/authSlice'
function SignUp() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error , setError] = useState()
    const{register , handleSubmit} = useForm()

    const create = async (data)=>{
        setError("")
        try {
       const userdata = await authservice.createAccount(data)   
       if (userdata) {
        const userData = await authservice.getCurrentUser()
        if (userData) dispatch(login(userData))
          navigate("/")
            
       }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div className='flex items-center justify-center'>
        <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
        <div className='mb-2 flex justify-center '>
         <span className='inline-block w-full max-w-[100px]'>
        <Logo width='100px'/>
        </span>
        </div>

        <h2 className='text-center text-2xl font-bold leading-tight'>
         Sign Up To Create An Account    
        </h2>
        <p className='mt-2 text-center text-base text-black/60'>
         Already Have An Account
         <Link
       to="/login"
       className='font-medium text-primary transition-all duration-200 hover:underline'
       >
       Sign In
       </Link>
        </p>
       {error && <p className='text-red-600 mt-8 text-center'>{error}
        </p>}
        <form onSubmit={handleSubmit(create)}>
         <div className='space-y-5'>
         <Input
         label = "Fullname"
         placeholder = "Enter Your Full Name"
         {...register("name" , {
          required : true
         })}
         />
           <Input
           label = "email"
           placeholder = "Enter Your Email"
           type = "email"
           {...register("email") , {
              required :true,
              validate:{
                  matchPattern :(value)=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                  .test(value)
                  ||
                  "email address must be a valid address"
              }
           }}
           />
          <Input
          label = "password"
          type = "password"
          placeholder = "Enter Your Password"
          {...register("password" ,{
            required:true
          })}
          />
        <Button
        type = "submit"
        className="w-full"
        >
        Create Account
        </Button>
         </div>
        </form>
        </div>
    </div>
  )
}

export default SignUp