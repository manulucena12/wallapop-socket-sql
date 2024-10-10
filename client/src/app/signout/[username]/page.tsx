'use client'

import { deleteUser } from "@/services/users"
import { useRouter } from "next/navigation"

interface Props {
    params: {
        username: string
    }
}

export default function SignoutPage({params} : Props) {
    const { username } = params
    const router = useRouter()

    const handleSignout = async (e:React.SyntheticEvent) => {
        e.preventDefault()
        const passwordInput = document.getElementById('password') as HTMLInputElement
        const password = passwordInput.value
        const deleted = await deleteUser(username, password)
        if(!deleted){
            window.localStorage.clear()
            router.push('/')
        }
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl mt-[200px]">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
                We're sad that you leave us, {username}
            </h1>
            <form className="space-y-4" onSubmit={handleSignout}> 
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        readOnly
                        className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        placeholder="Enter your password"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Delete Account
                    </button>
                </div>
            </form>
        </div>
    )
}