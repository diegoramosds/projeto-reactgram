import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { useAuth } from "./hooks/useAuth";
import Home from "./pages/Home/Home";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import EditProfile from "./pages/EditProifile/EditProfile";
import Profile from "./pages/Settings/Settings";
import Photo from "./pages/Photo/Photo";
import Search from "./pages/Search/Search";
import Settings from "./pages/Profile/Profile";
import Interaction from "./pages/Interaction/Interaction";
import ScrollToTop from "./components/ScrollToTop";
import Loading from "./components/Loading";

function AnimatedRoutes() {
  const location = useLocation();
  const { auth, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 0 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
        exit={{
          opacity: 0,
          x: 0,
          transition: { duration: 0.3, ease: "easeInOut" },
        }}
        className="flex-grow"
      >
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={auth ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/register"
            element={!auth ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!auth ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/settings"
            element={auth ? <EditProfile /> : <Navigate to="/" />}
          />
          <Route
            path="/users/profile/:id"
            element={auth ? <Settings /> : <Navigate to="/" />}
          />
          <Route
            path="/users/:id"
            element={auth ? <Profile /> : <Navigate to="/" />}
          />
          <Route
            path="/search"
            element={auth ? <Search /> : <Navigate to="/" />}
          />
          <Route
            path="/photos/:id"
            element={auth ? <Photo /> : <Navigate to="/" />}
          />
          <Route
            path="/photos/find/"
            element={auth ? <Interaction /> : <Navigate to="/" />}
          />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen text-zinc-100">
        <NavBar />
        <ScrollToTop />
        <AnimatedRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
