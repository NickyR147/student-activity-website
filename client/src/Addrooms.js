import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core";
import "./App.css";
import Header from "./Header";
import "./bgstatic.css";

const RoommatePost = () => {
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
      <center>
        <Card style={{ maxWidth: 400, margin: "50px auto" }}>
          <CardContent>
            <h1 style={{ color: "#30332E" }}>Post Ad for Roommates</h1>
            <form>
              <TextField
                style={{ marginBottom: 20 }}
                fullWidth
                label="Your Name"
                onChange={changeHandler}
                value={name}
                name="name"
              />
              <TextField
                style={{ marginBottom: 20 }}
                fullWidth
                label="Contact Information"
                onChange={changeHandler}
                value={contact}
                name="contact"
              />
              <Select
                style={{ marginBottom: 20 }}
                fullWidth
                label="Gender"
                onChange={changeHandler}
                value={gender}
                name="gender"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
              <TextField
                style={{ marginBottom: 20 }}
                fullWidth
                label="Move in date"
                type="date"
                onChange={changeHandler}
                value={moveInDate}
                name="moveInDate"
              />
              <TextField
                style={{ marginBottom: 20 }}
                fullWidth
                label="Price"
                onChange={changeHandler}
                value={priceRange}
                name="priceRange"
              />
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={fileUpload}
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

export default RoommatePost;
