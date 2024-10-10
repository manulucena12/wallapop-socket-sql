'use client'

import { handleDislike } from '@/utils/likes'
import React from 'react'

interface Props {
    productId: number,
    userId: number
}

export default function Dislike(props: Props) {
    const { productId, userId } = props
  return (
    <button
        onClick={(e) => handleDislike(e, productId, userId)}
        className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center"
    >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
        Remove
    </button>
  )
}
