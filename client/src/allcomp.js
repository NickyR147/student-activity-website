import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, Button } from "@material-ui/core";
import Header from "./Header";

const Dashboard = () => {
  const [search, setSearch] = useState(null);
  const [data, setData] = useState([]);
  const [tokenn, setTokenn] = useState(localStorage.getItem("token"));

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    axios
      .get("http://localhost:5000/allprofiles", {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        !search
          ? setData(res.data)
          : setData(
              res.data.filter(
                (profile) =>
                  profile.collegeId.includes(search.toUpperCase()) ||
                  profile.email.toLowerCase().includes(search.toLowerCase()) ||
                  profile.skill.toLowerCase().includes(search.toLowerCase()) ||
                  profile.branch.includes(search.toUpperCase())
              )
            );
      });
  }, [search]);

  return (
    <div>
      <Header />
      <section className="container">
        <h1 className="large" style={{ color: "orange", marginTop: "20px" }}>
          Companies Hub
        </h1>

        <nav className="navbar navbar-light">
          <div className="container-fluid">
            <h3 className="navbar-brand">
              Browse and Analyze companies{" "}
              <span style={{ color: "blue" }}>🤝</span>
            </h3>
          </div>
        </nav>

        <div className="profiles">
          <div className="row">
            {data.length >= 1
              ? data.map((profile) => (
                  <div className="col-md-4">
                    <Card style={{ margin: "10px", width: "25.5rem" }}>
                      <CardContent>
                        <center>
                          <div>
                            {profile.compPic ? (
                              <img
                                src={profile.compPic}
                                style={{
                                  border: "3px solid grey",
                                  height: "300px",
                                  width: "300px",
                                }}
                                className="card-img-top"
                                alt="img"
                              />
                            ) : null}
                            <h2 style={{ color: "green" }}>
                              {profile.fullname}
                            </h2>
                            <h3>{profile.collegeId}</h3>
                            <h4>{profile.branch}</h4>
                            <p>{profile.email}</p>
                            <Link
                              to={`/indprofile/${profile._id}`}
                              className="btn btn-primary"
                            >
                              View Profile
                            </Link>
                          </div>
                          <ul>
                            {profile.skill.split(",").map((skill) => (
                              <li
                                className="text-primary"
                                style={{
                                  listStyleType: "none",
                                  marginLeft: "-30px",
                                }}
                              >
                                {skill}
                              </li>
                            ))}
                          </ul>
                        </center>
                      </CardContent>
                    </Card>
                  </div>
                ))
              : null}
          </div>
        </div>

        <Button
          component={Link}
          to="/addevent"
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          Click here to post an event
        </Button>
      </section>
    </div>
  );
};

export default Dashboard;
