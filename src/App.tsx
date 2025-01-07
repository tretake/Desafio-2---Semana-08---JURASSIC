import { BrowserRouter,Routes,Route,Link } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'


import Home from './pages/Home'
import Kanban from './pages/Kanban'
import Locked from './pages/Locked'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Settings from './pages/Settings'

function App() {

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
