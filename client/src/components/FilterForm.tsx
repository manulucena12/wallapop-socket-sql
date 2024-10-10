import React, { Dispatch, SetStateAction } from 'react'

interface Props {
    maxPrice:number, 
    minumPrice: number, 
    name: string, 
    setCategory: Dispatch<SetStateAction<string>>, 
    setCondition: Dispatch<SetStateAction<string>>, 
    setLocation: Dispatch<SetStateAction<string>>, 
    setMaxPrice: Dispatch<SetStateAction<number>>, 
    setMinumPrice: Dispatch<SetStateAction<number>>, 
    setName: Dispatch<SetStateAction<string>>
}

export default function FilterForm(props: Props) {

    const { maxPrice, minumPrice, name, setCategory, setCondition, setLocation, setMaxPrice, setMinumPrice, setName } = props

    const conditions = ['New', 'In good condition', 'Regular', 'Bad']
    const categories = ['Informatics', 'Games', 'Home', 'Study']
    const locations = ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Las Palmas', 'Bilbao']

  return (
    <div className="max-w-2xl mx-auto p-9 mt-[10px]">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Find what you are looking for</h1>
                
                <div className="mb-6">
                    <input
                        onChange={(e) => setName(e.target.value)}  
                        value={name} 
                        type="text"
                        placeholder="Search products..."
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                        <select onChange={(e) => setCondition(e.target.value)} id="condition" className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500">
                            <option value="">Select condition</option>
                            {conditions.map((condition) => (
                                <option key={condition} value={condition}>{condition}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select onChange={(e) => setCategory(e.target.value)} id="category" className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500">
                            <option value="">Select category</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <select onChange={(e)  => setLocation(e.target.value)} id="location" className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500">
                            <option value="">Select location</option>
                            {locations.map((location) => (
                                <option key={location} value={location}>{location}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">Budget Range ($)</label>
                        <div className="flex items-center space-x-2">
                            <input
                                onChange={(e) => setMinumPrice(Number(e.target.value))}
                                value={minumPrice}
                                type="number"
                                id="budget-min"
                                placeholder="Min"
                                className="w-1/2 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            <span className="text-gray-500">-</span>
                            <input
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                                value={maxPrice}
                                type="number"
                                id="budget-max"
                                placeholder="Max"
                                className="w-1/2 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                    </div>
                </div>
                <button 
                    onClick={() => {window.location.reload()}} 
                    className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition duration-300 ease-in-out">
                    Clear
                </button>
            </div>
  )
}
