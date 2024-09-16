import Link from 'next/link';

export default function Home() {
  const products = [
    {
      id: 1,
      name: "Gaming PC",
      price: 700,
      description: "I sell this PC because I do not use it",
      location: "Seville",
      condition: "New",
      category: "Informatics",
      photo: "https://m.media-amazon.com/images/I/71UmvqTuSbL.jpg",
      user_id: 6,
    },
    {
      id: 2,
      name: "Smartphone",
      price: 300,
      description: "Used smartphone in good condition",
      location: "Madrid",
      condition: "Used",
      category: "Electronics",
      photo: "https://cdn.thewirecutter.com/wp-content/media/2023/09/smartphone-2048px-0778-2x1-1.jpg?auto=webp&quality=75&crop=1.91:1&width=1200",
      user_id: 8,
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <div className="border rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow">
              <img
                src={product.photo}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="mt-4">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <div className='fle'>
                    <p className="text-gray-500">${product.price}</p>
                    <p className="text-gray-500">{product.condition}</p>
                    <p className="text-gray-400">{product.location}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
