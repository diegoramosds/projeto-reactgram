import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Home from "../pages/Home/Home";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import EditProfile from "../pages/EditProifile/EditProfile";
import Profile from "../pages/Settings/Settings";
import Photo from "../pages/Photo/Photo";
import Search from "../pages/Search/Search";
import Settings from "../pages/Profile/Profile";
import Interaction from "../pages/Interaction/Interaction";
import { useAuth } from "../hooks/useAuth";

const pageVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.5, ease: "easeInOut" } },
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const { auth } = useAuth();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full h-full"
      >
        <Routes location={location}>
          <Route path="/" element={auth ? <Home /> : <Navigate to="/login" />} />
          <Route path="/register" element={!auth ? <Register /> : <Navigate to="/" />} />
          <Route path="/login" element={!auth ? <Login /> : <Navigate to="/" />} />
          <Route path="/settings" element={auth ? <EditProfile /> : <Navigate to="/" />} />
          <Route path="/users/profile/:id" element={auth ? <Settings /> : <Navigate to="/" />} />
          <Route path="/users/:id" element={auth ? <Profile /> : <Navigate to="/" />} />
          <Route path="/search" element={auth ? <Search /> : <Navigate to="/" />} />
          <Route path="/photos/:id" element={auth ? <Photo /> : <Navigate to="/" />} />
          <Route path="/photos/find/" element={auth ? <Interaction /> : <Navigate to="/" />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
