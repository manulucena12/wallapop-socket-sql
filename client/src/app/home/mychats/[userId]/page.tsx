import { getUserChats } from '@/services/chats'
import { getAllUsers } from '@/services/users'
import React from 'react'
import Link from 'next/link'
import DeleteChat from '@/components/DeleteChat'

interface Props {
    params: {
        userId: string
    }
}

export default async function Page({params} : Props) {
    const { userId } = params
    const userChats = await getUserChats(userId)
    const users = await getAllUsers()
    
    if(typeof userChats === 'string' || typeof users === 'string'){
        return null
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Your Chats</h1>

            <ul className="space-y-4">
                {userChats.map((chat) => {
                    const notUser = chat.seller === Number(userId) ? chat.interested : chat.seller
                    const user = chat.seller === Number(userId) ? true : false
                    const isShown = user ? chat.sellerview : chat.interestedview
                    const withUser = users.find(u => u.id === notUser)
                    if(!withUser){return null}
                    return (
                        <li key={chat.id}>
                            {isShown && 
                            <Link 
                            href={`/home/chat/${chat.id}`}
                            className="block p-4 bg-white shadow rounded-lg hover:shadow-md transition-shadow"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-medium">Product: {chat.product}</span>
                                    <span className="text-sm text-gray-500">
                                    </span>
                                    <DeleteChat withUser={withUser.username} userId={userId} chatId={chat.id} />
                                </div>
                                <div className="mt-2 text-sm text-gray-600">
                                    Chat with: {withUser.username}
                                </div>
                            </Link>
                            }
                        </li>
                    )
                })}
            </ul>

            {userChats.length === 0 && (
                <p className="text-center text-gray-500 mt-6">You don't have any chats yet.</p>
            )}
        </div>
    )
}
