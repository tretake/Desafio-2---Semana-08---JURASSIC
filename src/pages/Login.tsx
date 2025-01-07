import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/pageSlice';


const Login = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage('login'));
  }, [dispatch]);


  return (
    <div>
      <h1>LOGIN</h1>
    </div>
  )
}

     

      {/* Main Content Section */}
      <div className="flex flex-col lg:flex-row justify-center items-center mt-5 lg:mt-10 px-5 lg:px-20">
        {/* Left Image Section */}
        <img
          className="hidden lg:block lg:w-[626px] lg:h-[625px] lg:mr-10"
          src="/public/images/rectangle-2.png"
          alt="Placeholder"
        />

        {/* Login Form Section */}
        <div className="bg-white rounded-2xl shadow-md p-5 lg:p-10 w-full max-w-md">
          <h2 className="text-[#331436] text-2xl lg:text-4xl font-bold font-['Roboto'] mb-4">Login Information</h2>
          <p className="text-[#331436] text-sm lg:text-base mb-6">Enter your credentials</p>

          {/* Login Form */}
          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-[#331436] mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-[#331436] mb-1">Password</label>
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
                {/* icone face */}
                <span className="text-blue-600"><a href="https://www.facebook.com/?locale=pt_BR"target='_blank'><img src="/public/images/social-media-signup-social-media-logo.face.png" alt="" /></a></span>
              </button>
              <button className="w-14 h-14 bg-white border border-gray-300 rounded-full flex justify-center items-center">
                {/* icone google */}
                <span className="text-gray-600"><a href="https://www.google.com/" target='_blank'><img src="/public/images/social-media-signup-social-media-logo.jpg" alt="" /></a></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      

    </div>
  );
};

export default Login;
