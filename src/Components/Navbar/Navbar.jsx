import React from 'react'
import './Navbar.css'
import logo from '../../assets/symbol.png' 
import search from '../../assets/search.svg'
import arrow from '../../assets/arrow-down.svg'
import searchwt from '../../assets/search.svg'
import {useAuthState} from 'react-firebase-hooks/auth' 
import { auth } from '../Firebase/Firebase'
import addBtn from '../../assets/addButton.png'
import { signOut,getAuth } from 'firebase/auth'
import favourite from '../../assets/favorite.svg'
import { withoutThemingProps } from 'flowbite-react/helpers/without-theming-props'
import {FaRegHeart} from 'react-icons/fa' 
import { Link } from 'react-router-dom'

const Navbar = (props) => { 
  const [user]=useAuthState(auth)
  const {toggleModal,toggleModalSell,wishlist=[]}=props 
  const handleLogout=async ()=>{
    try{
      await signOut(auth)
      console.log('user logged out')
    }catch(error){
      console.log(error)
    }
  }
  return (
    <div>
      <nav className='fixed z-50 w-full flex items-center overflow-auto p-2 pl-3 pr-3 shadow-md bg-slate-100 border-b-4 border-solid border-b-white'>
        <img src={logo} alt="" className='w-12 h-12 object-contain border border-red-500'/>
        <div className='relative location-search ml-5'>
            <img src={search} alt="" className='absolute top-4 left-2 w-5'/>
            <input type="text" placeholder='Search city, area or locality...' className='w-[50px] sm:w-[150px] md:w-[250px] lg:w-[270px] p-3 pl-8 border-black border-solid border-2 rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300'/> 
            <img src={arrow} alt="" className='absolute top-4 right-3 w-5 cursor-pointer'/>
        </div> 
        <div className='ml-5 mr-2 relative w-full main-search'>
            <input type="text" name="" id="" placeholder="Find cars, mobile phones and more..." className='w-full p-3 border-black border-solid border-2 rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300'/> 
            <div style={{backgroundColor:'#002f34'}} className='flex justify-center items-center absolute top-0 right-0 h-full rounded-e-md w-12'>
                <img src={searchwt} alt="" className='w-5 filter invert'/>
            </div>
        </div>
        <div className='mx-1 sm:ml-5 sm:mr-5 relative lang'>
            <p className='font-bold mr-3'>English</p> 
            <img src={arrow} alt="" className='w-5 cursor-pointer'/>
        </div>  
        {user && (
        <Link to='/wishlist'>
        <div className='relative cursor-pointer mx-4'> <img src={favourite} alt="" className='w-7'/> {wishlist.length>0 && ( <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1'> {wishlist.length} </span> )} Wishlist </div>
        </Link>
        )}
        {!user?(
        <p onClick={toggleModal}>Login</p>
        ) : (
        <div className='relative'>
          <p style={{color:'#002f34'}} className='font-bold ml-5 cursor-pointer'>{user.displayName?.split(' ')[0]}</p>
        </div>
)}
        <img src={addBtn} 
        onClick={user?toggleModalSell:toggleModal}
        className='w-24 mx-1 sm:ml-5 sm:mr-5 shadow-xl rounded-full cursor-pointer' alt="" />  
        {user&&(
        <button onClick={handleLogout}>Logout</button>
        )}
      </nav>
      <div className='w-full relative z-0 flex shadow-md p-2 pt-20 pl-10 pr-10 sm:pl-44 md:pr-44 sub-lists'>
        <ul className='list-none flex items-center justify-between w-full'>
          <div className='flex flex-shrink-0'>
            <p className='font-semibold uppercase all-cats'>All categories</p> 
            <img src={arrow} className='w-4 ml-2' alt="" />
          </div> 
          <li>Cars</li>
          <li>Motorcycles</li>
          <li>Mobile Phones</li>
          <li>For Sale: Houses & Apartments</li>
          <li>Scooter</li>
          <li>Commercial & Other Vehicles</li>
          <li>For Rent: Houses & Apartments</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
