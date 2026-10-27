import React, { useState,useEffect } from 'react'
import Sell from '../Modal/Sell' 
import Card from '../Card/Card' 
import {ItemsContext} from '../Context/Item' 
import { fetchFromFirestore } from '../Firebase/Firebase'

const Home = ({wishlist,setWishlist}) => {
  const [openModal,setModal]=useState(false) 
  const [openModalSell,setModalSell]=useState(false)
  const toggleModal = ()=>{setModal(!openModal)}
  const toggleModalSell = ()=>{setModalSell(!openModalSell)}
  const ItemsCtx=ItemsContext() 
  useEffect(()=>{
    const getItems = async ()=>{
      const datas = await fetchFromFirestore() 
      ItemsCtx?.setItems(datas)
    } 
    getItems()
  },[])
  useEffect(()=>{
    console.log('updated items:',ItemsCtx.items)
  })
  return (
    <div>
      <Sell setItems={(ItemsCtx).setItems} toggleModalSell={toggleModalSell} status={openModalSell}/>
      <Card items={(ItemsCtx).items||[]} wishlist={wishlist} setWishlist={setWishlist}/>
    </div>
  )
}

export default Home
