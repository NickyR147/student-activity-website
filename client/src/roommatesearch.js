import React, { useState, useEffect } from "react";
import { Link, Navigate, NavLink } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import "./bg.css";

const RoommateSearch = () => {
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

      <section className="container">
        <center>
          <h1 className="large" style={{ color: "#30332E", marginTop: "20px" }}>
            Roommate Search
          </h1>
        </center>

        <nav className="navbar navbar-light">
          <div className="container-fluid">
            <h3 className="navbar-brand">
              Search for Rooms and Roommates
              <span style={{ color: "blue" }}> </span>
            </h3>
          </div>
        </nav>

        <div className="filters">
          <label>
            Move-in Date:
            <input
              type="date"
              name="moveInDate"
              value={filterCriteria.moveInDate}
              onChange={handleFilterChange}
            />
          </label>
          <label>
            Gender:
            <select
              style={{ width: "41%" }}
              onChange={handleFilterChange}
              value={filterCriteria.gender}
              name="gender"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label>
            Price Range:
            <input
              type="text"
              name="priceRange"
              value={filterCriteria.priceRange}
              onChange={handleFilterChange}
            />
          </label>
          <button onClick={searchHandler}>Apply Filters</button>
        </div>

        <div className="Roommates">
          <div className="row">
            {data.length >= 1
              ? data.map((rooms) => (
                  <div className="col-md-4">
                    <div
                      className="Roommates bg-light card"
                      style={{ margin: "10px", width: "25.5rem" }}
                    >
                      <center>
                        <br />
                        <div>
                          <h2 style={{ color: "#6DAFED" }}>
                            Posted by: {rooms.name}
                          </h2>
                          <br />
                          <h6>Contact: {rooms.contact}</h6>
                          <br />
                          <h6>Gender: {rooms.gender}</h6>
                          <br />
                          <h6>Move in Date: {rooms.moveInDate}</h6>
                          <br />
                          <h6>Price: {rooms.priceRange}</h6>
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
              to="/roommatepost"
              className="nav-link"
              style={{ color: "#00CCCC" }}
            >
              Click here if you want to post an about your room.
            </NavLink>
          </li>
        </center>
        <br />
        <br />
        <br />
        <br />
      </section>

      {tokenn === "undefined" && <Navigate to="/login" />}
    </div>
  );
};

export default RoommateSearch;
