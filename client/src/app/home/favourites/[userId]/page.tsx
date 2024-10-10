import { getUserFavourites } from '@/services/likes'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { handleDislike } from '@/utils/likes'
import Dislike from '@/components/Dislike'

interface Props {
    params: {
        userId: string
    }
}

export default async function FavouritesPage({params}: Props) {
  
    const { userId } = params
    const likes = await getUserFavourites(userId)
    if(typeof likes === 'string'){
        return null
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Favorites</h1>
            {likes.length === 0 ? (
                <p className="text-gray-600">You haven't added any products to your favorites yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {likes.map((product) => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="relative h-48">
                                <Image
                                    src={product.photo}
                                    alt={product.name}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
                                <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-teal-600 font-bold">${product.price}</span>
                                    <span className="text-sm text-gray-500">{product.location}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                                    <span>{product.condition}</span>
                                    <span>{product.category}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Link href={`/home/products/${product.id}`} className="text-teal-600 hover:text-teal-800 font-medium">
                                        View Details
                                    </Link>
                                    <Dislike productId={product.id!} userId={Number(userId)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
