import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/pageSlice';
import { useSignIn } from "@clerk/clerk-react";
import OauthSignIn from '../components/OauthSignInSocialButton';
import Button from '../components/Button';

const Login = () => {

  const {signIn, isLoaded} = useSignIn();

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [passWord, setPassWord] = useState('');

  useEffect(() => {
    dispatch(setPage('login'));
  }, [dispatch]);

  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    

    if (!isLoaded) return;

    try {
      await signIn.create({
        identifier: email,
        password: passWord,
      });
      // Redirecionar para o dashboard ou outra página após login bem-sucedido
      window.location.href = '/kanban';
    } catch (err) {
      console.log("teste")
    }
  };

  return (
      <div className="flex lg:justify-between  sm:h-[calc(100vh-234px)] justify-center relative">
        <img src="/public/images/rectangle-2.png" alt="" className="lg:hidden visible absolute top-0 left-0 w-full h-full object-cover opacity-30"/>
        <div className="flex">
          <div className="flex-1 hidden lg:block">
          <img src="/public/images/bg-login.png" alt=""  className="top-0 left-0 w-full h-full object-cover" />
          </div>
          <div className="flex-1 bg-white opacity-95 lg:my-[0] my-[87px] rounded-[30px] lg:pr-24">
            <div className="lg:pt-[58.46px] lg:pl-[100px] sm:px-[44px] sm:py-[30px] px-[20px] py-[20px]">
              <h2 className="text-[#331436] text-2xl lg:text-4xl font-bold font-['Roboto'] mb-4 sm:text-left text-center">
                Login Information
              </h2>
              <p className="text-[#331436] sm:text-left text-center text-sm lg:text-base">
                Enter your credentials
              </p>
              <p className="text-[#331436] sm:text-left text-center text-sm lg:text-base mb-6">
                New here? Let’s take you to <a href="/signup" className="text-[16px] font-bold text-blue-500 text-center md:text-right hover:underline cursor-pointer"> sign up.</a>
              </p>
              <form action="" onSubmit={handleEmailPasswordLogin} className="space-y-6">
              {/* Email  */}
              <div className="">
                <label className="block text-sm font-medium text-[#331436] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-sm"
                  onChange={(e) => setEmail(e.target.value)} value={email}
                />
              </div>

              {/* Password Field */}
              <div className="">
                <label className="block text-sm font-medium text-[#331436] mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-sm"
                  onChange={(e) => setPassWord(e.target.value)} value={passWord}
                />
              </div>

              {/* Login Button */}
              <div className="text-center">
                <Button label='Login' type="submit" kind='primary' size='lg'/>
              </div>
              </form>
              {/* sign */}
              <p className="mt-4 text-center text-sm text-gray-600">
                or sign up with...
              </p>
              <div className="flex items-center justify-center pt-2 gap-4">
                <div className="flex items-center justify-center w-[110px] h-14 bg-white rounded-[40px] border border-[#333333]/20 overflow-hidden">
                  <div className="w-8 h-8 overflow-hidden">
                    <OauthSignIn
                      providerName="Facebook"
                      strategy="oauth_facebook"
                      logo="/public/images/social-media-signup-social-media-logo.face.png"
                      redirectUrl="/custom-callback"
                      redirectUrlComplete="/kanban"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center w-[110px] h-14 bg-white rounded-[40px] border border-[#333333]/20 overflow-hidden pt-2 pl-1">
                  <div className="w-8 h-8 overflow-hidden">
                    <OauthSignIn
                      providerName="Google"
                      strategy="oauth_google"
                      logo="/public/images/social-media-signup-social-media-logo.jpg"
                      redirectUrl="/custom-callback"
                      redirectUrlComplete="/kanban"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Login;