import React from 'react'
import ManInPc from '../../public/images/manInComputer.png'

const SignUp = () => {
  return (
    <div>
      {/* Main Content Section */}
      <div className="flex flex-row ">
        {/* Left Image Section */}

        <div className="bg-white rounded-2xl shadow-md p-5 lg:p-10 w-full  w-3/5">
          <h2 className="text-[#331436] text-2xl lg:text-4xl font-bold font-['Roboto'] mb-4">
            Login Information
          </h2>
          <p className="text-[#331436] text-sm lg:text-base mb-6">
            Enter your credentials
          </p>

          {/* Login Form */}
          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-[#331436] mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-[#331436] mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
              />
            </div>

            {/* Login Button */}
            <button className="w-full py-2 bg-slate-800 text-white font-medium rounded-md hover:bg-slate-700">
              Login
            </button>
          </div>

          {/* Signup Link */}
          <p className="mt-4 text-center text-sm text-[#331436]">
            New here? Let’s take you to{' '}
            <a href="/signup" className="text-indigo-600 font-bold">
              sign up.
            </a>
          </p>

          {/* Social Login Section */}
          <div className="mt-6 text-center">
            <p className="text-sm text-[#331436]">or sign in with...</p>
            <div className="flex justify-center mt-4 space-x-4">
              <button className="w-14 h-14 bg-white border border-gray-300 rounded-full flex justify-center items-center">
                {/* Facebook Icon */}
                <span className="text-blue-600">
                  <a href="https://www.facebook.com/?locale=pt_BR" target="_blank" rel="noreferrer">
                    <img src="/images/social-media-signup-social-media-logo.face.png" alt="Facebook" />
                  </a>
                </span>
              </button>
              <button className="w-14 h-14 bg-white border border-gray-300 rounded-full flex justify-center items-center">
                {/* Google Icon */}
                <span className="text-gray-600">
                  <a href="https://www.google.com/" target="_blank" rel="noreferrer">
                    <img src="/images/social-media-signup-social-media-logo.jpg" alt="Google" />
                  </a>
                </span>
              </button>
            </div>
          </div>
        </div>


        <div className="w-2/5">
          <img src={ManInPc} />
        </div>



      </div>
    </div>
  )
}

export default SignUp
