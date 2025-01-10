import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/pageSlice';
import { useSignIn } from "@clerk/clerk-react";
import OauthSignIn from '../components/OauthSignInSocialButton';

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
    <div>
    <div className="w-full h-[720px] relative bg-white overflow-hidden  md:h-[100vw] lg:overflow-hidden lg:h-auto lg:bottom-0  ">
      <div>
      
        {/* Background Image */}
      {<div>
            <img src="/public/images/rectangle-2.png" alt=""  className='hidden lg:block' />
          <img
            className="w-full h-full left-0 top-0 absolute bg-[url('/images/rectangle-2.png')] bg-cover bg-center opacity-50 md:p-20 lg:hidden lg:p-0 "
            alt=""
          />
      </div>}
      </div>
      <div className="w-full h-[656px] left-0 top-[36px] absolute overflow-hidden md:top-[62px]  lg:left-[50%] lg:top-0  lg:absolute ">
        <div className="w-[88%] h-full left-6 top-0 absolute bg-[#fffcfc] rounded-[30px] md:p-96  lg:w-[520px] lg:border-none "  ></div>
        <div className="w-[329px] h-24 left-[33px] top-[53px] absolute ">
          <div className="left-[66px] absolute text-[#331436] text-2xl font-bold font-['Roboto'] leading-[48px] md:left-[80px]">
            Login Information
          </div>
          <div className="left-[90px] top-[72px] absolute text-[#331436] text-[15px] font-normal font-['Roboto'] leading-normal md:left-[80px] lg:block">
            Enter your credentials
          </div>
        </div>
        <div className="h-6 left-[75px] top-[150px] absolute md:left-[112px]">
          <span className="text-[#331436] text-[15px] font-normal font-['Roboto'] leading-normal">
            New here? Let’s take you to <a href="" className="text-indigo-600 text-[15px] font-bold font-['Roboto'] leading-normal"> sign up.</a>
          </span>
        </div>

        <form action="" onSubmit={handleEmailPasswordLogin} className="left-[26px] top-[214px] absolute md:left-[112px] md:w-[65%] lg:w-auto">
          {/* Email  */}
          <div className="min-w-[329px] mb-6">
            <label className="block text-[#331436] text-sm font-medium font-['Roboto'] leading-tight mb-1  ">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 bg-white rounded-md border border-black/10 text-sm text-black/50 font-normal font-['Roboto'] leading-tight"
              onChange={(e) => setEmail(e.target.value)} value={email}
            />
          </div>

          {/* Password Field */}
          <div className="min-w-[329px] mb-6">
            <label className="block text-[#331436] text-sm font-medium font-['Roboto'] leading-tight mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 bg-white rounded-md border border-black/10 text-sm text-black/50 font-normal font-['Roboto'] leading-tight"
              onChange={(e) => setPassWord(e.target.value)} value={passWord}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-[329px] h-9 p-3 bg-slate-800 rounded-lg text-white text-[15px] font-medium font-['Roboto'] leading-normal md:w-[100%] "
          >
            Login
          </button>
        </form>
          {/* sign */}
        <div className="w-[341px] h-[89px] left-[26px] top-[481px] absolute  md:flex  md:w-[87%] lg:       ">
          <div className="w-[341px] left-0 top-0 absolute text-center text-[#331436] text-sm font-normal font-['Roboto'] leading-normal   md:w-[113%]  lg:w-[45%]">
            or sign in with...
          </div>
          <div className="w-[233px] h-14 left-[54px] top-[33px] absolute justify-start items-start gap-[13px] inline-flex md:left-[40%] lg:left-[12%]">
            <div className="w-[110px] h-14 relative bg-white rounded-[40px] border border-[#333333]/20 overflow-hidden">
              <div className="left-[39px] top-[12.50px] absolute justify-center items-center gap-4 inline-flex">
                <div className="w-8 h-8 relative">
                <OauthSignIn
                  providerName="Facebook"
                  strategy="oauth_facebook"
                  logo="/public/images/social-media-signup-social-media-logo.face.png"
                  redirectUrl="/custom-callback"
                  redirectUrlComplete="/kanban"
                />
                </div>
              </div>
            </div>
            <div className="w-[110px] h-14 relative bg-white rounded-[40px] border border-[#333333]/20 overflow-hidden">
              <div className="left-[43.50px] top-[15.50px] absolute justify-center items-center gap-4 inline-flex">
                <div className="w-6 h-6 relative overflow-hidden">
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
  </div>
  );
};

export default Login;