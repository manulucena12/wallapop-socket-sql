'use client'

import FilterForm from "@/components/FilterForm"
import useSearch from "@/hooks/useSearch"
import Image from 'next/image'
import Link from 'next/link'

export default function SearchPage() {

    const { products, maxPrice, minumPrice, name, setCategory, setCondition, setLocation, setMaxPrice, setMinumPrice, setName } = useSearch()
 
    return (
        <div>
            <FilterForm 
                maxPrice={maxPrice} 
                minumPrice={minumPrice} 
                name={name} 
                setCategory={setCategory} 
                setCondition={setCondition} 
                setLocation={setLocation} 
                setMaxPrice={setMaxPrice} 
                setMinumPrice={setMinumPrice}
                setName={setName}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Search Results</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <Link href={`/home/products/${product.id}`} key={product.id} className="block">
                            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <div className="relative h-48">
                                    <Image
                                        src={product.photo}
                                        alt={product.name}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                                    <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-teal-600 font-bold">${product.price}</span>
                                        <span className="text-sm text-gray-500">{product.location}</span>
                                    </div>
                                    <div className="mt-2 flex justify-between items-center text-sm text-gray-500">
                                        <span>{product.condition}</span>
                                        <span>{product.category}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}