import LogoutForm from "@/components/LogoutForm"
import { getUser } from "@/services/users"
import Link from 'next/link'

interface Props {
    params: {
        userId: string
    }
}

export default async function AccountPage({params} : Props) {
    const { userId } = params
    const user = await getUser(userId)
    if(typeof user === 'string'){
        return <p className="text-center font-bold text-3xl mt-[200px]">Internal server error</p>
    }

    const menuOptions = [
        { label: 'How others see your account', href: `/home/users/${userId}` },
        { label: 'What products do I have on sale?', href: `/home/myproducts/${userId}` },
        { label: 'Modify profile', href: `/modify/${userId}` },
        { label: 'Close account', href: `/signout/${user.username}` },
    ]

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        Welcome again, <span className="text-teal-600">{user.username}</span>!
                    </h1>
                    
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-700">Account Options</h2>
                        <nav className="space-y-2">
                            {menuOptions.map((option, index) => (
                                <Link 
                                    key={index} 
                                    href={option.href}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md transition duration-150 ease-in-out" 
                                >
                                    {option.label}
                                </Link>
                            ))}
                            <LogoutForm/>
                        </nav>
                    </div>
                </div>
            </div>
        </main>
    )
}