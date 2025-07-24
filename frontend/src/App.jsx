import React from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp/index";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./helpers/PrivateRoute";
import SideBar from "./components/Sidebar";
import Client from "./pages/Client";
import Admin from "./pages/Admin";


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
          {/* <Route path="/" element={<Layout />}> */}
            {/* <Route element={<PrivateRoute />}> */}
              <Route path="/" element={<SideBar />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/client" element={<Client />} />
                <Route path="/admin" element={<Admin />} />
              </Route>
            {/* </Route> */}
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
