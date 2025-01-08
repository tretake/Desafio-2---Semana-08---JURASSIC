import { BrowserRouter,Routes,Route,Link } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'


import Home from './pages/Home'
import Kanban from './pages/Kanban'
import Locked from './pages/AccessDenied'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import PageNotFound from './pages/PageNotFound'


function App() {

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/kanban' element={<Kanban/>} />
        <Route path='/login' element={<Login/>} />
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
