'use client'

import { getUserReviews } from '@/services/users'
import { Review, User } from '@/types.d'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Props {
    username: string,
    userId: string
} 

export default function ReviewButton(props: Props) {

    const [user, setUser] = useState<null | User>(null)
    const [reviews, setReviews] = useState<null | Review[]>(null)
    const { username, userId } = props

    useEffect(() =>{
        const userStoraged = window.localStorage.getItem('User')
        if(userStoraged){
            setUser(JSON.parse(userStoraged))
        }
        getUserReviews(Number(userId))
        .then(response => {
            if(typeof response !== 'string'){
                setReviews(response)
            }
        })
    }, [])

    const isReviewed = reviews?.some(r => r.reviewer === user?.id)

    if(isReviewed || !reviews){
        return null
    }

    return (
        <div>
            {user?.username !== username
            ? <Link href={`/review/${userId}`} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                Add Review
            </Link> 
            : null
            }
        </div>
    )

}
