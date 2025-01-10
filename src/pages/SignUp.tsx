import React from 'react';
import { useSignUp } from "@clerk/clerk-react";
import ManInPc from '../../public/images/manInComputer.png';
import Button from '../components/Button';

const CustomSignUp = () => {
  const { signUp, setActive } = useSignUp();
  const [email, setEmail] = React.useState('');
  const [firstname, setFirstName] = React.useState('');
  const [lastname, setLastName] = React.useState('');
  const [jobposition, setJobPosition] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

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
    <div className="flex lg:justify-between justify-center bg-no-repeat bg-cover bg-[url('../../public/images/bg-mobile.png')] lg:bg-none">
      <div className="bg-white lg:my-[0] my-[87px] rounded-[30px]">
        <div className="lg:pt-[58.46px] lg:pl-[100px] sm:px-[44px] sm:py-[87px]">
          <h2 className="text-[#331436] text-2xl lg:text-4xl font-bold font-['Roboto'] mb-4 p-5 sm:p-0">
            Sign up Information
          </h2>
          <p className="text-[#331436] text-sm lg:text-base mb-6 pl-5 sm:pl-0">
            Already have an account? Log in.
          </p>
          {error && <p className="">{error}</p>}
          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="flex sm:flex-row flex-col gap-4 px-5 sm:px-0">
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
            <div className="px-5 sm:px-0">
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
            <div className="px-5 sm:px-0">
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
            <div className="px-5 sm:px-0">
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
        </div>
      </div>
      <div className="pl-5 hidden lg:block">
        <img src={ManInPc} className=""/>
      </div>
    </div>
  );
};

export default CustomSignUp;