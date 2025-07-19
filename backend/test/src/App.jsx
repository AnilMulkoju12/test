import React from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp/index";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
