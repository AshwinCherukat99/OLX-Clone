import React,{useState,useEffect} from 'react' 
import Home from './Components/Pages/Home' 
import Details from './Components/Details/Details'
import {Route,Routes} from 'react-router-dom'
import Wishlist from './Components/Pages/Wishlist'
import Navbar from './Components/Navbar/Navbar'
import Login from './Components/Modal/Login'

const App = () => { 
  const [openModal,setModal]=useState(false) 
  const [openModalSell,setModalSell]=useState(false)
  const toggleModal = ()=>{setModal(!openModal)}
  const toggleModalSell = ()=>{setModalSell(!openModalSell)}
  const [wishlist,setWishlist]=useState(()=>{
    const savedWishlist=localStorage.getItem('wishlist')
    return savedWishlist?JSON.parse(savedWishlist):[]
  })
  useEffect(()=>{
    localStorage.setItem("wishlist",JSON.stringify(wishlist))
  },[wishlist])
  return (
    <>
    <Navbar toggleModal={toggleModal} toggleModalSell={toggleModalSell} wishlist={wishlist}/>
    <Login toggleModal={toggleModal} status={openModal}/>
    <Routes> 
      <Route path='/wishlist' element={<Wishlist wishlist={wishlist}/>}/>
      <Route path='/' element={<Home wishlist={wishlist} setWishlist={setWishlist}/>}/>
      <Route path='/details' element={<Details/>}/>
    </Routes>
    </>
  )
}

export default App
