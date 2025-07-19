
// Validate Email format
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "email is required";
  if (!regex.test(email)) return "Invalid email format";
  return "";
};

// Validate Username
export const validateUsername = (username) => {
  if (!username) return "username is required";
  if (username.length < 3) return "username must be at least 3 characters";
  return "";
};

// Validate Password
export const validatePassword = (password) => {
  if (!password) return "password is required";
  if (password.length < 6) return "password must be at least 6 characters";
  return "";
};

// Validate Confirm Password
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return "confirm Password is required";
  if (password !== confirmPassword) return "passwords do not match";
  return "";
};
