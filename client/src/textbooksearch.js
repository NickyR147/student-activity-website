import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, Button, TextField, Grid } from "@material-ui/core";
import Header from "./Header";
import "./bg.css";

const TextbookSearch = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [tokenn, setTokenn] = useState(localStorage.getItem("token"));

  useEffect(() => {
    axios
      .get("http://localhost:5000/getbooks")
      .then((res) =>
        !search
          ? setData(res.data)
          : setData(
              res.data.filter(
                (books) =>
                  books.title.toLowerCase().includes(search.toLowerCase()) ||
                  books.author.toLowerCase().includes(search.toLowerCase()) ||
                  books.isbn.toLowerCase().includes(search.toLowerCase())
              )
            )
      );
  }, [search]);

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleBookstoreClick = () => {
    window.location.href = "http://localhost:5173";
  };

  return (
    <div className="first">
      <Header />

      <section className="container">
        <center>
          <h1 className="large" style={{ color: "#30332E", marginTop: "20px" }}>
            Textbook Search
          </h1>
        </center>

        <nav className="navbar navbar-light">
          <div className="container-fluid d-flex justify-content-between">
            <h3 className="navbar-brand">Search for Textbooks</h3>
            <TextField
              variant="outlined"
              placeholder="Search by title, author, or ISBN"
              value={search}
              onChange={handleSearchChange}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleBookstoreClick}
            >
              Visit Online Bookstore
            </Button>
          </div>
        </nav>

        <div className="Textbooks">
          <Grid container spacing={3}>
            {data.map((books) => (
              <Grid item xs={12} sm={6} md={4} key={books._id}>
                <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <CardContent style={{ flexGrow: 1 }}>
                    <center>
                      <div>
                        <h2 style={{ color: "#6DAFED" }}>Title: {books.title}</h2>
                        <br />
                        <h6>Author: {books.author}</h6>
                        <br />
                        <h6>ISBN: {books.isbn}</h6>
                        <br />
                        <h6>Location: {books.location || books.bookstore}</h6>
                        <br />
                      </div>
                    </center>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
        <br />
        <br />
        <br />
        <br />
      </section>

      {tokenn === "undefined" && <Navigate to="/login" />}
    </div>
  );
};

export default TextbookSearch;
