import React from 'react'
import {Link} from 'react-router-dom'

const Wishlist = ({wishlist}) => {
    return (
        <div className='p-10 px-5 sm:px-15 md:px-30 lg:px-40 min-h-screen'>
            <h1 style={{color:'#002f34'}} className='text-2xl font-bold'>
                Wishlist
            </h1>
            {wishlist.length===0?(
                <p className='pt-5 text-gray-500'>
                    No items in wishlist
                </p>
            ):(
                <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-5'>
                    {wishlist.map((item)=>(
                        <Link to='/details' state={{item}} key={item.id}>
                            <div style={{borderWidth:'1px',borderColor:'lightgrey'}} className='relative w-full h-72 rounded-md border-solid'>
                                <div className='w-full flex justify-center p-2 overflow-hidden'>
                                <img className='h-36 object-contain' src={item.imageUrl} alt={item.title} />
                            </div>
                            <div className='details p-1 pl-4 pr-4'>
                                <h1 style={{color:'#002f34'}} className='font-bold text-xl'>
                                    Rs.{item.price}
                                </h1>
                                <p className='text-sm pt-2'>
                                    {item.category}
                                </p>
                                <p className='pt-2'>
                                    {item.title}
                                </p>
                            </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
} 

export default Wishlist