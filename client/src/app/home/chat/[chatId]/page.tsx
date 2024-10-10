'use client'

import ChatForm from '@/components/ChatForm';
import ChatButtons from '@/components/ChatButtons';
import useMessages from '@/hooks/useMessages';

interface Props {
    params: {
        chatId: string
    }
}

export default function Page({params} : Props) {
  
    const { chatId } = params
    const { data, messages, users } = useMessages(chatId)

    if(!data || !users){
        return null
    }

    const dataChat = data.data

    const getUser = (userId: number) => {
        return users.find(user => user.id === userId)
    }

    const sellerUser = getUser(dataChat.seller)
    const interestedUser = getUser(dataChat.interested)

    return (
        <div className="max-w-4xl mx-auto p-4 mt-5">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="bg-teal-600 text-white p-4">
                    <h1 className="text-xl font-bold">Chat about {dataChat.product}</h1>
                    <div className="flex justify-between mt-2">
                        <span>Seller: {sellerUser?.fullname}</span>
                        <span>Interested: {interestedUser?.fullname}</span>
                    </div>
                </div>
                <div className="h-96 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => {
                        const sender = getUser(message.sender)
                        const isSeller = message.sender === dataChat.seller
                        return (
                            <div key={message.id} className={`flex ${isSeller ? 'justify-start' : 'justify-end'}`}>
                                <div className={`max-w-xs ${isSeller ? 'bg-gray-200' : 'bg-teal-100'} rounded-lg p-3`}>
                                    <div className='flex'>
                                        <p className="text-sm">{message.content}</p>
                                        <ChatButtons sender={sender?.username!} id={message.id} />
                                    </div>    
                                    <p className="text-xs text-gray-500 mt-1">
                                        {new Date(message.created).toLocaleString()} - {sender?.fullname}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {message.isedited ? 'Edited' : null}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <ChatForm interested={dataChat.interested} seller={dataChat.seller} chat={chatId} />
            </div>
        </div>
    )
}
