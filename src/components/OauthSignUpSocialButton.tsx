import React from "react";
import { OAuthStrategy } from "@clerk/types";
import { useSignUp } from "@clerk/clerk-react";

interface OauthSignUpProps {
  providerName: string;
  strategy: OAuthStrategy;
  logo: string;
  redirectUrl?: string;
  redirectUrlComplete?: string;
}

const OauthSignUp: React.FC<OauthSignUpProps> = ({
  providerName,
  strategy,
  logo,
  redirectUrl = "/sign-up/sso-callback",
  redirectUrlComplete = "/kanban",
}) => {
  const { signUp } = useSignUp();

  if (!signUp) return null;

  const handleSignUp = () => {
    signUp.authenticateWithRedirect({
      strategy,
      redirectUrl,
      redirectUrlComplete,
    });
  };

  return (
    <button
      onClick={handleSignUp}
      className=""
    >
      <img
        src={logo}
        alt={`Sign up with ${providerName}`}
        className=""
      />
    </button>
  );
};

export default OauthSignUp;
