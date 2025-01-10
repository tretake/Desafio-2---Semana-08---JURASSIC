import { BrowserRouter,Routes,Route,Link } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'


import Home from './pages/Home'
import Kanban from './pages/Kanban'
import Locked from './pages/AccessDenied'
import Login from './pages/Login'
import NotFound from './pages/PageNotFound'
import SignUp from './pages/SignUp'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import PageNotFound from './pages/PageNotFound'




import { useEffect  } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../src/redux/store";
import { fetchTasks } from "../src/redux/thunks/fetchThunks";




function App() {

  
  const dispatch = useDispatch<AppDispatch>();
  const dados = useSelector((state: RootState) => state.tasks.value);

  useEffect(() => {
      dispatch((fetchTasks()));
  }, [dispatch]);


console.log('dados centrais',dados);


  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/kanban' element={<Kanban/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/notfound' element={<NotFound dados={dados} />}  />
        <Route path='/settings' element={<Settings/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/*' element={<PageNotFound/>} />
        <Route path='/denied' element={<Locked/>} />
      </Routes>

      <Footer/>
    </BrowserRouter>
  )
}

export default App
