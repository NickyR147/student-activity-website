import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Container, Typography, Grid, AppBar, Toolbar } from '@material-ui/core';
import './Login.css';
import './bgstatic.css';

const Login = () => {
    const [auth, setAuth] = useState(false);
    const [data, seData] = useState({
        email: '',
        password: '',
    });
    const { email, password } = data;

    const changeHandler = (e) => {
        seData({ ...data, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/login', data).then((res) => {
            if (res.data.length <= 30) {
                alert(res.data);
            }
            localStorage.setItem('token', res.data.token);
            setAuth(true);
        });
    };

    if (auth) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div className="back">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Venture Hub - Login
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid container justify="center" style={{ marginTop: '100px' }}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" align="center" style={{ color: '#30332E', marginBottom: '20px' }}>
                            Sign In
                        </Typography>
                        <Typography variant="body1" align="center" style={{ marginBottom: '20px' }}>
                            <b>Enter your details below to Sign In</b>
                        </Typography>
                        <form onSubmit={submitHandler}>
                            <TextField
                                variant="outlined"
                                label="Email"
                                fullWidth
                                margin="normal"
                                name="email"
                                value={email}
                                onChange={changeHandler}
                            />
                            <TextField
                                variant="outlined"
                                label="Password"
                                type="password"
                                fullWidth
                                margin="normal"
                                name="password"
                                value={password}
                                onChange={changeHandler}
                            />
                            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
                                Login
                            </Button>
                        </form>
                        <Typography variant="body1" align="center" style={{ marginTop: '20px' }}>
                            Don't have an account? <Link to="/register">Sign Up</Link>
                        </Typography>
                        <Typography variant="body1" align="center" style={{ marginTop: '20px' }}>
                            <Link to="/forgot-password">Forgot Username or Password</Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Login;
