import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../index.css'

function Register() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const [error, setError] = useState([]);

  const HandleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/add-user',
      data: formData,
    }).then((res) => {
      if (res.data.errors) {
        setError(res.data.errors)
      }
      else {
        alert('Registered Successfully!')
        navigate('/sign-in')
      }
    }).catch((error) => {
      alert(error.response.data.error)
    })
  }
  return (
    <form onSubmit={HandleRegister}>
      <h3>Sign Up</h3>
      <div className="mb-3">
        <label>Name</label>
        <input
          onChange={(e) => {
            setUser((prev) => ({ ...prev, name: e.target.value }))
          }}
          name='name'
          type="text"
          className="form-control"
          placeholder="name"
        />
      </div>
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
          name='email'
          type="password"
          className="form-control"
          placeholder="Enter password"
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered <a href="/sign-in">sign in?</a>
      </p>
    </form>
  )
}

export default Register
