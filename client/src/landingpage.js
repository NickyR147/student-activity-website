import React, { useState, useEffect } from "react";
import { Link, Navigate, NavLink } from "react-router-dom";
import axios from "axios";
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

const LandinPage = () => {
  const [search, setSearch] = useState(null);
  const [data, setData] = useState([]);
  const [tokenn, setTokenn] = useState(localStorage.getItem("token"));
  const [y, setY] = useState("");

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }
  console.log(tokenn);

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
            Welcome to Venture Hub
          </h1>
          <centre>
            <h3>A student acivity website made by students for students.</h3>
          </centre>
          <nav className="navbar navbar-light">
            <div className="container-fluid">
              <div>
              <br />
              <img
                className="round-img"
                src="https://www.svgrepo.com/show/5433/house.svg"
                height="250"
                width="450"
                alt="pix"
              />
              <br />
              <br />
              <p>To browse for roommates</p>
              <br />
              <button className="nav-link ">
                <NavLink
                  to="/roommatesearch"
                  className="nav-link"
                  style={{ color: "#000000" }}
                >
                  Click here!
                </NavLink>
              </button>
              <br />
              </div>
              <div>
                <br />
                <img
                  className="round-img"
                  src="https://cdni.iconscout.com/illustration/premium/thumb/events-4352689-3611150.png?f=webp"
                  height="250"
                  width="450"
                  alt="pix"
                />
                <br />
                <p>To browse events</p>
                <br />
                <button className="nav-link ">
                  <NavLink
                    to="/eventsearch"
                    className="nav-link"
                    style={{ color: "#000000" }}
                  >
                    Click here!
                  </NavLink>
                </button>
              </div>
              <div>
                <br />
                <img
                  className="round-img"
                  src="https://www.svgrepo.com/show/94674/books-stack-of-three.svg"
                  height="250"
                  width="450"
                  alt="pix"
                />
                <br />
                <p>Search or buy textbooks</p>
                <br />
                <button className="nav-link ">
                  <NavLink
                    to="/textbooksearch"
                    className="nav-link"
                    style={{ color: "#000000" }}
                  >
                    Click here!
                  </NavLink>
                </button>
              </div>
              <div>
                <br />
                <img
                  className="round-img"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Bus.svg/2560px-Bus.svg.png"
                  height="250"
                  width="450"
                  alt="pix"
                />
                <br />
                <p>Buy bus tickets</p>
                <br />
                <button className="nav-link ">
                  <NavLink
                    to="/"
                    className="nav-link"
                    style={{ color: "#000000" }}
                  >
                    Click here!
                  </NavLink>
                </button>
              </div>
            </div>
          </nav>
          <br />
          <br />
          <br />
        </center>
      </section>

      {tokenn === "undefined" && <Navigate to="/login" />}
    </div>
  );
};

export default LandinPage;
