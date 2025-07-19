import React, { useState } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import {
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword
} from '../../utils/validations';

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form state
    setForm((prev) => ({ ...prev, [name]: value }));

    // Validate field in real-time
    let errorMsg = '';
    if (name === 'username') errorMsg = validateUsername(value);
    if (name === 'email') errorMsg = validateEmail(value);
    if (name === 'password') {
      errorMsg = validatePassword(value);
      // Also re-validate confirm password if password changes
      const confirmError = validateConfirmPassword(value, form.confirmPassword);
      setErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
    }
    if (name === 'confirmPassword') {
      errorMsg = validateConfirmPassword(form.password, value);
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields on submit
    const newErrors = {
      username: validateUsername(form.username),
      email: validateEmail(form.email),
      password: validatePassword(form.password),
      confirmPassword: validateConfirmPassword(form.password, form.confirmPassword),
    };

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((err) => err === '');
    if (isValid) {
      console.log('Sign up form submitted ✅', form);
      // API call or navigation here
    }
  };

  return (
    <div className='sign-up'>
      <form className='sign-up__form' onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={form.username}
          onChange={handleChange}
        />
        {errors.username && <p className="sign-up__error">{errors.username}</p>}

        <input
          type="email"
          name="email"
          placeholder="email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p className="sign-up__error">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <p className="sign-up__error">{errors.password}</p>}

        <input
          type="password"
          name="confirmPassword"
          placeholder="confirm password"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <p className="sign-up__error">{errors.confirmPassword}</p>}

        <button type="submit">Sign Up</button>
        <div className='sign-up__links'>
          <Link to="/">back to login</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
