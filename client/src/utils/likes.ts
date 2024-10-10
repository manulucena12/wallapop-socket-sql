import { dislikeAProduct } from "@/services/likes"

export const handleDislike = async (e: React.SyntheticEvent, productId: number, userId: number) => {
    e.preventDefault()
    const dislike = await dislikeAProduct(productId, userId)
    if(!dislike){
        window.location.reload()
    }
}