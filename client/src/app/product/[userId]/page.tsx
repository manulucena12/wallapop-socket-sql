'use client'

import { createProduct } from '@/services/products'
import { Product } from '@/types.d'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Props {
    params: {
        userId: string
    }
}

export default function ProductCreate({params} : Props) {
  
    const { userId } = params
    const conditions = ['New', 'In good condition', 'Regular', 'Bad']
    const categories = ['Informatics', 'Games', 'Home', 'Study']
    const locations = ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Las Palmas', 'Bilbao']
    const [condition, setCondition] = useState('')
    const [category, setCategory] = useState('')
    const [location, setLocation] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const nameInput = document.getElementById('name') as HTMLInputElement
        const descriptionInput = document.getElementById('description') as HTMLInputElement 
        const priceInput = document.getElementById('price') as HTMLInputElement
        const photoInput = document.getElementById('photo') as HTMLInputElement 
        const newProduct: Product = {
            category,
            condition,
            location,
            photo: photoInput.value,
            name: nameInput.value,
            price: Number(priceInput.value),
            description: descriptionInput.value,
            user_id: Number(userId)
        }
        const product = await createProduct(newProduct)
        if(typeof product !== 'string'){
            router.push(`/home/myproducts/${userId}`)
            router.refresh()
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md mt-5">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Create New Product</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
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
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 bg-white"
                    >
                        <option value="">Select condition</option>
                        {conditions.map((condition) => (
                            <option key={condition} value={condition}>{condition}</option>
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
                        
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 bg-white"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                        Create Product
                    </button>
                </div>
            </form>
        </div>
    )
}