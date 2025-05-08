import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-black/30 backdrop-blur-md p-4 mx-8 mt-6 rounded-full shadow-2xl transition-all duration-300">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <div className="text-white text-2xl font-extrabold flex items-center gap-2">
          <img
            className="h-8 w-auto"
            src="https://cdn.prod.website-files.com/676ea9992a639c7e90d8fdd6/678e839a0a1ff2a3918b88fb_Logo.svg"
            alt="Logo"
          />
          <span className="hidden sm:inline">To-Do</span>
        </div>

        {/* Menu */}
        <ul className="flex space-x-10 text-lg font-medium">
          <li>
            <a href="#" className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer">Home</a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer">About</a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-yellow-300 transition duration-200 cursor-pointer">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
