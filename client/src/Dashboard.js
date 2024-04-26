import React, { useState, useEffect } from "react";
import { Link, Navigate, NavLink } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import "./bg.css";

const Dashboard = () => {
  const [search, setSearch] = useState(null);
  const [data, setData] = useState([]);
  const [tokenn, setTokenn] = useState(localStorage.getItem("token"));
  const [y, setY] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/getcomp")
      .then((res) =>
        !search
          ? setData(res.data)
          : setData(
              res.data.filter(
                (profile) =>
                  profile.compname.includes(search.toUpperCase()) |
                  profile.email.toLowerCase().includes(search.toLowerCase()) |
                  profile.eligibility
                    .toLowerCase()
                    .includes(search.toLowerCase())
              )
            )
      );

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
  console.log(tokenn);

  const searchHandler = (e) => {
    e.preventDefault();
    console.log(search);
    axios
      .get("http://localhost:5000/getcomp")
      .then((res) =>
        !search
          ? setData(res.data)
          : setData(
              res.data.filter(
                (profile) =>
                  profile.compname.includes(search.toUpperCase()) ||
                  profile.email.toLowerCase().includes(search.toLowerCase()) ||
                  profile.eligibility
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  profile.description
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  profile.lastdate
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  profile.rounds.toString().includes(search)
              )
            )
      );
  };

  return (
    <div className="first">
      <Header />

      <section className="container">
        <center>
          {" "}
          <h1
            className="large "
            style={{ color: "#30332E", marginTop: "20px" }}
          >
            Discover new events
          </h1>
        </center>

        <nav className="navbar navbar-light">
          <div className="container-fluid">
            <h3 className="navbar-brand">
              Explore and apply to events
              <span style={{ color: "blue" }}> </span>
            </h3>

            {/* <form className="d-flex" onSubmit={searchHandler}>
              <input
                className="form-control me-2"
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Enter to Search"
                aria-label="Search"
              />
              <input
                className="btn btn-outline-success"
                type="submit"
                value="Search"
              />
            </form> */}
          </div>
        </nav>

        <div className="profiles ">
          <div className="row">
            {data.length >= 1
              ? data.map((profile) => (
                  <div className="col-md-4">
                    <div
                      className="profile bg-light card "
                      style={{ margin: "10px", width: "25.5rem" }}
                    >
                      <center>
                        <div>
                          <br/>
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
                          <br />
                        </div>
                      </center>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <center>
          <li className="nav-link ">
            <NavLink
              to="/addcompany"
              className="nav-link"
              style={{ color: "#00CCCC" }}
            >
              Click here if you want to add your own event.
            </NavLink>
          </li>
        </center>
        <br />
        <br />
      </section>

      {tokenn === "undefined" && <Navigate to="/login" />}
    </div>
  );
};

export default Dashboard;
