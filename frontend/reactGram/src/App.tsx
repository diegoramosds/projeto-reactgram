import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import './App.css'

//pages
import Home from './pages/Home/Home';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { useAuth } from './hooks/useAuth';

function App() {
  const {auth, loading} = useAuth()
 console.log(loading)
  if(loading) {
    return <p>Carregando...</p>
  }

 
  return (
      <div  className='text-zinc-100 md: lg:'>
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={auth ? <Home /> : <Navigate to="/login"/>} />
            <Route path="/register" element={!auth ? <Register /> : <Navigate to="/"/>} />
            <Route path="/login" element={!auth ? <Login /> : <Navigate to="/"/>} />
        </Routes>
      <Footer />
    </BrowserRouter>
      </div>
   
  )
}

export default App
