import ContactButton from "@/components/ContactButton"
import { getProductById } from "@/services/products"
import { getAllUsers } from "@/services/users"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"


interface ProductPageProps {
    params: {
      productId: string
    }
}

export const metadata: Metadata = {
    title: `Product`
}

export default async function UniqueProductPage({params} : ProductPageProps){

    const { productId } = params

    const product = await getProductById(Number(productId))
    const users = await getAllUsers()
    

    if(!product || !users || typeof product === 'string' || typeof users === 'string'){
        return <p className="text-center font-bold text-3xl mt-[200px]">Product not found</p>
    }

    const userId = product.user_id
    const user = users.find(u => u.id === userId)

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden md:mt-20">
                <div className="md:flex">
                    <div className="md:flex-shrink-0">
                        <Image
                            src={product.photo}
                            alt={product.name}
                            width={500}
                            height={500}
                            className="h-96 w-full object-cover md:w-96"
                        />
                    </div>
                    <div className="p-8">
                        <div className="uppercase tracking-wide text-sm text-teal-500 font-semibold">
                            {product.category}
                        </div>
                        <h1 className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900">
                            {product.name}
                        </h1>
                        <p className="mt-2 text-3xl text-teal-600">
                            ${product.price}
                        </p>
                        <p className="mt-4 text-gray-500">
                            {product.description}
                        </p>
                        <div className="mt-6 flex items-center">
                            <svg className="h-5 w-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span className="ml-2 text-gray-600">{product.location}</span>
                        </div>
                        <div className="mt-2 flex items-center">
                            <svg className="h-5 w-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="ml-2 text-gray-600">{product.condition}</span>
                        </div>
                        <div className="mt-2 flex items-center">
                        <svg className="h-5 w-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>  
                            <span className="ml-2 text-gray-600">Is being sold by<Link href={`/home/users/${userId}`}>{' '}{user && user.username}</Link> </span>
                        </div>
                        <ContactButton userId={user?.id!} productId={Number(productId)} product={product.name} />
                    </div>
                </div>
            </div>
        </main>
    )
}