import React, { useEffect, useState } from 'react'
import {Link,NavLink} from "react-router-dom"
import logo from "../assets/Logo.png";
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const {user,authDispatch}=useAuth();
// 1. THE MEMORY: Check local storage first, default to 'light'
    const [theme,setTheme]=useState(localStorage.getItem('theme') || 'light');

    // 2. THE SWITCH: Every time 'theme' changes, update the HTML tag and save to memory
    useEffect(()=>{
        if(theme==='dark'){
            document.documentElement.classList.add('dark');
        } else{
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme',theme);
    },[theme]);

    // Helper function to toggle the state
    const handleThemeSwitch=()=>{
        setTheme(theme==='dark'?'light':'dark');
    };
  return (
    <header className='flex py-4 px-6 bg-white/80 dark:bg-gray-900/90 dark:border-gray-800 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 '>

        <div className='w-12 h-12 rounded-full overflow-hidden mx-2  bg-white border-2 
        flex items-center justify-center cursor-pointer shadow-sm
        hover:scale-105 transition-transform'>
            <img src={logo} alt="app_logo" className='w-full h-full object-cover' />

        </div>

        <div className='flex items-center ' >
            <p className='text-2xl font-bold flex dark:text-white items-center gap-2 cursor-pointer'>EXPENSE MANAGER</p>
        </div>

        <nav className='ml-auto flex items-center  gap-20'>
            <NavLink className={({isActive})=>
            isActive? 'text-purple-500 ':'text-black dark:text-white'} to='/'>Home</NavLink>
            <NavLink className={({isActive})=>
            isActive? 'text-purple-500 ':'text-black dark:text-white'} to='/services'>Services</NavLink>
            <NavLink className={({isActive})=>
            isActive? 'text-purple-500':'text-black dark:text-white'} to='/contact'>Contact</NavLink>

            {/** Theme switch button */}
            <button onClick={handleThemeSwitch}
            className=' p-2 rounded-full   bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-yellow-400 
            hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer'>
                <span className="material-icons-outlined">
                        {theme === 'light' ? 'dark_mode' : 'light_mode'}
                    </span>
            </button>

            {
                user?(
                    <div className='flex items-center gap-4'>
                        <span className='font-semibold text-indigo-900 dark:text-white'>Hello, {user}</span>
                        <button
                        onClick={()=> authDispatch({type:'LOGOUT'})}
                        className='bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors
                        cursor-pointer '>LOGOUT</button>
                    </div>
                ):(
                    <NavLink
                    className={({isActive})=> isActive?'text-purple-500 font-semibold':'text-gray-700 hover:text-purple-500 transition-colors'}
                    to='/login'
                    >Login</NavLink>
                )
            }
            

        </nav>
        
                
                 

    </header>
  )
}

export default Navbar