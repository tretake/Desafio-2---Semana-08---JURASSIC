import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.png'

const Header = () => {
  return (
    <div className="w-full bg-[#1E293B] flex space-betewn items-center justify-between p-4 max-h-[80px]"> 
      <div className="flex items-center space-x-4"> 
        <Link to="/">
          <img src={Logo} alt="Logo" className="w-12 h-12 object-cover" /> 
        </Link>
        <h1 className="text-white text-xl font-bold">Project Manager</h1> 
        </div>
      <button>
        {/* Botaozinho de teSte */}
        Login
      </button>
    </div>








  )
}

export default Header
