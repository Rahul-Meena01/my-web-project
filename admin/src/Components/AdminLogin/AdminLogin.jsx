import React, { useState, useEffect } from 'react';
import './AdminLogin.css';

const AdminLogin = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        // Add entrance animation
        setTimeout(() => setAnimationClass('animate-in'), 100);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.username.trim()) {
            setError('Username required है');
            return;
        }
        if (!formData.password.trim()) {
            setError('Password required है');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:4000/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                // Store admin token and info
                localStorage.setItem('admin-token', data.token);
                localStorage.setItem('admin-info', JSON.stringify(data.admin));
                
                // Success animation
                setAnimationClass('success-animation');
                
                // Call parent login function after animation
                setTimeout(() => {
                    onLogin(data.token, data.admin);
                }, 800);
            } else {
                setError(data.message || 'Login failed');
                setAnimationClass('shake-animation');
                setTimeout(() => setAnimationClass(''), 600);
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Server connection failed. Please try again.');
            setAnimationClass('shake-animation');
            setTimeout(() => setAnimationClass(''), 600);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-background">
                <div className="floating-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                    <div className="shape shape-4"></div>
                    <div className="shape shape-5"></div>
                </div>
            </div>
            
            <div className={`admin-login-card ${animationClass}`}>
                <div className="admin-login-header">
                    <div className="admin-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4L13.5 7H7V9H13.5L15 12L21 9ZM16 13C16 15.2 14.2 17 12 17C9.8 17 8 15.2 8 13H6C6 16.3 8.7 19 12 19C15.3 19 18 16.3 18 13H16Z" fill="currentColor"/>
                        </svg>
                    </div>
                    <h1>Admin Panel</h1>
                    <p>Secure Admin Access Portal</p>
                </div>

                <form onSubmit={handleSubmit} className="admin-login-form">
                    <div className="form-group">
                        <label htmlFor="username">Admin Username</label>
                        <div className="input-container">
                            <svg className="input-icon" viewBox="0 0 24 24" fill="none">
                                <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor"/>
                                <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="currentColor"/>
                            </svg>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter admin username"
                                disabled={loading}
                                autoComplete="username"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Admin Password</label>
                        <div className="input-container">
                            <svg className="input-icon" viewBox="0 0 24 24" fill="none">
                                <path d="M6 10V8C6 5.79086 7.79086 4 10 4H14C16.2091 4 18 5.79086 18 8V10H19C19.5523 10 20 10.4477 20 11V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V11C4 10.4477 4.44772 10 5 10H6ZM8 10H16V8C16 6.89543 15.1046 6 14 6H10C8.89543 6 8 6.89543 8 8V10Z" fill="currentColor"/>
                            </svg>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter admin password"
                                disabled={loading}
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={loading}
                            >
                                {showPassword ? (
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="currentColor"/>
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M12 7C14.76 7 17 9.24 17 12C17 12.65 16.87 13.26 16.64 13.83L19.56 16.75C21.07 15.49 22.26 13.86 22.99 12C21.27 7.61 17 4.5 12 4.5C10.59 4.5 9.25 4.75 8.01 5.2L10.17 7.36C10.74 7.13 11.35 7 12 7ZM2 4.27L4.28 6.55L4.73 7C3.08 8.3 1.78 10 1.01 12C2.73 16.39 7 19.5 12 19.5C13.55 19.5 15.03 19.2 16.38 18.66L16.81 19.09L19.73 22L21 20.73L3.27 3L2 4.27ZM7.53 9.8L9.08 11.35C9.03 11.56 9 11.78 9 12C9 13.66 10.34 15 12 15C12.22 15 12.44 14.97 12.65 14.92L14.2 16.47C13.53 16.8 12.79 17 12 17C9.24 17 7 14.76 7 12C7 11.21 7.2 10.47 7.53 9.8Z" fill="currentColor"/>
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="error-message">
                            <svg viewBox="0 0 24 24" fill="none">
                                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
                            </svg>
                            {error}
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className={`admin-login-btn ${loading ? 'loading' : ''}`}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <div className="spinner"></div>
                                Authenticating...
                            </>
                        ) : (
                            <>
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path d="M10 17L15 12L10 7V10H4V14H10V17Z" fill="currentColor"/>
                                    <path d="M20 12C20 16.4183 16.4183 20 12 20V18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6V4C16.4183 4 20 7.58172 20 12Z" fill="currentColor"/>
                                </svg>
                                Access Admin Panel
                            </>
                        )}
                    </button>
                </form>

                <div className="admin-login-footer">
                    <div className="security-badge">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z" fill="currentColor"/>
                        </svg>
                        <span>Secure Admin Access</span>
                    </div>
                    <p>© 2024 MyStore Admin Panel. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;