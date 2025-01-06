import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.png'

const Header = () => {
  return (
    <div className="w-full bg-[#1E293B] font-roboto flex space-between items-center justify-between p-5 max-h-[80px]" >
      <div className="flex items-center space-x-4"> 
        <Link to="/">
          <img src={Logo} alt="Logo" className="w-12 h-12 object-cover" /> 
        </Link>
        <h1 className="text-white text-xl font-normal text-[18px] leading-[36px">Project Manager</h1> 
        </div>
      <button className="bg-red-700">
        {/* Botaozinho de teSte */}
        Login
      </button>
    </div>








  )
}

export default Header
