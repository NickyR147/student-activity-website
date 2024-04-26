import React,{useState} from 'react'
import { Link ,Navigate, NavLink } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import './bgstatic.css'

const EditProfile = () => {
    const [data,seData] = useState({
        firstName : '', 
        lastName : '', 
        address : '', 
        city : '', 
        state : '', 
        zipCode : '', 
        loginName : '', 
        password : '', 
        confirmPassword : ''
    })
    const [x,setX] = useState(0);
    const {firstName, lastName, address, city, state, zipCode, loginName, password, confirmPassword} = data
    const changeHandler = e =>{
        seData({...data,[e.target.name]:e.target.value})
    }
    // const changeHandler2 = e =>{
    //     seData({...data,[e.target.name]:e.target.value.toUpperCase()})
    // }
    // const Handler = e =>{
    //     seData({...data,[e.target.name]:e.target.value})
    // }

    const submitHandler = e =>{
        e.preventDefault();
        if(password.length>5){
            if(firstName && lastName && loginName){
                if(password===confirmPassword){
                    if(address && city && state && zipCode){
                        axios.post('http://localhost:5000/editprofile',data,{
                        headers : {
                            'x-token' : localStorage.getItem('token')
                        }
                        }).then(res =>{ setX(x+1);
                            alert(res.data);
                            console.log(x) 
                        })
                    } else {
                        alert("Please enter a valid address")
                    }
                } else {
                    alert("Passwords do not match")
                }
            } else {
                alert("Please fill the complete form with valid details")
            }
        } else {
            alert("Please use min 6 characters for password")
        }
    }

    return (
        <div className='back'>
            <nav className="navbar bg-dark justify-content-left">
            <h1 id="header">
                <h1>Venture Hub</h1>
            </h1>
            </nav>
            <center>
            <section className="container">
                <h1 className="large " style={{"color":"#30332E","marginTop":"50px"}}>Edit Profile</h1>
                <p className="lead"><b>Please enter your details carefully</b></p><br></br>
                <form onSubmit={submitHandler}>
                    <input style={{width:"41%"}} type="text"             placeholder="First Name*"       onChange={changeHandler} value={firstName} name="firstName" /><br /><br />
                    <input style={{width:"41%"}} type="text"             placeholder="Last Name*"       onChange={changeHandler} value={lastName} name="lastName" /><br /><br />
                    {/* <input style={{width:"41%"}} type="email"            placeholder="E-Mail Address*"   onChange={changeHandler} value={email} name="email" /><br /><br /> */}
                    <input style={{width:"41%"}} type="text"             placeholder="Address*"          onChange={changeHandler} value={address} name="address" /><br /><br />
                    <input style={{width:"41%"}} type="text"             placeholder="City*"          onChange={changeHandler} value={city} name="city" /><br /><br />
                    <input style={{width:"41%"}} type="text"             placeholder="State*"          onChange={changeHandler} value={state} name="state" /><br /><br />
                    <input style={{width:"41%"}} type="text"             placeholder="Zip Code*"          onChange={changeHandler} value={zipCode} name="zipCode" /><br /><br />
                    <input style={{width:"41%"}} type="text"             placeholder="Username*"          onChange={changeHandler} value={loginName} name="loginName" /><br /><br />
                    <input style={{width:"41%"}} type="password"         placeholder="Password*"         onChange={changeHandler} value={password} name="password" /><br /><br />
                    <input style={{width:"41%"}} type="confirmPassword"  placeholder="Confirm Password*" onChange={changeHandler} value={confirmPassword} name="confirmPassword" /><br /><br />

                    <br></br><input type="submit" className="btn btn-secondary" value="Update Details" />
                </form><br/>
                            
                <li className="nav-link ">
                <NavLink to="/dashboard" className="nav-link" style={({ color: '#56CEDB'})}>
                    Return without changing anything.
                </NavLink>
            </li>
            
            </section><br /><br />
            </center>
            {x===1 ? <Navigate to="/login" /> : null}
        </div>
    )
}

export default EditProfile
