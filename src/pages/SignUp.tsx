import React from 'react';
import { useEffect } from 'react';
import { useSignUp } from "@clerk/clerk-react";
import ManInPc from '../../public/images/manInComputer.png';
import Button from '../components/Button';
import OauthSignIn from '../components/OauthSignInSocialButton';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/pageSlice';

const CustomSignUp = () => {
  const { signUp, setActive } = useSignUp();
  const [email, setEmail] = React.useState('');
  const [firstname, setFirstName] = React.useState('');
  const [lastname, setLastName] = React.useState('');
  const [jobposition, setJobPosition] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(setPage('login'));
  }, [dispatch]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await signUp.create({
        emailAddress: email,
        password,
        first_name: firstname,
        last_name: lastname,
      });
    
      if (response.status === "complete") {
        await setActive({ session: response.createdSessionId });
        window.location.href = "/kanban";
        return;
      }
    
      if (response.status === "missing_requirements") {
        console.log('Missing requirements:', response.requirements);
        if (response.requirements && response.requirements.includes("email_verification")) {
          console.log('Preparing email verification...');
          await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
        }
      }
    } catch (err) {
      console.error('Sign-up error:', err);
      setError(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex lg:justify-between  justify-center relative">
      <img src="/public/images/bg-mobile-signup.png" alt="" className="lg:hidden visible absolute top-0 left-0 w-full h-full object-cover opacity-30"/>
      <div className="bg-white opacity-95 lg:my-[0] my-[87px] rounded-[30px]">
        <div className="lg:pt-[58.46px] lg:pl-[100px] sm:px-[44px] sm:py-[30px] px-[20px] py-[20px]">
          <h2 className="text-[#331436] text-2xl lg:text-4xl font-bold font-['Roboto'] mb-4 sm:text-left text-center">
            Sign up Information
          </h2>
          <p className="text-[#331436] sm:text-left text-center text-sm lg:text-base mb-6">
            Already have an account? <a href="/login" className="text-[20px] font-bold text-blue-500 text-center md:text-right hover:underline cursor-pointer">Log in.</a>
          </p>
          {error && <p className="">{error}</p>}
          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="flex sm:flex-row flex-col gap-4">
              <div>
                <label htmlFor="firstname" className="block text-sm font-medium text-[#331436] mb-1">First name</label>
                <input
                  id="firstname"
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="sm:min-w-[220px] w-full px-3 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-sm"
                  disabled={loading}
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label htmlFor="lastname" className="block text-sm font-medium text-[#331436] mb-1">Last name</label>
                <input
                  id="lastname"
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  className="sm:min-w-[220px] w-full px-3 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-sm"
                  disabled={loading}
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="email" className="block text-sm font-medium text-[#331436] mb-1">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-sm"
                required
                disabled={loading}
                placeholder="Enter your email"
              />
            </div>
            <div className="">
                <label htmlFor="jobposition" className="block text-sm font-medium text-[#331436] mb-1">Job position</label>
                <input
                  id="jobposition"
                  type="text"
                  value={jobposition}
                  onChange={(e) => setJobPosition(e.target.value)}
                  className="w-full px-4 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-sm"
                  disabled={loading}
                  placeholder="Enter your job position (example: Project Manager)"
                />
            </div>
            <div className="">
              <label htmlFor="password" className="block text-sm font-medium text-[#331436] mb-1">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-sm"
                required
                disabled={loading}
                placeholder="Enter your password"
              />
            </div>
            <div className="text-center">
              <Button label='Create Account' type="submit" kind='primary' size='md'/>
            </div>
          </form>
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
      <div className="pl-5 hidden lg:block">
        <img src={ManInPc} className=""/>
      </div>
    </div>
  );
};

export default CustomSignUp;