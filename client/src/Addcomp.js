import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
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
                <section className="container">
                    <h1 className="large" style={{ "color": "#30332E", "marginTop": "50px" }}>Register a New Event</h1>
                    <br /><br />
                    <form>
                        <input style={{ width: "41%" }} type="text" placeholder="Event Name*" onChange={changeHandler} value={compname} name="compname" /><br /><br />
                        <input style={{ width: "41%" }} type="email" placeholder="Event Organizer" onChange={changeHandler} value={email} name="email" /><br /><br />
                        <input style={{ width: "41%" }} type="text" placeholder="Event Type" onChange={changeHandler} value={description} name="description" /><br /><br />
                        <input style={{ width: "41%" }} type="text" placeholder="Other Information" onChange={changeHandler} value={rounds} name="rounds" /><br /><br />
                        <input style={{ width: "41%" }} type="text" placeholder="Event Date" onChange={changeHandler} value={lastdate} name="lastdate" /><br /><br />
                        <input type="button" className="btn btn-secondary" value="Post" onClick={handleSubmit} />
                    </form>
                </section>
                <br /><br />
            </center>
        </div>
    );
};

export default Addcomp;
