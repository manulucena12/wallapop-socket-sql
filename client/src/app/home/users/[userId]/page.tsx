import UserProducts from '@/components/UserProducts'
import UserReviews from '@/components/UserReviews'
import { getUserProducts } from '@/services/products'
import { getAllUsers, getUserReviews } from '@/services/users'

interface UserPageProps {
  params: {
    userId: string
  }
}

export default async function UserPage({ params }: UserPageProps) {
  const userId = params.userId
  const users = await getAllUsers()
  const reviews = await getUserReviews(Number(userId))
  const userProducts = await getUserProducts(Number(userId))
  let average = 0
  if(typeof users === 'string' || typeof reviews === 'string' || typeof userProducts === 'string'){
    return <p className="text-center font-bold text-3xl mt-[200px]">Internal server error</p>
  }
  const user = users.find(u => u.id === Number(userId))
  if(!user){
    return <p className="text-center font-bold text-3xl mt-[200px]">User not found</p>
  }
  if(reviews.length !== 0){
    const grades = reviews.reduce((sum, r) => (sum + r.grade), 0)
    average = grades/reviews.length
  }
  return (
    <main>
      <UserReviews 
        average={average} 
        reviews={reviews} 
        user={user} 
        userId={userId} 
        users={users} 
      />
      <UserProducts
        products={userProducts}
        user={user}
      />
    </main>
  )
}
