import React, { useState, useEffect } from "react";
import { Link, Navigate, NavLink } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import { Container, Typography, TextField, Button, Card, CardContent, Grid, makeStyles } from "@material-ui/core";
import "./bg.css";

const useStyles = makeStyles((theme) => ({
  filters: {
    margin: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    margin: theme.spacing(2),
    width: 300,
  },
  button: {
    color: "#00CCCC",
    textDecoration: "none",
  },
}));

const RoommateSearch = () => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [tokenn, setTokenn] = useState(localStorage.getItem("token"));
  const [filterCriteria, setFilterCriteria] = useState({
    moveInDate: "",
    gender: "",
    priceRange: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/getrooms")
      .then((res) =>
        !search
          ? setData(res.data)
          : setData(
              res.data.filter(
                (rooms) =>
                  rooms.priceRange.includes(search.toUpperCase()) ||
                  rooms.moveInDate
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  rooms.gender.toLowerCase().includes(search.toLowerCase())
              )
            )
      );
  }, [search]);

  const searchHandler = () => {
    axios.get("http://localhost:5000/getrooms").then((res) => {
      let filteredData = res.data;
      if (filterCriteria.moveInDate)
        filteredData = filteredData.filter((rooms) =>
          rooms.moveInDate
            .toLowerCase()
            .includes(filterCriteria.moveInDate.toLowerCase())
        );
      if (filterCriteria.gender)
        filteredData = filteredData.filter((rooms) =>
          rooms.gender
            .toLowerCase()
            .includes(filterCriteria.gender.toLowerCase())
        );
      if (filterCriteria.priceRange)
        filteredData = filteredData.filter((rooms) =>
          rooms.priceRange.includes(filterCriteria.priceRange.toUpperCase())
        );
      setData(filteredData);
    });
  };

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria({ ...filterCriteria, [name]: value });
  };

  return (
    <div className="first">
      <Header />

      <Container>
        <Typography variant="h1" align="center" style={{ color: "#30332E", marginTop: "20px" }}>
          Roommate Search
        </Typography>

        <div className={classes.filters}>
          <TextField
            label="Move-in Date"
            type="date"
            name="moveInDate"
            value={filterCriteria.moveInDate}
            onChange={handleFilterChange}
          />
          <TextField
            select
            label="Gender"
            style={{ width: "150px", marginLeft: "10px" }}
            onChange={handleFilterChange}
            value={filterCriteria.gender}
            name="gender"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </TextField>
          <TextField
            label="Price Range"
            type="text"
            name="priceRange"
            value={filterCriteria.priceRange}
            onChange={handleFilterChange}
            style={{ marginLeft: "10px" }}
          />
          <Button variant="contained" color="primary" onClick={searchHandler} style={{ marginLeft: "10px" }}>
            Apply Filters
          </Button>
        </div>

        <Grid container spacing={2}>
          {data.map((rooms) => (
            <Grid item xs={12} sm={6} md={4} key={rooms.id}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h5" component="h2" style={{ color: "#6DAFED" }}>
                    Posted by: {rooms.name}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Contact: {rooms.contact}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Gender: {rooms.gender}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Move in Date: {rooms.moveInDate}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Price: {rooms.priceRange}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <center>
          <Button component={NavLink} to="/roommatepost" color="primary" className={classes.button}>
            Click here if you want to post an about your room.
          </Button>
        </center>
      </Container>

      {tokenn === "undefined" && <Navigate to="/login" />}
    </div>
  );
};

export default RoommateSearch;
