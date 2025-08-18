import React, { useState } from "react";
import './CSS/LoginSignup.css'

const LoginForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Login Function
  const login = async () => {
    let responseData;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: formData.email, password: formData.password}),
    })
    .then((response) => response.json())
    .then((data) => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/"); // Redirect to home page on successful login
    } else {
      alert(responseData.message); // Show error message from backend
    }
  }

  // Signup Function
  const signup = async () => {
    // Basic frontend validation for password confirmation
    if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return; // Stop the function if passwords don't match
    }

    let responseData;
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: formData.name, email: formData.email, password: formData.password}),
    })
    .then((response) => response.json())
    .then((data) => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/"); // Redirect to home page on successful signup
    } else {
      alert(responseData.message); // Show error message from backend
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (isForgotPassword) {
      // This part remains a placeholder as there is no backend endpoint for it.
      console.log("Reset Password Email:", { email: formData.email });
      alert("Password reset link sent to your email!");
      setIsForgotPassword(false);
    } else if (isSignUp) {
      await signup();
    } else {
      await login();
    }
    
    setIsLoading(false); // Stop loading indicator after API call is complete
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setIsForgotPassword(false);
    setShowPassword(false);
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  const toggleForgotPassword = () => {
    setIsForgotPassword(!isForgotPassword);
    setIsSignUp(false);
    setShowPassword(false);
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      {/* Background Image */}
      <div className="background-image">
        {/* Overlay */}
        <div className="background-overlay"></div>
      </div>

      {/* Login Card */}
      <div className="card-container">
        <div className="glass-card">
          {/* Logo/Brand */}
          <div className="brand-section">
            <h1 className="brand-title">SHOPPER</h1>
            <div className="brand-underline"></div>
          </div>

          {/* Form Header */}
          <div className="form-header">
            <h2 className="form-title">
              {isForgotPassword
                ? "Reset Your Password"
                : isSignUp
                ? "Join Shopper Today"
                : "Welcome Back to Shopper"}
            </h2>
            <p className="form-subtitle">
              {isForgotPassword
                ? "Enter your email to receive a reset link"
                : isSignUp
                ? "Create your account to start shopping"
                : "Sign in to continue your shopping journey"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="login-form">
            {/* Name Field (Sign Up Only) */}
            {isSignUp && !isForgotPassword && (
              <div className="form-group form-transition">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            {/* Email Field */}
            <div className="form-group form-transition">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            {!isForgotPassword && (
              <div className="form-group form-transition">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="password-toggle"
                  >
                    {showPassword ? (
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.641 6.641m3.237 3.237L12 12m0 0l2.122 2.122M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Confirm Password Field (Sign Up Only) */}
            {isSignUp && !isForgotPassword && (
              <div className="form-group form-transition">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            )}

            {/* Forgot Password (Sign In Only) */}
            {!isSignUp && !isForgotPassword && (
              <div className="forgot-password">
                <button
                  type="button"
                  onClick={toggleForgotPassword}
                  className="forgot-password-link"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className={`btn-primary ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  Processing...
                </div>
              ) : (
                <>
                  {isForgotPassword
                    ? "Send Reset Link"
                    : isSignUp
                    ? "Create Account"
                    : "Sign In"}
                </>
              )}
            </button>
          </form>

          {/* Divider - Only show for Sign In/Sign Up, not for Forgot Password */}
          {!isForgotPassword && (
            <>
              <div className="divider">
                <div className="divider-line"></div>
                <span className="divider-text">or</span>
                <div className="divider-line"></div>
              </div>

              {/* Social Login */}
              <div className="social-login">
                <button
                  type="button"
                  className="social-btn"
                  title="Sign in with Google"
                >
                  <svg viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  className="social-btn"
                  title="Sign in with Facebook"
                >
                  <span className="facebook-icon">f</span>
                </button>

                <button
                  type="button"
                  className="social-btn"
                  title="Sign in with X (Twitter)"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </button>
              </div>
            </>
          )}

          {/* Toggle Links */}
          <div className="toggle-section">
            {isForgotPassword ? (
              <p className="toggle-text">
                Remembered your password?
                <button
                  type="button"
                  onClick={toggleForgotPassword}
                  className="toggle-link"
                >
                  Back to Sign In
                </button>
              </p>
            ) : (
              <p className="toggle-text">
                {isSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"}
                <button
                  type="button"
                  onClick={toggleForm}
                  className="toggle-link"
                >
                  {isSignUp ? "Sign in" : "Sign up"}
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <p className="footer-text">© 2025 Shopper. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;