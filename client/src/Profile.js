import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import "./bg.css";

const Indprofile = () => {
  const { id, sid } = useParams();

  const [iprofile, setIprofile] = useState(null);
  const [puser, setPuser] = useState(null);

  const [x, setX] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/indcompprofile/${id}`)
      .then((res) => setIprofile(res.data));

    axios
      .get(`http://localhost:5000/getpresentuser`, {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((res) => setPuser(res.data));
    console.log(id);

    axios
      .get("http://localhost:5000/getregisteredcompanies", {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((res) =>
        setX(
          res.data.filter(
            (profile) => profile.compId === id && profile.studentId === sid
          )
        )
      );
  }, []);

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  const registerHandler = () => {
    console.log(iprofile.compname, iprofile._id);
    axios
      .post("http://localhost:5000/registercomp", {
        compname: iprofile.compname,
        compId: iprofile._id,
        studentname: puser.fullname,
        studentId: puser._id,
        clgId: puser.collegeId,
        salary: iprofile.salary,
      })
      .then((res) => alert(res.data));
  };

  return (
    <div className="first">
      <Header />
      {iprofile && (
        <div>
          <div>
            {/* <div className="profile bg-light card " style={{"margin":""}}> */}
            <center>
              {/* <img 
                            className="round-img"
                            src="https://assets-global.website-files.com/5d9bc5d562ffc22c37470958/5fce6ee18b204291c8598510_React%20Native%20Developer%20Hiring%20Guide.svg"
                            height="250" width="450"
                            alt="pix"
                        /> */}
              <div>
                <div
                  className="profile bg-light card "
                  style={{ margin: "10px", width: "25.5rem" }}
                >
                  {iprofile.compPic ? (
                    <div>
                      <img
                        src={iprofile.compPic}
                        style={{ border: "3px solid grey" }}
                        width="450px"
                        className="card-img-top"
                        alt="img"
                      />
                    </div>
                  ) : null}
                </div>
                <h2 style={{ color: "grey" }}>{iprofile.compname}</h2>
                {/* <p><b>Company Mail: </b>{iprofile.email}</p> */}
                <p>
                  <b>Event Description: </b>
                  {iprofile.description}
                </p>
                {/* <p><b>Eligibility: </b>{iprofile.eligibility}</p> */}
                <p>
                  <b>Organised by: </b>
                  {iprofile.email}
                </p>
                <p>
                  <b>Last Date for Registration: </b>
                  {iprofile.lastdate}
                </p>
                <p>
                  <b>Number of Rounds: </b>
                  {iprofile.rounds}
                </p>

                <div
                  className="profile bg-light card "
                  style={{ margin: "10px", width: "25.5rem" }}
                >
                  <center>
                    <br></br>
                    <br></br>
                    {x.length < 1 ? (
                      <div>
                        <h5 style={{ color: "#6DAFED" }}>Interested?</h5>
                        &nbsp;&nbsp;
                        <h5
                          className="btn btn-secondary"
                          onClick={registerHandler}
                        >
                          Register Now
                        </h5>
                      </div>
                    ) : (
                      <h5 style={{ color: "#56CEDB" }}>
                        Registered Successfully
                      </h5>
                    )}
                    <br />
                    <br />
                  </center>
                </div>
              </div>
              <br />
              <br />
            </center>
          </div>
        </div>
      )}
    </div>
  );
};

export default Indprofile;
