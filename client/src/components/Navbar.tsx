'use client'

import { User } from '@/types.d'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<null | User>(null)
  const router = useRouter()
  useEffect(() => {
    const userStoraged = window.localStorage.getItem('User')
    if(!userStoraged){
      return router.push('/')
    }
    setUser(JSON.parse(userStoraged))
  }, [])

  const navLinks = [
    { name: 'Home', href: '/home' },
    { name: 'My account', href: `/home/account/${user?.id}` },
    { name: 'Chats', href: `/home/mychats/${user?.id}` },
    { name: 'Search', href: '/home/search' },
    { name: 'Favourites', href: `/home/favourites/${user?.id}` },
  ]

  return (
    <nav className="bg-teal-500 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link href="/" className="flex items-center py-4 px-2">
                <span className="font-semibold text-white text-lg">WallapopMock</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center justify-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="py-4 px-2 text-white hover:text-gray-200 transition duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="outline-none mobile-menu-button"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block py-2 px-4 text-white hover:bg-teal-600 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}