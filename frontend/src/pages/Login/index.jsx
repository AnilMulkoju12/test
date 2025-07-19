import React, { useState } from "react";
import "./styles.scss";
import { Link, useNavigate } from "react-router-dom";
import { validateUsername, validatePassword } from "../../utils/validations";
import { toast } from "react-hot-toast";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form state
    setForm((prev) => ({ ...prev, [name]: value }));

    // Validate field in real-time
    let errorMsg = "";
    if (name === "username") errorMsg = validateUsername(value);
    if (name === "password") errorMsg = validatePassword(value);

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields on submit
    const newErrors = {
      username: validateUsername(form.username),
      password: validatePassword(form.password),
    };

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((err) => err === "");
    if (isValid) {
      toast.success("sucessfully loggged in", {
        position: "top-center",
        style: {
          background: "#ADD8E6",
        },
      });
      navigate("/dashboard")
      console.log("Form submitted ", form);
    }
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={form.username}
          onChange={handleChange}
        />
        {errors.username && <p className="login__error">{errors.username}</p>}

        <input
          type="password"
          name="password"
          placeholder="password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <p className="login__error">{errors.password}</p>}

        <button type="submit">Login</button>
        <div className="login__links">
          <Link to="#">forgot password ?</Link>
          <Link to="/sign-up">signup</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
