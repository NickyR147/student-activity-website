import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Header from "./Header";
import "./bgstatic.css";

const myStyle = {
  backgroundImage: 'url("/bg.jpg"})',
  height: "100vh",
  marginTop: "-70px",
  fontSize: "50px",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

const RoommatePost = () => {
  const [selectedFiles, setSelectedfiles] = useState([]);
  const [data, seData] = useState({
    name: "",
    contact: "",
    gender: "",
    moveInDate: "",
    priceRange: "",
  });

  const { name, contact, gender, moveInDate, priceRange } = data;

  const changeHandler = (e) => {
    seData({ ...data, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    console.log(e.target.files);
    setSelectedfiles(e.target.files);
  };

  const fileUpload = () => {
    console.log(name, contact, gender, moveInDate, priceRange);
    if (name && contact && gender && moveInDate && priceRange) {
      axios
        .post("http://localhost:5000/roommates", {
          name: name,
          contact: contact,
          gender: gender,
          moveInDate: moveInDate,
          priceRange: priceRange,
        })
        .then((res) => {
          console.log(res.data);
          alert("Data Added");
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred while posting data.");
        });
    } else {
      alert("Give valid inputs");
    }
  };

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="back">
      <Header />
      <div> </div>
      <center>
        <section className="container">
          <h1
            className="large "
            style={{ color: "#30332E", marginTop: "50px" }}
          >
            Post Ad for Roommates
          </h1>
          <br></br>
          <form>
            <input
              style={{ width: "41%" }}
              type="text"
              placeholder="Your Name"
              onChange={changeHandler}
              value={name}
              name="name"
            />
            <br />
            <br />
            <input
              style={{ width: "41%" }}
              type="text"
              placeholder="Contact Information"
              onChange={changeHandler}
              value={contact}
              name="contact"
            />
            <br />
            <br />
            <select
              style={{ width: "41%" }}
              onChange={changeHandler}
              value={gender}
              name="gender"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <br />
            <br />
            <input
              style={{ width: "41%" }}
              type="date"
              placeholder="Move in date"
              onChange={changeHandler}
              value={moveInDate}
              name="moveInDate"
            />
            <br />
            <br />
            <input
              style={{ width: "41%" }}
              type="text"
              placeholder="Price"
              onChange={changeHandler}
              value={priceRange}
              name="priceRange"
            />
            <br />
            <br />
            <input
              type="button"
              className="btn btn-secondary"
              value="Post"
              onClick={fileUpload}
            />
          </form>
        </section>
        <br />
        <br />
      </center>
    </div>
  );
};

export default RoommatePost;
