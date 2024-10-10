'use client'

import { createMessage } from "@/services/messages"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Props {
    seller: number,
    interested: number,
    chat: string
}

export default function ChatForm(props : Props) {

    const { interested, seller, chat } = props
    const [sender, setSender] = useState<number | null>(null)
    const router = useRouter()
    useEffect(() => {
        const storagedUser = window.localStorage.getItem('User')
        if(!storagedUser){
            window.localStorage.clear()
            return router.push('/')
        }
        const user = JSON.parse(storagedUser)
        if(user.id !== interested && user.id !== seller){
            window.localStorage.clear()
            return router.push('/')
        }
        setSender(user.id)
    }, [])

    if(!sender){
        return null
    }

    const handleMessage = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const content = (document.getElementById('content') as HTMLInputElement).value
        await createMessage(content, Number(chat), sender)
    }
  
    return (
        <div className="p-4 border-t">
            <form className="flex space-x-2" onSubmit={handleMessage}>
                <input
                    type="text"
                    id="content"
                    placeholder="Type your message..."
                    className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                    type="submit"
                    className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                    Send
                </button>
            </form>
        </div>
      )

}
