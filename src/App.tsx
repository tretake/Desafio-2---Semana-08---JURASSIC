import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'

import { BrowserRouter,Routes,Route,Link } from 'react-router-dom'

import Header from './componenst/Header'
import Footer from './componenst/Footer'

import Home from './pages/Home'
import Kanban from './pages/Kanban'
import Locked from './pages/Locked'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Settings from './pages/Settings'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/kanban' element={<Kanban/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/settings' element={<Settings/>} />
      </Routes>

      <Footer/>
    </BrowserRouter>
  )
}

export default App
