import { apiUrl } from "@/app/layout"
import { Chat, Message } from "@/types"
import axios, { isAxiosError } from "axios"

export const getUserChats = async (id: string) : Promise<string | Chat[]> => {
    try {
        const chats = await axios.get(`${apiUrl}/chats/user/${id}`)
        return chats.data
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            return 'Internal server error'
        }
        return 'Internal server error'
    }
}

export const getSingleChat = async (id: string) : Promise<string | Message[]> => {
    try {
        const chats = await axios.get(`${apiUrl}/chats/${id}`)
        return chats.data
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            return 'Internal server error'
        }
        return 'Internal server error'
    }
}

export const createChat = async (product: string, seller: number, interested: number) : Promise<string | Chat> => {
    try {
        const newChat = await axios.post(`${apiUrl}/chats`, {product, seller, interested})
        return newChat.data
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            return 'Internal server error'
        }
        return 'Internal server error'
    }
}

export const deleteChat = async (userId: string, chatId: number) : Promise<string | null> => {
    try {
        await axios.put(`${apiUrl}/chats`, {userId, chatId})
        return null
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            return 'Internal server error'
        }
        return 'Internal server error'
    }
}