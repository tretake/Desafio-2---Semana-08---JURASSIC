import { BrowserRouter,Routes,Route } from 'react-router-dom'
import ProtectedRoute from "./components/ProtectedRoute";
import { ClerkProvider } from '@clerk/clerk-react'
import { SignedIn, SignedOut, SignInButton, UserButton, } from '@clerk/clerk-react'

import Header from './components/Header'
import Footer from './components/Footer'


import Home from './pages/Home'
import Kanban from './pages/Kanban'
import AccessDenied from './pages/AccessDenied'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import PageNotFound from './pages/PageNotFound'
import DeleteUserForm from './components/DeleteUserForm'

import { useEffect  } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../src/redux/store";
import { fetchTasks } from "./redux/thunks/tasksThunks";

import { fetchUsers } from "./redux/thunks/usersThunks";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env.local file')
}


function App() {

  
  const dispatch = useDispatch<AppDispatch>();
  const dados = useSelector((state: RootState) => state.tasks.value);
  const dadosUsers = useSelector((state: RootState) => state.users.value);

  useEffect(() => {
      dispatch((fetchTasks()));
      dispatch((fetchUsers()));
  }, [dispatch]);


console.log('dados centrais',dados);
console.log('dados dadosUsers',dados);




  return (
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY} 
      afterSignOutUrl="/"
    >
      <BrowserRouter>
        <Header/>
        <Routes>
          {/* Rotas públicas */}
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<SignUp/>} />

          {/* Rotas protegidas */}
          <Route 
            path='/kanban' 
            element={
              
              <ProtectedRoute>
                <Kanban/>
              </ProtectedRoute>
            } 
          />

          <Route
            path='/delete'
            element={
              <ProtectedRoute>
                <DeleteUserForm/>
              </ProtectedRoute>
              }
          />
          <Route 
            path='/settings' 
            element={
              <ProtectedRoute>
                <Settings/>
              </ProtectedRoute> 
            }
          />
          <Route 
            path='/profile' 
            element={
              <ProtectedRoute>
                <Profile/>
              </ProtectedRoute>
            } 
          />

          {/* Rota 404 */}
          <Route path='/*' element={<PageNotFound/>} />

          {/* Rota 403 */}
          <Route path='/denied' element={<AccessDenied/>} />
        </Routes> 

        
        <Footer/>
      </BrowserRouter>
    </ClerkProvider>
  )
}

export default App
