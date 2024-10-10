'use client'

import { deleteProduct } from '@/services/products'
import { User } from '@/types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface Props {
    productId: number
}

export default function CrudProducts(props: Props) {

    const { productId } = props
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const storagedUser = window.localStorage.getItem('User')
        if(storagedUser){
            setUser(JSON.parse(storagedUser))
        }
        
    }, [])

    if(!user){
        return null
    }

    const handleDelete = async(e: React.SyntheticEvent) => {
        e.preventDefault()
        if(window.confirm('Are you sure you want to delete this product?')){
            const res = await deleteProduct(productId, user.id)
            if(!res){
                router.refresh()
            }
        }
    }

    return (
        <div className="px-4 pb-4 flex justify-between">
            <Link href={`/product/edit/${productId}`} className="text-blue-500 hover:text-blue-700">
                Modify
            </Link>
            <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
                Delete
            </button>
        </div>
      ) 
}
