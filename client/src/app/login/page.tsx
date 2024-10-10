'use client'

import { loginService } from '@/services/users';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginComponent() {

  const router = useRouter()
  useEffect(() =>{
    const user = window.localStorage.getItem('User')
      if(user){
        router.push('/home')
      }
    }, [])
  const handleLogin = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const usernameInput = document.querySelector('#username') as HTMLInputElement || null;
    const passwordInput = document.querySelector('#password') as HTMLInputElement || null;
    if(!usernameInput || !passwordInput){
      alert('Some of all fields are incompleted')
      return
    }
    const username = usernameInput.value
    const password = passwordInput.value
    const user = await loginService(username, password)
    if(typeof user !== 'string'){
      window.localStorage.setItem('User', JSON.stringify(user))
      router.push('/home')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Log in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin} method="POST">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-150 ease-in-out"
            >
              Log in
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link href="/signup" className="font-medium text-teal-600 hover:text-teal-500 transition duration-150 ease-in-out">
            Don't have an account? Create one
          </Link>
        </div>
      </div>
    </div>
  )
}