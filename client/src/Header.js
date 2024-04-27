import React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navLinks: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-start',
  },
  button: {
    color: "#FFFDFB",
    textDecoration: "none",
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#010400" }}>
        <Toolbar>
          <div className={classes.navLinks}>
            <NavLink
              to="/dashboard"
              className={classes.button}
              activeClassName={classes.activeLink}
            >
              <Button color="inherit" className={classes.button}>
                Dashboard
              </Button>
            </NavLink>
            <NavLink
              to="/editprofile"
              className={classes.button}
              activeClassName={classes.activeLink}
            >
              <Button color="inherit" className={classes.button}>
                Edit Profile and Change Password
              </Button>
            </NavLink>
            <NavLink
              to="/search"
              className={classes.button}
              activeClassName={classes.activeLink}
            >
              <Button color="inherit" className={classes.button}>
                Search
              </Button>
            </NavLink>
          </div>
          <NavLink to="/login" className={classes.button} activeClassName={classes.activeLink}>
            <Button color="inherit" className={classes.button}>
              Logout
            </Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
