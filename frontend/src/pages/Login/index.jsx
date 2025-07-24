import React, { useState } from "react";
import "./styles.scss";
import { Link, useNavigate } from "react-router-dom";
import { validatePassword } from "../../utils/validations";
import { toast } from "react-hot-toast";
import { apiRequest } from "../../helpers/fetchApi.js";

const Login = () => {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [errors, setErrors] = useState({ identifier: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    let errorMsg = "";
    if (name === "identifier") {
      errorMsg = value.trim() === "" ? "Username or Email is required" : "";
    }
    if (name === "password") errorMsg = validatePassword(value);

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const newErrors = {
  //     identifier: form.identifier.trim() === "" ? "Username or Email is required" : "",
  //     password: validatePassword(form.password),
  //   };

  //   setErrors(newErrors);

  //   const isValid = Object.values(newErrors).every((err) => err === "");
  //   if (!isValid) return;

  //   try {
  //     const data = await apiRequest("/auth/login", "POST", form);

  //     toast.success("Successfully logged in!", {
  //       position: "top-center",
  //       style: { background: "#ADD8E6" },
  //     });

  //     if (data.token) {
  //       localStorage.setItem("token", data.token);
  //     }

  //     navigate("/dashboard");
  //   } catch (error) {
  //     toast.error(error.message || "Login failed", {
  //       position: "top-center",
  //       style: { background: "#F08080" },
  //     });
  //   }
  // };
  
  
  const handleSubmit = ()=>{
    navigate("/dashboard");
  }

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="identifier"
          placeholder="Username or Email"
          value={form.identifier}
          onChange={handleChange}
        />
        {errors.identifier && <p className="login__error">{errors.identifier}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <p className="login__error">{errors.password}</p>}

        <button type="submit">Login</button>

        <div className="login__links">
          <Link to="#">Forgot password?</Link>
          <Link to="/sign-up">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
