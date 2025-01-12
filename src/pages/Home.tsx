import { Routes, Route, Link, NavLink } from "react-router-dom" 
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/pageSlice';
import MainSection from "../components/MainSection";
import TheManager from "../components/TheManager";

const Home = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage('home')); 
  }, [dispatch]);

  return (
    <div>
      
        <ul className="fixed top-0 z-[90]">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/kanban">kanban</Link>
          </li>
        </ul>

        <MainSection/>
        <TheManager/>
    </div>
  )
}

export default Home
