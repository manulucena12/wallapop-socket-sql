'use client'

import { getProductById, updateProduct } from '@/services/products'
import { Product } from '@/types'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Props {
    params: {
        productId: string
    }
}

export default function ProductCreate({params} : Props) {
  
    const { productId } = params
    const conditions = ['New', 'In good condition', 'Regular', 'Bad']
    const categories = ['Informatics', 'Games', 'Home', 'Study']
    const locations = ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Las Palmas', 'Bilbao']
    const [condition, setCondition] = useState('')
    const [category, setCategory] = useState('')
    const [location, setLocation] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [photo, setPhoto] = useState('')
    const [price, setPrice] = useState<number | null>(null)
    const [user_id, setId] = useState(0)
    const router = useRouter()

    useEffect(() => {
        getProductById(Number(productId))
        .then(response => {
            if(typeof response !== 'string'){
                setCategory(response.category)
                setCondition(response.condition)
                setLocation(response.location)
                setName(response.name)
                setDescription(response.description)
                setPrice(response.price)
                setPhoto(response.photo)
                setId(response.user_id)
            }
        })
    }, [])

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        if(!price){
            return
        }
        const product: Product = {
            category,
            condition,
            description,
            location,
            name,
            photo,
            price,
            user_id,
            id: Number(productId)
        }
        const updatedProduct = await updateProduct(product)
        if(typeof updatedProduct !== 'string'){
            router.push(`/home/myproducts/${user_id}`)
            router.refresh()
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md mt-5">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Update your product</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 bg-white"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 bg-white"
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="condition" className="block text-sm font-medium text-gray-700">Condition</label>
                    <select
                        id="condition"
                        name="condition"
                        onChange={(e) => setCondition(e.target.value)}
                        required
                        value={condition}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 bg-white"
                    >
                        <option value="">Select condition</option>
                        {conditions.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        id="category"
                        name="category"
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        value={category}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 bg-white"
                    >
                        <option value="">Select category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                    <select
                        id="location"
                        name="location"
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        value={location}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 bg-white"
                    >
                        <option value="">Select location</option>
                        {locations.map((location) => (
                            <option key={location} value={location}>{location}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={price ? price : 0}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        required
                        min="0"
                        step="0.01"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 bg-white"
                    />
                </div>

                <div>
                    <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Photo URL</label>
                    <input
                        type="url"
                        id="photo"
                        name="photo"
                        value={photo}
                        onChange={(e) => setPhoto(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 bg-white"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    )
}
