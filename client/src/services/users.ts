import { apiUrl } from "@/config"
import { Review, User } from "@/types.d"
import axios, { isAxiosError } from "axios"

export const getAllUsers = async () : Promise<User[] | string> => {
    try {
        const res = await axios.get(`${apiUrl}/users`)
        return res.data
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            return 'Internal server error'
        }
        return 'Internal server error'
    }
}

export const getUser = async (id: string) : Promise<User | string> => {
    try {
        const res = await axios.get(`${apiUrl}/users/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            return 'Internal server error'
        }
        return 'Internal server error'
    }
}

export const getUserReviews = async (id: number) : Promise<Review[] | string> => {
    try {
        const res = await axios.get(`${apiUrl}/reviews/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            return 'Internal server error'
        }
        return 'Internal server error'
    }
}

export const loginService = async (username: string, password: string) : Promise<User | string> => {
    try {
        const user = await axios.post(`${apiUrl}/auth/signin`, {username, password})
        return user.data
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            return 'Internal server error'
        }
        return 'Internal server error'
    }
}

export const createUser = async (username: string, name: string, lastName: string, password: string) : Promise<string | null> => {
    try {
        await axios.post(`${apiUrl}/auth/signup`, {username, password, name, lastName})
        return null
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            return 'Internal server error'
        }
        return 'Internal server error'
    }
}

export const deleteUser = async (username: string, password: string) : Promise<null | string> => {
    try {
        await axios.post(`${apiUrl}/auth/signout`, {username, password})
        return null
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            return 'Internal server error'
        }
        return 'Internal server error'
    }
}

export const updateUser = async (username: string, name: string, lastName: string, password: string, id: string) : Promise<string | null> => {
    try {
        await axios.put(`${apiUrl}/auth/signupdate`, {username, password, name, lastName, id})
        return null
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            return 'Internal server error'
        }
        return 'Internal server error'
    }
}
