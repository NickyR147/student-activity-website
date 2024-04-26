import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import LandinPage from './landingpage'
import Dashboard from './Dashboard'
import Profile from './Profile'
import Addcomp from './Addcomp'
import Register from './Register'
import RoommatePost from './Addrooms'
import Registeredcompanies from "./Registeredcompanies"
import Indregcomp from './Indregcomp'
import Selectedcomp from './Selectedcomp'
import EditProfile from './editprofile'
// import RoommatePost from './roommatepost'
import RoommateSearch from './roommatesearch'
import TextbookSearch from './textbooksearch';
import TextbookPurchase from './textbookpurchase';

const App = () => {
  
  return (
    <div>
      <BrowserRouter>   
      <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/login' exact element={<Login/>}/>
        <Route path='/register' exact element={<Register />} />
        <Route path='/editprofile' exact element={<EditProfile/>}/>
        <Route path='/dashboard' exact element={<LandinPage/>}/>
        <Route path='/eventsearch' exact element={<Dashboard />} />
        <Route path='/addcompany' exact element={<Addcomp />} />
        <Route path='/roommatepost' exact element={<RoommatePost/>} />
        <Route path='/textbooksearch' exact element={<TextbookSearch />} />
        <Route path='/textbookpurchase' exact element={<TextbookPurchase/>} />
        {/* <Route path='/registeredcompanies' exact element={<Registeredcompanies />} /> */}
        {/* <Route path='/indprofile/:id/' exact element={<Profile />} /> */}
        {/* <Route path='/indprofile/:id/:sid' exact element={<Profile />} /> */}
        {/* <Route path='/indregcompprofile/:id' exact element={<Indregcomp />} /> */}
        {/* <Route path='/roommatepost' exact element={<RoommatePost/>}/> */}
        <Route path='/roommatesearch' exact element={<RoommateSearch/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
