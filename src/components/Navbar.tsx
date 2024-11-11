import React from 'react'
import Link from 'next/link'
import { Laptop, Cloud, BarChart3, LayoutDashboard } from 'lucide-react'

const Navbar = () => {
  return (
    <header className="bg-[#010117] text-white">
    <nav className="container mx-auto px-8 py-5">
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold">
          <Link href="/dashboard/weather-news">
          <LayoutDashboard />
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/dashboard/weather-news" className="flex items-center hover:text-gray-300">
            <Cloud className="mr-2 h-5 w-5" />
            Weather
          </Link>
          <Link href="/dashboard/kanban" className="flex items-center hover:text-gray-300">
            <Laptop className="mr-2 h-5 w-5" />
            Kanban
          </Link>
          <Link href="/dashboard/analytics" className="flex items-center hover:text-gray-300">
            <BarChart3 className="mr-2 h-5 w-5" />
            Analytics
          </Link>
        </div>
      </div>
    </nav>
  </header>
  )
}

export default Navbar