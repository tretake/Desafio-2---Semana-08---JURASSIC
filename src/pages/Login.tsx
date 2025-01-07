import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/pageSlice';


const Login = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage('login'));
  }, [dispatch]);


  return (
    <div>
      <h1>LOGIN</h1>
    </div>
  )
}

export default Login
