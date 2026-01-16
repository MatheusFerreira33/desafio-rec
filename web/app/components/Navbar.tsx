'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:text-blue-200 transition">
          DesafioREC
        </Link>
        
        <div className="flex gap-6">
          <Link 
            href="/" 
            className={`hover:text-blue-200 transition ${isActive('/') ? 'font-bold underline' : ''}`}
          >
            Início
          </Link>
          <Link 
            href="/login" 
            className={`hover:text-blue-200 transition ${isActive('/login') ? 'font-bold underline' : ''}`}
          >
            Login
          </Link>
          <Link 
            href="/register" 
            className={`hover:text-blue-200 transition ${isActive('/register') ? 'font-bold underline' : ''}`}
          >
            Cadastro
          </Link>
          <Link 
            href="/dashboard" 
            className={`hover:text-blue-200 transition ${isActive('/dashboard') ? 'font-bold underline' : ''}`}
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  )
}