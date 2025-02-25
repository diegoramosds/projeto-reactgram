import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';


//pages
import Home from './pages/Home/Home';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { useAuth } from './hooks/useAuth';
import EditProfile from './pages/EditProifile/EditProfile';
import Profile from './pages/Settings/Settings';
import Photo from './pages/Photo/Photo';
import Search from './pages/Search/Search';
import Settings from './pages/Profile/Profile';

import Interaction from './pages/Interaction/Interaction';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const {auth, loading} = useAuth()
  if(loading) {
    return <p>Carregando...</p>
  }

  return (
      <div  className='flex flex-col min-h-screen text-zinc-100 bg-zinc-950/80'>
      <BrowserRouter>
      <NavBar />
      <ScrollToTop />
          <main className='flex-grow'>
          <Routes>
            <Route path="/" element={auth ? <Home /> : <Navigate to="/login"/>} />
            <Route path="/register" element={!auth ? <Register /> : <Navigate to="/"/>} />
            <Route path="/login" element={!auth ? <Login /> : <Navigate to="/"/>} />
            <Route path="/settings" element={auth ? <EditProfile /> : <Navigate to="/"/>} />
            <Route path="/users/profile/:id" element={auth ? <Settings /> : <Navigate to="/"/>} />
            <Route path="/users/:id" element={auth ? <Profile /> : <Navigate to="/"/>} />
            <Route path="/search" element={auth ? <Search /> : <Navigate to="/"/>} />
            <Route path="/photos/:id" element={auth ? <Photo /> : <Navigate to="/"/>} />
            <Route path="/photos/find/" element={auth ? <Interaction /> : <Navigate to="/"/>} />
          </Routes>
          </main>
    </BrowserRouter>
    <Footer />
      </div>
  )
}

export default App
