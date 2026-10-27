import React from 'react'
import { Link } from 'react-router-dom'
import favourite from '../../assets/favorite.svg'
import {FaHeart,FaRegHeart} from 'react-icons/fa'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../Firebase/Firebase'

const Card = ({items,wishlist,setWishlist}) => {
  const [user]=useAuthState(auth)
  const toggleWishlist=(item)=>{
    const exists=wishlist.find((wish)=>wish.id===item.id)
    if (exists){
      setWishlist(wishlist.filter((wish)=>wish.id!==item.id))
    }else{
      setWishlist([...wishlist,item])
    }
  }
  return (
    <div className='p-10 px-5 sm:px-15 md:px-30 lg:px-40 min-h-screen'>
      <h1 style={{color:'#002f34'}} className='text-2xl'>Fresh Recommendations</h1>
      <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-5'>
        {items.map((item)=>(
          <Link
          to={'/details'}
          state={{item}}
          key={item.id}
          style={{borderWidth:'1px',borderColor:'lightgrey'}}>
          <div key={item.id} style={{borderWidth:'1px',borderColor:'lightgray'}} className='relative w-full h-72 rounded-md border-solid '> 
            <div className='w-full flex justify-center p-2 overflow-hidden'>
              <img className='h-36 object-contain' src={item.imageUrl||'https://via.placeholder.com/150'} alt={item.title} />
            </div>
                <div className='details p-1 pl-4 pr-4'>
                    <h1 style={{color:'#002f34'}} className='font-bold text-xl'>Rs. {item.price}</h1>
                    <p className='text-sm pt-2'>{item.category}</p>
                    <p className='pt-2'>{item.title}</p>
                    <div onClick={(e)=>{
                      e.preventDefault()
                      toggleWishlist(item)
                    }} className='absolute flex justify-center items-center p-2 bg-white rounded-full top-3 right-3 cursor-pointer'>
                      {user && wishlist.some((wish)=>wish.id===item.id)?(
                        <FaHeart className='text-red-500 text-lg'/>
                      ):(
                        <FaRegHeart className='text-lg'/>
                      )}
                    </div>
                </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Card
