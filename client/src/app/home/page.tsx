import { getAllProducts } from '@/services/products';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Home'
}

export default async function Home() {
  
  const products = await getAllProducts()
  if(!Array.isArray(products)){
    return <p className='text-center mt-[200px]'>{products}</p>
  }


  return (
    <div className="container mx-auto py-8 max-w-[250px] sm:max-w-sm md:max-w-screen-sm lg:max-w-screen-md">
      <h1 className="text-3xl font-bold text-center mb-8">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <Link href={`/home/products/${product.id}`} key={product.id}>
          <div className="border rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow overflow-hidden">
            <img
              src={product.photo}
              alt={product.name}
              className="w-full h-64 object-cover" 
            />
            <div className="p-2 bg-slate-100">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <p>${product.price}</p>
                <p>{product.condition}</p>
                <p>{product.location}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
      </div>
    </div>
  );
}
