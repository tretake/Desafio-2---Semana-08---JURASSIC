import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded, isSignedIn } = useAuth();

  // Mostra um indicador de carregamento enquanto Clerk verifica a autenticação
  if (!isLoaded) {
    return <div>Carregando...</div>;
  }

  // Redireciona para a página 403 se o usuário não estiver logado
  if (!isSignedIn) {
    return <Navigate to="/denied" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
