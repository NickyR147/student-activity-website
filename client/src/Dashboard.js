import React, { useState, useEffect } from "react";
import { Navigate, NavLink } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, Button, TextField } from "@material-ui/core";
import Header from "./Header";
import "./bg.css";

const Dashboard = () => {
  const [search, setSearch] = useState(null);
  const [data, setData] = useState([]);
  const [tokenn, setTokenn] = useState(localStorage.getItem("token"));
  const [y, setY] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/getcomp").then((res) => {
      !search
        ? setData(res.data)
        : setData(
            res.data.filter(
              (profile) =>
                profile.compname.toLowerCase().includes(search.toLowerCase()) ||
                profile.email.toLowerCase().includes(search.toLowerCase()) ||
                profile.eligibility.toLowerCase().includes(search.toLowerCase())
            )
          );
    });

    axios
      .get("http://localhost:5000/getpresentuser", {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((res) => setY(res.data._id));
  }, [search]);

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  const searchHandler = (e) => {
    e.preventDefault();
    // Clear existing matches
    setData([]);
    axios.get("http://localhost:5000/getcomp").then((res) => {
      !search
        ? setData(res.data)
        : setData(
            res.data.filter(
              (profile) =>
                profile.compname.toLowerCase().includes(search.toLowerCase()) ||
                profile.email.toLowerCase().includes(search.toLowerCase()) ||
                profile.eligibility
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                profile.description
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                profile.lastdate.toLowerCase().includes(search.toLowerCase()) ||
                profile.rounds.toString().includes(search)
            )
          );
    });
  };

  return (
    <div className="first">
      <Header />
      <section className="container">
        <center>
          <h1 className="large" style={{ color: "#30332E", marginTop: "20px" }}>
            Discover new events
          </h1>
        </center>
        <nav className="navbar navbar-light">
          <div className="container-fluid">
            <h3 className="navbar-brand">
              Explore and apply to events
              <span style={{ color: "blue" }}> </span>
            </h3>
            <form className="d-flex" onSubmit={searchHandler}>
              <TextField
                className="form-control me-2"
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Enter to Search"
                aria-label="Search"
              />
              <Button
                className="btn btn-outline-success"
                type="submit"
                variant="contained"
                color="primary"
              >
                Search
              </Button>
            </form>
          </div>
        </nav>
        <div className="profiles">
          <div className="row">
            {data.length >= 1 ? (
              data.map((profile) => (
                <div className="col-md-4">
                  <Card
                    className="profile bg-light card"
                    style={{ margin: "10px", width: "25.5rem" }}
                  >
                    <CardContent>
                      <center>
                        <div>
                          <h2 style={{ color: "#6DAFED" }}>
                            {profile.compname}
                          </h2>
                          <p>
                            <b>Organised by: </b>
                            {profile.email}
                          </p>
                          <p>
                            <b>Event Description and Type: </b>
                            {profile.description}
                          </p>
                          <p>
                            <b>Event Date: </b>
                            {profile.lastdate}
                          </p>
                          <p>
                            <b>Other Information: </b>
                            {profile.rounds}
                          </p>
                        </div>
                      </center>
                    </CardContent>
                  </Card>
                </div>
              ))
            ) : (
              <p>No matching results found.</p>
            )}
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <center>
          <Button
            variant="contained"
            color="primary"
            component={NavLink}
            to="/addcompany"
            style={{ color: "#00CCCC" }}
          >
            Click here if you want to add your own event.
          </Button>
        </center>
        <br />
        <br />
      </section>
      {tokenn === "undefined" && <Navigate to="/login" />}
    </div>
  );
};

export default Dashboard;
