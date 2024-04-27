import React, { useState, useEffect } from "react";
import { Link, Navigate, NavLink } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import { Button, Grid, Typography, makeStyles } from "@material-ui/core";
import "./bgstatic.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "-70px",
    height: "100vh",
    backgroundImage: 'url("/bg.jpg")',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    color: "#30332E",
  },
  headerText: {
    fontSize: "50px",
    marginTop: "20px",
  },
  activitySection: {
    marginTop: "20px",
    marginBottom: "50px",
  },
  activityItem: {
    marginBottom: "20px",
  },
  button: {
    color: "#000000",
    textDecoration: "none",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
  },
}));

const LandingPage = () => {
  const classes = useStyles();
  const [tokenn, setTokenn] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setTokenn("undefined");
    }
  }, []);

  return (
    <div className={classes.root}>
      <Header />

      <section className="container">
        <center>
          <Typography variant="h1" className={classes.headerText}>
            Welcome to Venture Hub
          </Typography>
          <Typography variant="h3" style={{ color: "#30332E" }}>
            A student activity website made by students for students.
          </Typography>
          <Grid container spacing={3} className={classes.activitySection}>
            <Grid item xs={12} sm={6} md={4} className={classes.activityItem}>
              <img
                src="https://www.svgrepo.com/show/5433/house.svg"
                className={classes.image}
                alt="Roommate search"
              />
              <Typography variant="body1">To browse for roommates</Typography>
              <Button component={NavLink} to="/roommatesearch" className={classes.button}>
                Click here!
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4} className={classes.activityItem}>
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/events-4352689-3611150.png?f=webp"
                className={classes.image}
                alt="Event search"
              />
              <Typography variant="body1">To browse events</Typography>
              <Button component={NavLink} to="/eventsearch" className={classes.button}>
                Click here!
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4} className={classes.activityItem}>
              <img
                src="https://www.svgrepo.com/show/94674/books-stack-of-three.svg"
                className={classes.image}
                alt="Textbook search"
              />
              <Typography variant="body1">Search or buy textbooks</Typography>
              <Button component={NavLink} to="/textbooksearch" className={classes.button}>
                Click here!
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4} className={classes.activityItem}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Bus.svg/2560px-Bus.svg.png"
                className={classes.image}
                alt="Bus Ticket Purchase"
              />
              <Typography variant="body1">Buy bus tickets</Typography>
              <Button component={NavLink} to="localhost:8888" className={classes.button}>
                Click here!
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4} className={classes.activityItem}>
              <img
                src="https://b.kisscc0.com/20180818/cie/kisscc0-meal-food-computer-icons-healthy-diet-plate-meal-plate-5b77a2727ae6b4.4534947215345670265034.png"
                className={classes.image}
                alt="Meal plan purchase"
              />
              <Typography variant="body1">Purchase meal plan</Typography>
              <Button component={NavLink} to="localhost:7777" className={classes.button}>
                Click here!
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4} className={classes.activityItem}>
              <img
                src="https://www.svgrepo.com/show/221188/elections-poll.svg"
                className={classes.image}
                alt="Election Poll"
              />
              <Typography variant="body1">Elections poll now!</Typography>
              <Button component={NavLink} to="/voting" className={classes.button}>
                Click here!
              </Button>
            </Grid>
          </Grid>
        </center>
      </section>

      {tokenn === "undefined" && <Navigate to="/login" />}
    </div>
  );
};

export default LandingPage;
