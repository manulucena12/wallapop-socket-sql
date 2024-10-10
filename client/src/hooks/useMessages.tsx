import { apiUrl } from '@/app/layout'
import { getSingleChat } from '@/services/chats'
import { getAllUsers } from '@/services/users'
import { Data, User } from '@/types'
import { Message } from '@/types'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export default function useMessages(chatId: string) {
  
    const [data, setData] = useState<null | Data>(null)
    const [users, setUsers] = useState<null | User[]>(null)
    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        getAllUsers()
        .then(res => {
            if(typeof res !== 'string'){
                setUsers(res)
            }
        })
        getSingleChat(chatId)
        const socket = io(`${apiUrl}`)
        if(socket){
            socket.on('Chat-Messages', (data: Data) => {
                setData(data)
                setMessages(data.messages)
            })
            socket.on('New-Message', (data: Message) => {
                setMessages(prevMessages => [...prevMessages, data])
            })
            socket.on('Update-Message', (data: Message) => {
                setMessages(prevMessages => prevMessages.map(m => m.id === data.id ? {...m, content: data.content, isedited: data.isedited} : m))
            })
            socket.on('Delete-Message', (data: {id: string}) => {
                setMessages(prevMessages => prevMessages.filter(m => m.id !== Number(data.id)))
            })
            return () => {
                socket.disconnect();
            };
        }
    }, [])

    return {data, users, messages}

}
