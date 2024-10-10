import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Wallamock'
}

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-teal-500 to-teal-700">
      <main className="text-center">
        <h1 className="text-6xl font-bold text-white mb-8 animate-fade-in">
          Wallapop Mock
        </h1>
        <div className="space-x-4">
          <Link href="/login" className="inline-block bg-white text-teal-700 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-teal-100 transition duration-300 ease-in-out transform hover:scale-105">
            Login
          </Link>
          <Link href="/signup" className="inline-block bg-teal-800 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-teal-900 transition duration-300 ease-in-out transform hover:scale-105">
            Sign Up
          </Link>
        </div>
      </main>
      <footer className="absolute bottom-4 text-white text-sm">
        © 2024 Wallapop Mock. All rights reserved.
      </footer>
    </div>
  )
}