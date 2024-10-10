import { apiUrl } from "@/app/layout"
import { Product } from "@/types.d"
import axios, { isAxiosError } from "axios"

export const getAllProducts = async () : Promise<Product[] | string> => {
    try {
        const res = await axios.get(`${apiUrl}/products`)
        return res.data
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            return 'Internal server error'
        }
        return 'Internal server error'
    }
}

export const getProductById = async (id: number) : Promise<Product | string> => {
    try {
        const res = await axios.get(`${apiUrl}/products/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            return 'Internal server error'
        }
        return 'Internal server error'
    }
}

export const getUserProducts = async (id: number) : Promise<Product[] | string> => {
    try {
        const res = await axios.get(`${apiUrl}/products/user/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            return 'Internal server error'
        }
        return 'Internal server error'
    }
}

export const createProduct = async (product: Product) : Promise<Product | string> => {
    try {
        const res = await axios.post(`${apiUrl}/products`, product)
        return res.data
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            return 'Internal server error'
        }
        return 'Internal server error'
    }
}

export const deleteProduct = async (productId: number, userId: number) : Promise<null | string> => {
    try {
        await axios.post(`${apiUrl}/products/delete`,{productId, userId})
        return null
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            return 'Internal server error'
        }
        return 'Internal server error'
    }
}

export const updateProduct = async (product: Product) : Promise<Product | string> => {
    try {
        const res = await axios.put(`${apiUrl}/products`, product)
        return res.data
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            return 'Internal server error'
        }
        return 'Internal server error'
    }
}
