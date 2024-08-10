import React from 'react'
import { Link } from 'react-router-dom'
const Success = () => {
  return (
    <div className='bg-green-200 w-full max-w-md m-auto h-36 flex justify-center items-center font-semibold text-lg'>
        <p>Payment is Successfully</p>
        <Link to={"ordercard"} className="whitespace-nowrap cursor-pointer px-2">Ordercard</Link>
    </div>
  )
}

export default Success