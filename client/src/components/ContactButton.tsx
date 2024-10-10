'use client'

import { Chat, Like, User } from "@/types"
import { useEffect, useState } from "react"
import CrudProducts from "./CrudProducts"
import { createChat, getUserChats } from "@/services/chats"
import { useRouter } from "next/navigation"
import { dislikeAProduct, getProductLikes, likeAProduct } from "@/services/likes"
import { handleDislike } from "@/utils/likes"
import Link from "next/link"

interface Props {
    userId: number,
    productId: number,
    product: string,
}

export default function ContactButton(props: Props) {

    const { userId, productId, product } = props
    const [user, setUser] = useState<null | User>(null)
    const [likes, setLikes] = useState<null | Like[]>(null)
    const [chats, setChats] = useState<null | Chat[]>(null)
    const router = useRouter()
    useEffect(() => {
        const storagedUser = window.localStorage.getItem('User')
        if(storagedUser){
            setUser(JSON.parse(storagedUser))
        }
        getProductLikes(productId)
        .then(res => {
            if(typeof res !== 'string'){
                setLikes(res)
            }
        })
        getUserChats(userId.toString())
        .then(res => {
            if(typeof res !== 'string'){
                setChats(res)
            }
        })
    }, [])

    if(!user || !likes || !chats){
        return null
    }

    const isLiked = likes.some(l => l.likedby === user.id)
    const isContacted = chats.find(c => c.product === product)

    const handleChat = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const newChat = await createChat(product, userId, user.id)
        if(typeof newChat !== 'string'){
            router.refresh()
            router.push(`/home/chat/${newChat.id}`)
        }
    }

    const handleLike = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const newLike = await likeAProduct(productId, user.id)
        if(typeof newLike !== 'string'){
            window.location.reload()
        }
    }

    

    return (
        <div>
            {user.id !== userId ? (
                <div className="space-x-4 flex">
                    {isContacted 
                        ?
                        <Link
                        href={`/home/chat/${isContacted.id}`}
                        className="mt-8 bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                    >
                        You are in contact with this seller
                    </Link> 
                    :
                    <button
                        onClick={handleChat}
                        className="mt-8 bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                    >
                        Contact Seller
                    </button> 
                    }
                    {isLiked ? (
                        <button
                            onClick={(e) => handleDislike(e, productId, user.id)}
                            className="mt-8 bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                            Remove from favorites
                        </button> 
                    ) : (
                        <button
                            onClick={handleLike}
                            className="mt-8 bg-white text-red-500 border border-red-500 font-bold py-2 px-4 rounded hover:bg-red-50 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            Add to favorites
                        </button>
                    )}
                </div>
            ) : (
                <div className="mt-5">
                    <CrudProducts productId={productId} />
                </div>
            )}
        </div>
    )

}
