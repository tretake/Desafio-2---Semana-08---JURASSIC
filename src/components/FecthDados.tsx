import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchTasks } from "../redux/thunks/tasksThunks";

const FecthDados = () => {
    const dispatch = useDispatch<AppDispatch>();
    const dados = useSelector((state: RootState) => state.tasks.value);

    useEffect(() => {
        dispatch((fetchTasks()));
    }, [dispatch]);


    console.log(dados);
  return (
    <div>FecthDados</div>
  )
}

export default FecthDados