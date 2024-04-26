import React from 'react'
import { Link } from 'react-router-dom'
import './bgstatic.css'

const Home = () => {
    return (
        <div className='back'>
            <center>

                {/* <Logo /> */}
                
               
                <section>
                <img src={require('./vjitlogo.png')} height="100px" width="auto"/>
                    
                        <h1 h1 style={{"marginTop":"100px"}}>VJIT Event Hub</h1>
                        <p >
                            Explore events held by our college and register for them!
                        </p>
                        
                        <Link to='/register' className="btn btn-primary">Sign Up</Link>&nbsp;&nbsp;&nbsp;
                        <Link to='/login' className="btn btn-success">Sign In</Link>
                    
                </section>
                
                
            </center>
        </div>
        
    )
}

export default Home


