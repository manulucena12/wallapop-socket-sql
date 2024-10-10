'use client'

import { deleteChat } from "@/services/chats";
import { useRouter } from "next/navigation"

interface Props {
    withUser: string,
    userId: string,
    chatId: number
}

export default function DeleteChat(props: Props) {

    const { withUser , userId, chatId} = props
    const router = useRouter();

    const handleDeleteChat = async (e:React.SyntheticEvent) => {
        e.preventDefault()
        if(window.confirm(`Are you sure you want to delete your chat with ${withUser}?. Note: ${withUser} will be able to access to this chat even though you delete it.`)){
            const deletedChat = await deleteChat(userId, chatId)
            if(!deletedChat){
                router.refresh()
            } 
        }
    }

    return (
        <button
            className="mt-2 text-gray-500 hover:text-red-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            aria-label={`Delete chat with ${withUser}`}
            onClick={handleDeleteChat}
        >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
            </svg>
        </button>
      )
}
