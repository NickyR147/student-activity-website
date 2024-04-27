import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Card, CardContent } from '@material-ui/core';
import './App.css';
import Header from './Header';

const Addcomp = () => {
    const [data, seData] = useState({
        compname: "",
        email: "",
        lastdate: "",
        description: "",
        rounds: "",
    });

    const { compname, email, lastdate, description, rounds } = data;

    const changeHandler = e => {
        seData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        console.log(compname, email, lastdate, description, rounds);
        if (compname && email && lastdate && description && rounds) {
            axios.post('http://localhost:5000/compregister', { compname, email, lastdate, description, rounds })
                .then(res => {
                    console.log(res.data);
                    alert("Data Added");
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert("Failed to add data");
                });
        } else {
            alert("Please provide valid inputs");
        }
    };

    if (!localStorage.getItem('token')) {
        return <Navigate to='/login' />;
    }

    return (
        <div className='back'>
            <Header />
            <center>
                <Card style={{ maxWidth: 400, margin: "50px auto" }}>
                    <CardContent>
                        <h1 style={{ color: "#30332E" }}>Register a New Event</h1>
                        <form>
                            <TextField
                                style={{ marginBottom: 20 }}
                                fullWidth
                                label="Event Name*"
                                onChange={changeHandler}
                                value={compname}
                                name="compname"
                            />
                            <TextField
                                style={{ marginBottom: 20 }}
                                fullWidth
                                label="Event Organizer"
                                onChange={changeHandler}
                                value={email}
                                name="email"
                            />
                            <TextField
                                style={{ marginBottom: 20 }}
                                fullWidth
                                label="Event Type"
                                onChange={changeHandler}
                                value={description}
                                name="description"
                            />
                            <TextField
                                style={{ marginBottom: 20 }}
                                fullWidth
                                label="Other Information"
                                onChange={changeHandler}
                                value={rounds}
                                name="rounds"
                            />
                            <TextField
                                style={{ marginBottom: 20 }}
                                fullWidth
                                label="Event Date"
                                type="date"
                                onChange={changeHandler}
                                value={lastdate}
                                name="lastdate"
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="secondary"
                                onClick={handleSubmit}
                            >
                                Post
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </center>
        </div>
    );
};

export default Addcomp;
