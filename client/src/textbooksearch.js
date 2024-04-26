import React, { useState, useEffect } from "react";
import { Link, Navigate, NavLink } from "react-router-dom";
import axios from "axios";
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
                  books.title.includes(search.toUpperCase()) ||
                  books.author
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  books.isbn.toLowerCase().includes(search.toLowerCase())
              )
            )
      );
  }, [search]);

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }
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
          <div className="container-fluid">
            <h3 className="navbar-brand">
              Search for Textbooks
              <span style={{ color: "blue" }}> </span>
            </h3>
          </div>
        </nav>

        <div className="Textbooks">
          <div className="row">
            {data.length >= 1
              ? data.map((books) => (
                  <div className="col-md-4">
                    <div
                      className="Textbooks bg-light card"
                      style={{ margin: "10px", width: "25.5rem" }}
                    >
                      <center>
                        <br />
                        <div>
                          <h2 style={{ color: "#6DAFED" }}>
                            Title: {books.title}
                          </h2>
                          <br />
                          <h6>Author: {books.author}</h6>
                          <br />
                          <h6>ISBN: {books.isbn}</h6>
                          <br />
                          <h6>Location: {books.location || books.bookstore}</h6>
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
      </section>

      {tokenn === "undefined" && <Navigate to="/login" />}
    </div>
  );
};

export default TextbookSearch;
