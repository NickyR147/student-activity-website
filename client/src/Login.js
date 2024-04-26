import React,{useState} from 'react'
import { Link,Navigate } from 'react-router-dom'
import axios from 'axios'
import './Login.css'
import './bgstatic.css'

const Login = () => {
    const [auth,setAuth] = useState(false)
    const [data,seData] = useState({
        email : '',
        password : '',
    })
    const {email, password} = data
    const changeHandler = e =>{
        seData({...data,[e.target.name]:e.target.value})
    }
    const submitHandler = e =>{
        e.preventDefault();
        axios.post('http://localhost:5000/login',data).then(
        res => { if(res.data.length<=30){alert(res.data)}; localStorage.setItem('token',res.data.token);setAuth(true)}
        )
    }
    if(auth){
        return <Navigate to='/dashboard' />
    }

    return (
        <div className='back'>
        <nav className="navbar bg-dark justify-content-left">
            <h1 id="header">
            <h1>Event Hub Login</h1>
            </h1>
        </nav>
            <center>
            <section className="container">
                <h1 className="large " style={{"color":"#30332E","marginTop":"100px"}} >Sign In</h1>
                <p className="lead"><b>Enter your details below to Sign In</b></p><br></br>
                <form onSubmit={submitHandler}>
                    <input className="form-control-lg m-1 border" style={{width:"40%"}} type="email"    placeholder="Please enter your username"    name="email" value={email}   onChange={changeHandler} /><br /><br />
                    <input className="form-control-lg m-1 border" style={{width:"40%"}} type="password" placeholder="Please enter your password" name="password" value={password} onChange={changeHandler} /><br /><br />
                    <input type="submit" className="btn btn-secondary" value="Login" />
                </form>
                <p><br></br>
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </section>
            </center>
        </div>
    )
}

export default Login
