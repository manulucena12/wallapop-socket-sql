import Image from 'next/image'
import Link from 'next/link'
import { User, Product } from '@/types.d'

interface UserProductsProps {
  user: User
  products: Product[]
}

export default function UserProducts({ user, products }: UserProductsProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {user.username}'s Products
          </h2>
          {products.length === 0 ? (
            <p className="text-gray-600">This user hasn't listed any products yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link href={`/home/products/${product.id}`} key={product.id}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer">
                    <div className="relative h-48 w-full">
                      <Image
                        src={product.photo}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{product.name}</h3>
                      <p className="text-teal-600 font-bold">${product.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
