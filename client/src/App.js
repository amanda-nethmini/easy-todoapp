import "./App.css";
import NavBar from "./components/NavigationBar/NavBar";
import Home from "./pages/Home/Home";
import Login from "./pages/User/Login/Login";
import { useState } from "react";
import axios from "axios";
import Signup from "./pages/User/SignUp/SignUp";

function App() {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setopenRegisterModal] = useState(false);

  axios.defaults.baseURL = "http://localhost:5000/";

  return (
    <div>
      <NavBar
        setOpenLoginModal={setOpenLoginModal}
        setOpenRegisterModal={setopenRegisterModal}
      />

      <Home setOpenLoginModal={setOpenLoginModal} />
      <Login
        openLoginModal={openLoginModal}
        setOpenLoginModal={setOpenLoginModal}
        setopenRegisterModal={setopenRegisterModal}
      />
      <Signup
        openRegisterModal={openRegisterModal}
        setopenRegisterModal={setopenRegisterModal}
        setOpenLoginModal={setOpenLoginModal}
      />
    </div>
  );
}

export default App;
