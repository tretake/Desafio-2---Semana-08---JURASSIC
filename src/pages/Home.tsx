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
        <MainSection/>
        <TheManager/>
    </div>
  )
}

export default Home
