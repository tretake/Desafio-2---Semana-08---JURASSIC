import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, postNewUser } from "../redux/thunks/usersThunks";
import { RootState, AppDispatch } from "../redux/store";
import { User } from "../interface/types";

export default function useAddUser(user: User) {
  const dispatch = useDispatch<AppDispatch>();
  const dadosUsersBanco = useSelector((state: RootState) => state.users.value);
  const [novoUsuarioCriado, setNovoUsuarioCriado] = useState<User | null>(null);

  const generateId = (): number => Date.now();

  // Efeito para buscar os usuários inicialmente
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const emailUserNovo = user.emailAddresses[0].emailAddress;

  const emailExiste = dadosUsersBanco.some(
    (userBanco) => userBanco.email === emailUserNovo
  );

  useEffect(() => {
    // Verifica se o e-mail já existe e cria o novo usuário
    if (!emailExiste) {
      const novoUsuario: User = {
        id: generateId(),
        firstName: user.firstName,
        lastName: user.lastName,
        username: '',
        createdAt: '',
        email: emailUserNovo,
        password: "defaultPassword123", // Senha padrão ou ajuste conforme necessário
        role: user.unsafeMetadata.jobposition || "Usuário", // Usa o job position ou um valor padrão
        socials: {
          x: "",
          instagram: "",
          linkedin: "",
        },
      };

      setNovoUsuarioCriado(novoUsuario);
    } else {
      console.log("E-mail já cadastrado!");
      setNovoUsuarioCriado(null); // Ou um estado de erro, conforme necessário
    }
  }, [dadosUsersBanco, emailUserNovo, user]);

  // Função assíncrona para enviar o novo usuário
  useEffect(() => {
    const addUser = async () => {
      if (novoUsuarioCriado) {
        await dispatch(postNewUser(novoUsuarioCriado));
      }
    };
    addUser();
  }, [novoUsuarioCriado, dispatch]);

  return novoUsuarioCriado;
}
