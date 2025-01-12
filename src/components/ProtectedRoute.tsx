import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { Vortex } from 'react-loader-spinner'


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded, isSignedIn } = useAuth();

  // Mostra um indicador de carregamento enquanto Clerk verifica a autenticação
  if (!isLoaded) {
    return <div className="flex justify-center items-center h-100 w-full">
     <Vortex
  visible={true}
  height="80"
  width="80"
  ariaLabel="vortex-loading"
  wrapperStyle={{}}
  wrapperClass="vortex-wrapper"
  colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
  />
      </div>;
  }

  // Redireciona para a página 403 se o usuário não estiver logado
  if (!isSignedIn) {
    return <Navigate to="/denied" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
