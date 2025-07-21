import React, { useState } from 'react';
import './styles.scss';
import { Link, useNavigate } from 'react-router-dom';
import {
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword
} from '../../utils/validations';
import { toast } from 'react-hot-toast';
import { apiRequest } from '../../helpers/fetchApi';

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    let errorMsg = '';
    if (name === 'username') errorMsg = validateUsername(value);
    if (name === 'email') errorMsg = validateEmail(value);
    if (name === 'password') {
      errorMsg = validatePassword(value);
      const confirmError = validateConfirmPassword(value, form.confirmPassword);
      setErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
    }
    if (name === 'confirmPassword') {
      errorMsg = validateConfirmPassword(form.password, value);
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      username: validateUsername(form.username),
      email: validateEmail(form.email),
      password: validatePassword(form.password),
      confirmPassword: validateConfirmPassword(form.password, form.confirmPassword),
    };

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((err) => err === '');
    if (!isValid) return;

    try {
      // 🌐 Call backend API
      const payload = {
        username: form.username,
        email: form.email,
        password: form.password,
      };

      const data = await apiRequest('/auth/signup', 'POST', payload);

      toast.success('Account created successfully! 🎉', {
        position: 'top-center',
        style: { background: '#ADD8E6' },
      });

      navigate('/'); // Redirect to login after signup
    } catch (error) {
      console.error('Signup Error:', error);
      toast.error(error.message || 'Signup failed. Please try again.', {
        position: 'top-center',
        style: { background: '#F08080' },
      });
    }
  };

  return (
    <div className='sign-up'>
      <form className='sign-up__form' onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        {errors.username && <p className="sign-up__error">{errors.username}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p className="sign-up__error">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <p className="sign-up__error">{errors.password}</p>}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <p className="sign-up__error">{errors.confirmPassword}</p>}

        <button type="submit">Sign Up</button>

        <div className='sign-up__links'>
          <Link to="/">Back to Login</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
