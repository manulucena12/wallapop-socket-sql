import { apiUrl } from "@/app/layout"
import { Like, Product } from "@/types"
import axios, { isAxiosError } from "axios"

export const getProductLikes = async (id: number) : Promise<string | Like[]> => {
    try {
        const likes = await axios.get(`${apiUrl}/likes/${id}`)
        return likes.data
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            return 'Internal server error'
        }
        return 'Internal server error'
    }
}

export const getUserFavourites = async (id: string) : Promise<string | Product[]> => {
    try {
        const likes = await axios.get(`${apiUrl}/likes/user/${id}`)
        return likes.data
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            return 'Internal server error'
        }
        return 'Internal server error'
    }
}

export const likeAProduct = async (product: number, likedby: number) : Promise<string | Like> => {
    try {
        const like = await axios.post(`${apiUrl}/likes`, {product, likedby})
        return like.data
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            return 'Internal server error'
        }
        return 'Internal server error'
    }
}

export const dislikeAProduct = async (product: number, likedby: number) : Promise<null | string> => {
    try {
        await axios.delete(`${apiUrl}/likes/${product}/${likedby}`)
        return null
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            return 'Internal server error'
        }
        return 'Internal server error'
    }
}