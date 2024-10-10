import { apiUrl } from "@/app/layout";
import { Review } from "@/types.d.";
import axios, { isAxiosError } from "axios";

export const submitReview = async (grade: number, content: string, reviewed: number, reviewer: number) : Promise<string | Review> => {
    try {
        const review = await axios.post(`${apiUrl}/reviews`, {grade, content, reviewer, reviewed})
        return review.data
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            return 'Internal server error'
        }
        return 'Internal server error'
    }
} 

export const deleteReview = async (userId:number, reviewId: number) : Promise<null | string> => {
    try {
        await axios.delete(`${apiUrl}/reviews/${reviewId}/${userId}`)
        return null
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            return 'Internal server error'
        }
        return 'Internal server error'
    }
} 

export const getReview = async (id: number ) : Promise<Review | string> => {
    try {
        const review = await axios.get(`${apiUrl}/reviews/single/${id}`)
        return review.data
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            return 'Internal server error'
        }
        return 'Internal server error'
    }
}

export const updateReview = async (review: Review, id: number) : Promise<Review | string> => {
    try {
        const updatedReview = await axios.put(`${apiUrl}/reviews/${id}`, review)
        return updatedReview.data
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            return 'Internal server error'
        }
        return 'Internal server error'
    }
} 