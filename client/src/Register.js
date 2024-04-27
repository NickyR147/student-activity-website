import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Container, Typography, AppBar, Toolbar } from '@mui/material';
import './App.css';
import './bgstatic.css';

const Register = () => {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    email: '',
    loginName: '',
    password: '',
    confirmPassword: '',
    department: '',
    phoneNumber: '',
  });
  const [x, setX] = useState(0);
  const {
    firstName,
    lastName,
    address,
    city,
    state,
    zipCode,
    email,
    loginName,
    password,
    confirmPassword,
    department,
    phoneNumber,
  } = data;

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password.length > 5) {
      if (firstName && lastName && email && loginName && department && phoneNumber) {
        if (password === confirmPassword) {
          if (address && city && state && zipCode) {
            axios.post('http://localhost:5000/register', data, {
              headers: {
                'x-token': localStorage.getItem('token'),
              },
            })
              .then((res) => {
                setX(x + 1);
                alert(res.data);
                console.log(x);
              })
              .catch((err) => {
                console.error('Error:', err);
                alert('Registration failed. Please try again later.');
              });
          } else {
            alert('Please enter a valid address');
          }
        } else {
          alert('Passwords do not match');
        }
      } else {
        alert('Please fill the complete form with valid details');
      }
    } else {
      alert('Please use min 6 characters for password');
    }
  };

  return (
    <div className='back'>
      <AppBar position="static" className="navbar bg-dark justify-content-left">
        <Toolbar>
          <Typography variant="h6" id="header">
            Venture Hub - Registration
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <center>
            <br/>
            <br/>
            <Typography variant="body1"><b>Please enter your details carefully</b></Typography>
          <br/>
          <form onSubmit={submitHandler}>
            {/* Form fields */}
            <TextField style={{ width: "41%" }} type="text" placeholder="First Name*" onChange={changeHandler} value={firstName} name="firstName" /><br /><br />
            <TextField style={{ width: "41%" }} type="text" placeholder="Last Name*" onChange={changeHandler} value={lastName} name="lastName" /><br /><br />
            <TextField style={{ width: "41%" }} type="email" placeholder="E-Mail Address*" onChange={changeHandler} value={email} name="email" /><br /><br />
            <TextField style={{ width: "41%" }} type="text" placeholder="Phone Number" onChange={changeHandler} value={phoneNumber} name="phoneNumber" /><br /><br />
            <TextField style={{ width: "41%" }} type="text" placeholder="Address*" onChange={changeHandler} value={address} name="address" /><br /><br />
            <TextField style={{ width: "41%" }} type="text" placeholder="City*" onChange={changeHandler} value={city} name="city" /><br /><br />
            <TextField style={{ width: "41%" }} type="text" placeholder="State*" onChange={changeHandler} value={state} name="state" /><br /><br />
            <TextField style={{ width: "41%" }} type="text" placeholder="Zip Code*" onChange={changeHandler} value={zipCode} name="zipCode" /><br /><br />
            <TextField style={{ width: "41%" }} type="text" placeholder="Department*" onChange={changeHandler} value={department} name="department" /><br /><br />
            <TextField style={{ width: "41%" }} type="text" placeholder="Username*" onChange={changeHandler} value={loginName} name="loginName" /><br /><br />
            <TextField style={{ width: "41%" }} type="password" placeholder="Password*" onChange={changeHandler} value={password} name="password" /><br /><br />
            <TextField style={{ width: "41%" }} type="password" placeholder="Confirm Password*" onChange={changeHandler} value={confirmPassword} name="confirmPassword" /><br /><br />

            {/* Submit button */}
            <br /><Button type="submit" variant="contained" color="secondary">Register</Button>
          </form><br />
          <Typography>
            Already have an Account? <Link to="/login">Sign in</Link>
          </Typography>
          <br/>
          <br/>
        </center>
      </Container>
      {/* Redirect to login page after successful registration */}
      {x === 1 ? <Navigate to="/login" /> : null}
    </div>
  )
}

export default Register;
