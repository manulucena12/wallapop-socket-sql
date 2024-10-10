'use client'

import { getReview, updateReview } from '@/services/review'
import { Review } from '@/types.d.'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ReviewForm() {

  const [review, setReview] = useState<null | Review>(null)
  const [grade, setGrade] = useState<null | number>(null)
  const [content, setContent] = useState<null | string>(null)
  const router = useRouter()
  const { reviewId } = useParams()

  useEffect(() =>{
    const user = window.localStorage.getItem('User')
    if(!user){
      return router.push('/')
    }
    getReview(Number(reviewId))
    .then(response =>  {
      if(typeof response !== 'string'){
        setReview(response)
        setContent(response.content)
        setGrade(response.grade)
      } else {
        return router.push('/home')
      }
      
    })
  }, [])

  if(!review || !content || !grade){
    return <p className="text-center font-bold text-3xl mt-[200px]">Loading data...</p>
  }

  const handleReview = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const updatedReview: Review = {
      content,
      grade,
      reviewed: review.reviewed,
      reviewer: review.reviewer,
    }
    const newReview = await updateReview(updatedReview, review.id!)
    if(typeof newReview !== 'string'){
      router.push(`/home/users/${review.reviewed}`)
      router.refresh()
    }
    
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-[200px]">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Update your review</h2>
      <form onSubmit={handleReview}>
        <div className="mb-4">
          <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <div className="flex items-center">
            {[0, 1, 2, 3, 4, 5].map((value) => (
              <label key={value} className="mr-4">
                <input
                  type="radio"
                  required
                  onChange={(e) => setGrade(Number(e.target.value))}
                  name="grade"
                  id="grade"
                  value={value}
                  checked={grade === value}
                  className="sr-only peer"
                />
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm border border-gray-300 peer-checked:bg-teal-500 peer-checked:text-white cursor-pointer hover:bg-teal-100 transition-colors">
                  {value}
                </div>
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Review Content
          </label>
          <textarea
            id="content"
            name="content"
            required
            value={content!}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            placeholder="Write your review here..."
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition-colors"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  )
}
