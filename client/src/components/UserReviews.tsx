import { User, Review } from '@/types.d'
import Link from 'next/link'
import React from 'react'
import CrudReview from './CrudReview'
import ReviewButton from './ReviewButton'

interface Props {
    average: number,
    user: User,
    reviews: Review[],
    users: User[],
    userId: string
}

export default function UserReviews(props: Props) {

    const { average, reviews, user, userId, users } = props

    return (
      <main className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden lg:mt-15">
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <img
              src={user.avatar}
              alt={user.fullname}
              width={100}
              height={100}
              className="rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{user.fullname}</h1>
              <p className="text-gray-600">@{user.username}</p>
            </div>
          </div>
          
          <div className="mt-6 mb-5">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Reviews</h2>
            {reviews.length === 0 ? (
              <p className="text-gray-600">Still no reviews</p>
            ) : (
              <div>
                <p className="text-lg font-medium text-gray-800 mb-2">
                  Average Rating: <span className="text-teal-600">{average.toFixed(1)}</span>
                </p>
                <ul className="space-y-4">
                  {reviews.map((review) => {
                    const reviewer = users.find(u => u.id === review.reviewer)
                    return (
                      <li key={review.id} className="bg-gray-50 p-4 rounded-md">
                      <p className="text-gray-800">{review.content}</p>
                      <div className="flex items-center mt-2">
                        <span className="text-gray-600">{review.grade}</span>
                        <span className="text-yellow-500 ml-1 mt-1">★</span>
                        <Link href={`/home/users/${reviewer?.id}`}>
                          <span className="text-gray-600 ml-1 mt-2">by {reviewer?.username}</span>
                        </Link>
                      </div>
                      <CrudReview username={reviewer?.username!} reviewId={review.id!}/>
                    </li>
                    )
                  })}
                </ul>
              </div>
              
            )}
          </div>
          <ReviewButton username={user.username} userId={userId}/>
        </div>
      </div>
    </main>
    )
}
