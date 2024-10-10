import { getUserProducts } from "@/services/products"
import Link from 'next/link'
import Image from 'next/image'
import CrudProducts from "@/components/CrudProducts"

interface Props {
    params: {
        userId: string
    }
}

export default async function Page({params} : Props) {
    const { userId } = params

    const products = await getUserProducts(Number(userId))
    
    if(typeof products === 'string'){
        return <p className="text-center font-bold text-3xl mt-[200px]">Internal server error</p>
    }

    return (
        <div className="container mx-auto px-4 py-8 sm:max-w-screen-xs md:max-w-screen-md lg:max-w-screen-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">My Products on Sale</h1>
                <Link href={`/product/${userId}`} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                    Post New Product
                </Link>
            </div>

            {products.length === 0 ? (
                <p className="text-center text-gray-600 text-xl mt-[150px]">You don't have any products on sale yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <Link href={`/home/products/${product.id}`}>
                                <div className="relative h-48 w-full">
                                    <Image
                                        src={product.photo}
                                        alt={product.name}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
                                    <p className="text-teal-600 font-bold">${product.price}</p>
                                </div>
                            </Link>
                            <CrudProducts productId={product.id!} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
