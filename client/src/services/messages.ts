import { apiUrl } from "@/app/layout"
import { Message } from "@/types"
import axios, { isAxiosError } from "axios"

export const createMessage = async (content: string, chat: number, sender: number) : Promise<null | string> => {
    try {
        await axios.post(`${apiUrl}/messages`, {content, chat, sender})
        return null
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            return 'Internal server error'
        }
        return 'Internal server error'
    }
}

export const deleteMessage = async (id: number) : Promise<null | string> => {
    try {
        await axios.delete(`${apiUrl}/messages/${id}`)
        return null
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            return 'Internal server error'
        }
        return 'Internal server error'
    }
}

export const getMessage = async (id: number) : Promise<Message | string> => {
    try {
        const msg = await axios.get(`${apiUrl}/messages/${id}`)
        return msg.data
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            return 'Internal server error'
        }
        return 'Internal server error'
    }
}

export const updateMessage = async (id: number, content: string) : Promise<null | string> => {
    try {
        const msg = await axios.put(`${apiUrl}/messages`, {id, content})
        return null
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            return 'Internal server error'
        }
        return 'Internal server error'
    }
}