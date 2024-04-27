import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, TextField, Button, Container, Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ForgotPassword = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/sendLoginCredentials", { email })
      .then((res) => {
        if (res.data.message === "User not found") {
          alert("User not found. Please check your email and try again.");
        } else if (res.data.message === "Login credentials sent to your email") {
          alert("Login credentials sent to your email");
        } else {
          alert("Error sending login credentials. Please try again later.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error sending login credentials. Please try again later.");
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          Enter your email to receive login credentials
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
        <Link href="/login" variant="body2">
          Return to Login
        </Link>
      </div>
    </Container>
  );
};

export default ForgotPassword;
