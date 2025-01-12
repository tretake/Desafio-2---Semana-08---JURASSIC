import React from "react";
import { OAuthStrategy } from "@clerk/types";
import { useSignIn } from "@clerk/clerk-react";

interface OauthSignInProps {
  providerName: string;
  strategy: OAuthStrategy;
  logo: string;
  redirectUrl?: string;
  redirectUrlComplete?: string;
}

const OauthSignIn: React.FC<OauthSignInProps> = ({
  providerName,
  strategy,
  logo,
  redirectUrl = "/sign-up/sso-callback",
  redirectUrlComplete = "/kanban",
}) => {
  const { signIn } = useSignIn();

  if (!signIn) return null;

  const handleSignIn = () => {
    signIn.authenticateWithRedirect({
      strategy,
      redirectUrl,
      redirectUrlComplete,
    });
  };

  return (
    <button
      onClick={handleSignIn}
      className=""
    >
      <img
        src={logo}
        alt={`Sign in with ${providerName}`}
        className=""
      />
      oioioio
    </button>
  );
};

export default OauthSignIn;