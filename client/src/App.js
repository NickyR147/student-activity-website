import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import LandinPage from "./landingpage";
import Dashboard from "./Dashboard";
import Addcomp from "./Addcomp";
import Register from "./Register";
import RoommatePost from "./Addrooms";
import EditProfile from "./editprofile";
import RoommateSearch from "./roommatesearch";
import TextbookSearch from "./textbooksearch";
import TextbookPurchase from "./textbookpurchase";
import VoteForm from "./VoteForm";
import Search from "./people";
import ForgotPassword from "./forgotpwd";
import ResetPassword from "./ResetPasswordForm";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/editprofile" exact element={<EditProfile />} />
          <Route path="/dashboard" exact element={<LandinPage />} />
          <Route path="/eventsearch" exact element={<Dashboard />} />
          <Route path="/addcompany" exact element={<Addcomp />} />
          <Route path="/roommatepost" exact element={<RoommatePost />} />
          <Route path="/textbooksearch" exact element={<TextbookSearch />} />
          <Route path="/textbookpurchase" exactelement={<TextbookPurchase />} />
          <Route path="/roommatesearch" exact element={<RoommateSearch />} />
          <Route path="/voting" exact element={<VoteForm />} />
          <Route path="/search" exact element={<Search />} />
          <Route path="/forgot-password" exact element={<ForgotPassword />} />
          <Route path="/resetpassword/:id/:token" exact element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
