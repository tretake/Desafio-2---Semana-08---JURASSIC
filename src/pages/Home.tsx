import { Routes, Route, Link, NavLink } from "react-router-dom" 
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/pageSlice';

const Home = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage('home')); // Atualiza o estado do Redux para "home"
  }, [dispatch]);

  return (
    <div>
      Home
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/kanban">kanban</Link>
          </li>
        </ul>
    </div>
  )
}

export default Home
