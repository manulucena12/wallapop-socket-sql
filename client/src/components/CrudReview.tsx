'use client'

import { deleteReview } from '@/services/review'
import { User } from '@/types.d'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface Props {
    username: string
    reviewId: number
}

export default function CrudReview(props: Props) {

    const [user, setUser] = useState<null |User>(null)
    const { username, reviewId } = props

    useEffect(() => {
        const userStoraged = window.localStorage.getItem('User')
        if(userStoraged){
            setUser(JSON.parse(userStoraged))
        }
    }, [])

    const handleDelete = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const res = await deleteReview(Number(user?.id), reviewId)
        if(!res){
            return window.location.reload()
        }
    }

    return (
        
        <div>
            {user?.username === username ? <div className='flex space-x-3'>
                <button onClick={handleDelete} className="bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-1 rounded transition duration-300">
                    Delete 
                </button> 
                <Link href={`/review/edit/${reviewId}`} className="bg-sky-600 hover:bg-sky-900 text-white font-bold py-2 px-1 rounded transition duration-300">
                    Update 
                </Link> 
            </div> : null}
        </div>
      )

}
