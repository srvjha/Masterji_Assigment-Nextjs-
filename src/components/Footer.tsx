import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#010117] text-white">
    <div className="container mx-auto px-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm">&copy; 2024 MyDashboard. All rights reserved.</p>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-300">Privacy Policy</a>
          <a href="#" className="hover:text-gray-300">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer