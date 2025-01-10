import React from 'react'
import RETRAT_1 from "../assets/RETRAT_1-removebg 1.png";


const MainSection = () => {
  return (
    <div
    className="relative min-h-screen bg-cover bg-center"
    style={{ backgroundImage: `url('/path/to/background-image.jpg')` }}
  >
    {/* Fundo com a imagem de fundo */}
    <div className="flex items-center justify-between h-full px-8">
      {/* Bloco com a foto da menina e texto */}
      <div className="w-1/2 space-y-6">
        {/* Texto à esquerda */}
        <h1 className="text-4xl font-bold text-red leading-tight">
          Welcome to Project Manager
        </h1>
        <p className="text-xl bg-[#FFFFFF]">
          Get your projects and ideas in order, all in one place! Sign up now
          and discover a smarter way to manage your work with efficiency and
          teamwork.
        </p>
        {/* Botão Get Started */}
        <button className="mt-6 py-3 px-6 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700">
          Get Started
        </button>
      </div>

      {/* Imagem da menina no meio */}
      <div className="w-1/3 space-y-8">
        {/* <img src="{RETRAT_1}" alt="Retrato da Menina" className="w-full h-auto object-contain" /> */}
        <img
          src={RETRAT_1}
          alt="Logo"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Blocos à direita */}
      <div className="w-1/3 space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">2000+</h2>
          <p className="text-lg text-gray-600">Satisfied clients</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">400+</h2>
          <p className="text-lg text-gray-600">Managed projects</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">500+</h2>
          <p className="text-lg text-gray-600">Kanban boards</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default MainSection