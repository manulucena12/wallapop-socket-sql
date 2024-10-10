'use client'

import { getMessage, updateMessage } from "@/services/messages"
import { Message } from "@/types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Props {
  params: {
    messageId: number
  }
}

export default function UpdateMessage({params}: Props) {

  const { messageId } = params
  const [message, setMessage] = useState<null | Message>(null)
  const router = useRouter();

  useEffect(() => {
    getMessage(messageId)
    .then(res => {
      if(typeof res !== 'string'){
        setMessage(res)
        return
      }
      return router.push('/home')
    })
  }, [])

  if(!message){
    return null
  }

  const handleUpdate = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const content = (document.getElementById('content') as HTMLInputElement).value
    const msg = await updateMessage(messageId, content)
    if(!msg){
      return router.back()
    }
  }

  return (
    <div className="max-w-md mx-auto mt-[200px] p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Update Message</h1>
      <form className="space-y-4" onSubmit={handleUpdate}>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Message Content
          </label>
          <textarea
            id="content"
            name="content"
            rows={4}
            defaultValue={message.content}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-teal-500"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Update Message
          </button>
        </div>
      </form>
    </div>
  )
}