import React, { useState } from 'react'
import '../index.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate();
  const HandleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', user.email);
    formData.append('password', user.password);

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/all-users', {
        params: { email: user.email, password: user.password }
      });

      if (response.data) {
        console.log(response.data);
        // Authentication successful; handle the login in your application
        alert('Login Successful!');
        navigate('/dashboard'); // Redirect to the dashboard or the user's profile page
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert('An error occurred:', error.message);
      }
    }
  };

  return (
    <form onSubmit={HandleLogin}>
      <h3>Sign In</h3>
      <div className="mb-3">
        <label>Email address</label>
        <input
          onChange={(e) => {
            setUser((prev) => ({ ...prev, email: e.target.value }))
          }}
          name='email'
          type="email"
          className="form-control"
          placeholder="Enter email"
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          onChange={(e) => {
            setUser((prev) => ({ ...prev, password: e.target.value }))
          }}
          name='password'
          type="password"
          className="form-control"
          placeholder="Enter password"
        />
      </div>
      <div className="mb-3">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <p className="forgot-password text-right">
        Forgot <a href="#">password?</a>
      </p>
    </form>
  )
}


export default Login
