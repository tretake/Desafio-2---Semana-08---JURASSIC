import React from 'react';
import { useEffect, useState } from 'react';
import { useSignUp } from "@clerk/clerk-react";
import ManInPc from '../../public/images/bg-mobile-signup.png';
import Button from '../components/Button';
import OauthSignUp from '../components/OauthSignUpSocialButton';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/pageSlice';

const CustomSignUp = () => {
  const { signUp, setActive } = useSignUp();
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [firstname, setFirstName] = useState<string>('');
  const [firstnameError, setFirstError] = useState<string>('');
  const [lastname, setLastName] = useState<string>('');
  const [lastnameError, setLastError] = useState<string>('');
  const [jobposition, setJobPosition] = useState<string>('');
  const [jobpositionError, setJobPositionError] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>("");
  const [error, setError] = useState<string>('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage('login'));
  }, [dispatch]);

  const validateFirstName = (value: string): boolean => {
    const firstNameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ']{2,}$/;
    if (!firstNameRegex.test(value)) {
      setFirstError("Enter a valid first name!");
      return false;
    }
    setFirstError("");
    return true;
  };

  const validateLastName = (value: string): boolean => {
    const lastNameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ']{2,}$/;
    if (!lastNameRegex.test(value)) {
      setLastError("Enter a valid last name!");
      return false;
    }
    setLastError("");
    return true;
  };

  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    if (!emailRegex.test(value)) {
      setEmailError("Enter a valid email address!");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validateJob = (value: string): boolean => {
    const jobRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{5,}$/;
    if (!jobRegex.test(value)) {
      setJobPositionError("Enter a valid job!");
      return false;
    }
    setJobPositionError("");
    return true;
  };

  const validatePassword = (value: string): boolean => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(value)) {
      setPasswordError(
        "Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character."
      );
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const isFirstNameValid = validateFirstName(firstname);
    const isLastNameValid = validateLastName(lastname);
    const isEmailValid = validateEmail(email);
    const isJobValid = validateJob(jobposition);
    const isPasswordValid = validatePassword(password);

    if (isFirstNameValid && isLastNameValid && isEmailValid && isJobValid && isPasswordValid) {
      try {
        const response = await signUp.create({
          emailAddress: email,
          password,
          first_name: firstname,
          last_name: lastname,
          unsafeMetadata: {
            jobposition: jobposition,
          },
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
    }
  };

  return (
    <div className="flex lg:justify-between justify-center relative lg:min-h-[calc(100vh-234px)]">
      <img
        src="/public/images/bg-mobile-signup.png"
        alt=""
        className="lg:hidden visible absolute top-0 left-0 w-full h-full object-cover opacity-30"
      />
      <div className="flex-1 bg-white opacity-95 lg:my-[0] my-[87px] mx-[44px] rounded-[30px]">
        <div className="lg:pt-[58.46px] lg:pl-[100px] sm:px-[44px] sm:py-[30px] px-[20px] py-[20px]">
          <h2 className="text-[#331436] text-2xl lg:text-4xl font-bold font-['Roboto'] mb-4 sm:text-left text-center">
            Sign up Information
          </h2>
          <p className="text-[#331436] sm:text-left text-center text-sm lg:text-base mb-6">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-bold text-blue-500 text-center md:text-right hover:underline cursor-pointer"
            >
              Log in.
            </a>
          </p>
          {error && <p className="">{error}</p>}
          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="flex sm:flex-row flex-col gap-4">
              <div className="">
                <label
                  htmlFor="firstname"
                  className="text-sm font-medium text-[#331436] mb-1"
                >
                  First name
                </label>
                <input
                  id="firstname"
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                  onBlur={(e) => validateFirstName(e.target.value)}
                  className="sm:min-w-[220px] w-full px-3 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-sm"
                  required
                  placeholder="Enter your first name"
                />
                {firstnameError && (
                  <span className="block text-red-500 text-sm">
                    {firstnameError}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium text-[#331436] mb-1"
                >
                  Last name
                </label>
                <input
                  id="lastname"
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  onBlur={(e) => validateLastName(e.target.value)}
                  className="sm:min-w-[220px] w-full px-3 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-sm"
                  required
                  placeholder="Enter your last name"
                />
                {lastnameError && (
                  <span className="block text-red-500 text-sm">
                    {lastnameError}
                  </span>
                )}
              </div>
            </div>
            <div className="">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#331436] mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={(e) => validateEmail(e.target.value)}
                className="w-full px-4 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-sm"
                required
                placeholder="Enter your email"
              />
              {emailError && (
                <span className="block text-red-500 text-sm">{emailError}</span>
              )}
            </div>
            <div className="">
              <label
                htmlFor="jobposition"
                className="block text-sm font-medium text-[#331436] mb-1"
              >
                Job position
              </label>
              <input
                id="jobposition"
                type="text"
                value={jobposition}
                onChange={(e) => setJobPosition(e.target.value)}
                onBlur={(e) => validateJob(e.target.value)}
                className="w-full px-4 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-sm"
                required
                placeholder="Enter your job position (example: Project Manager)"
              />
              {jobpositionError && (
                <span className="block text-red-500 text-sm">
                  {jobpositionError}
                </span>
              )}
            </div>
            <div className="">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#331436] mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={(e) => validatePassword(e.target.value)}
                className="w-full px-4 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-sm"
                required
                placeholder="Enter your password"
              />
              {passwordError && (
                <span className="block text-red-500 text-sm mt-2 sm:max-w-lg max-w-xs break-words text-center">
                  {passwordError}
                </span>
              )}
            </div>
            <div className="text-center sm:w-[97%] sm:m-auto">
              <Button
                label="Create Account"
                type="submit"
                kind="primary"
                size="full"
              />
            </div>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            or sign up with...
          </p>
          <div className="flex items-center justify-center pt-2 gap-4">
            <div className="flex items-center justify-center w-[110px] h-14 bg-white rounded-[40px] border border-[#333333]/20 overflow-hidden">
              <div className="w-8 h-8 overflow-hidden">
                <OauthSignUp
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
                <OauthSignUp
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
      <div className="flex-1 pl-5 hidden lg:block">
        <img
          src={ManInPc}
          className="top-0 left-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default CustomSignUp;