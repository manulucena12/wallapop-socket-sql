import { getAllProducts } from "@/services/products"
import { Product } from "@/types"
import { useEffect, useState } from "react"

export default function useSearch() {
  
    useEffect(() => {
        getAllProducts()
        .then(res => {
            if(typeof res !== 'string'){
                setOldProducts(res)
            }
        })
    }, [])

    const [name, setName] = useState('')
    const [condition, setCondition] = useState('')
    const [category, setCategory] = useState('')
    const [location, setLocation] = useState('')
    const [minumPrice, setMinumPrice] = useState<number>(0)
    const [maxPrice, setMaxPrice] = useState<number>(0)
    const [products, setProducts] = useState<Product[]>([])
    const [oldProducts, setOldProducts] = useState<Product[]>([])

    const applyFilters = () => {
        let filteredProducts = oldProducts
        if (name) {
            filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(name.toLowerCase()))
        }
        if (category) {
            filteredProducts = filteredProducts.filter(p => p.category === category)
        }
        if (condition) {
            filteredProducts = filteredProducts.filter(p => p.condition === condition)
        }
        if (location) {
            filteredProducts = filteredProducts.filter(p => p.location === location)
        }
        if (minumPrice) {
            filteredProducts = filteredProducts.filter(p => p.price >= minumPrice)
        }

        if (maxPrice) {
            filteredProducts = filteredProducts.filter(p => p.price <= maxPrice)
        }
        setProducts(filteredProducts)
    }

    useEffect(() => {
        applyFilters()
    }, [name, category, condition, location, minumPrice, maxPrice])

    return { products, name, setName, location, setLocation, category, setCategory, condition, setCondition, minumPrice, setMinumPrice, maxPrice, setMaxPrice }

}
