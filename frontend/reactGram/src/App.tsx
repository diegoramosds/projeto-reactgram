import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css'

//pages
import Home from './pages/Home/Home';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import NavBar from './components/navBar';
import Footer from './components/Footer';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

 
  return (
      <div  className='text-zinc-100 md:text-xl lg:'>
        <RouterProvider router={router} />
      </div>
   
  )
}

export default App
