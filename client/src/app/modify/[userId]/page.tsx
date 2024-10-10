'use client'

import { getUser, updateUser } from "@/services/users"
import { User } from "@/types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Props {
    params: {
        userId: string
    }
}

export default function ModifyProfilePage({params}: Props) {

    const router = useRouter()
    const { userId } = params
    const [user, setUser] = useState<null | User>(null)

    useEffect(() => {
        getUser(userId)
        .then(response => {
            if(typeof response !== 'string'){
                setUser(response)
            }
        })
    }, [userId])

    if(!user){
        return null
    }

    const [name, lastname] = user.fullname.split(' ', 2)

    const handleUpdateProfile = async (e:React.SyntheticEvent) => {
        e.preventDefault()
        const name = (document.getElementById('name') as HTMLInputElement).value
        const lastName = (document.getElementById('lastname') as HTMLInputElement).value
        const username = (document.getElementById('username') as HTMLInputElement).value
        const password = (document.getElementById('password') as HTMLInputElement).value
        const userUpdated = await updateUser(username, name, lastName, password, userId)
        if(!userUpdated){
            window.localStorage.setItem('User', JSON.stringify({username, id: userId}))
            router.push(`/home/users/${userId}`)
            router.refresh()
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md mt-20">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Modify Your Profile</h1>
            <div className="flex justify-center mb-6">
                <img
                    src={user.avatar}
                    alt={`${user.fullname}'s avatar`}
                    width={100}
                    height={100}
                    className="rounded-full"
                />
            </div>
            <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            defaultValue={name}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            defaultValue={lastname}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        defaultValue={user.username}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        defaultValue={user.password}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                        Note: If you see your password longer than it was, it's because we hashed it in order to keep your data safe. If you will not change your password, please, click on "I do not want to remember my password on your browser"
                    </p>
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                        Update Profile
                    </button>
                </div>
            </form>
        </div>
    )
}