import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css'

//pages
import Home from './pages/Home/Home';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {

 
  return (
      <div  className='text-zinc-100 md: lg:'>
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="login" element={<Login />} />
        </Routes>
      <Footer />
    </BrowserRouter>
      </div>
   
  )
}

export default App
