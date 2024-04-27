import React, { useState, useEffect } from "react";
import { Navigate, NavLink } from "react-router-dom";
import Header from "./Header";
import { Button, Card, CardContent, CardMedia, Typography, Grid } from "@material-ui/core";

const LandinPage = () => {
  const [tokenn, setTokenn] = useState(localStorage.getItem("token"));

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="first">
      <Header />

      <section className="container">
        <center>
          <h1 className="large" style={{ color: "#30332E", marginTop: "20px" }}>
            Welcome to Venture Hub
          </h1>
          <h3>A student activity website made by students for students.</h3>
          <br/>
          <br/>
          <Grid container spacing={3} justify="center">
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardContent>
                  <CardMedia
                    component="img"
                    alt="roommate-search"
                    height="250"
                    image="https://www.svgrepo.com/show/5433/house.svg"
                    title="Roommate Search"
                  />
                  <Typography variant="body1" color="textPrimary">To browse for roommates</Typography>
                  <Button component={NavLink} to="/roommatesearch" style={{ backgroundColor: "#000000", color: "#FFFFFF" }}>
                    Click here!
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardContent>
                  <CardMedia
                    component="img"
                    alt="events"
                    height="250"
                    image="https://cdni.iconscout.com/illustration/premium/thumb/events-4352689-3611150.png?f=webp"
                    title="Events"
                  />
                  <Typography variant="body1" color="textPrimary">To browse events</Typography>
                  <Button component={NavLink} to="/eventsearch" style={{ backgroundColor: "#000000", color: "#FFFFFF" }}>
                    Click here!
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardContent>
                  <CardMedia
                    component="img"
                    alt="textbooks"
                    height="250"
                    image="https://www.svgrepo.com/show/94674/books-stack-of-three.svg"
                    title="Textbooks"
                  />
                  <Typography variant="body1" color="textPrimary">Search or buy textbooks</Typography>
                  <Button component={NavLink} to="/textbooksearch" style={{ backgroundColor: "#000000", color: "#FFFFFF" }}>
                    Click here!
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardContent>
                  <CardMedia
                    component="img"
                    alt="bus-tickets"
                    height="250"
                    image="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Bus.svg/2560px-Bus.svg.png"
                    title="Bus Tickets"
                  />
                  <Typography variant="body1" color="textPrimary">Buy bus tickets</Typography>
                  <Button component={NavLink} to="localhost:8888" style={{ backgroundColor: "#000000", color: "#FFFFFF" }}>
                    Click here!
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardContent>
                  <CardMedia
                    component="img"
                    alt="meal-plan"
                    height="250"
                    image="https://b.kisscc0.com/20180818/cie/kisscc0-meal-food-computer-icons-healthy-diet-plate-meal-plate-5b77a2727ae6b4.4534947215345670265034.png"
                    title="Meal Plan"
                  />
                  <Typography variant="body1" color="textPrimary">Buy a meal plan</Typography>
                  <Button component={NavLink} to="localhost:7777" style={{ backgroundColor: "#000000", color: "#FFFFFF" }}>
                    Click here!
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardContent>
                  <CardMedia
                    component="img"
                    alt="elections"
                    height="250"
                    image="https://www.svgrepo.com/show/221188/elections-poll.svg"
                    title="Elections"
                  />
                  <Typography variant="body1" color="textPrimary">Elections! Vote Now!</Typography>
                  <Button component={NavLink} to="/voting" style={{ backgroundColor: "#000000", color: "#FFFFFF" }}>
                    Click here!
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <br/>
          <br/>
        </center>
      </section>

      {tokenn === "undefined" && <Navigate to="/login" />}
    </div>
  );
};

export default LandinPage;
