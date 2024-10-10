'use client'

import { useRouter } from "next/navigation";

export default function LogoutForm() {
    
    const router = useRouter()

    return (
        <form action={() => {window.localStorage.clear(); router.push('/')}}>
            <button 
                type="submit"
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md transition duration-150 ease-in-out" 
            >
                Logout
            </button>
        </form>
      )

}
