import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import logo from './vjitlogo.png';
import './bgstatic.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundImage: `url(${require('./bg.jpg')})`, // Add your background image here
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 100,
    width: 'auto',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={12} sm={8} md={6}>
          <Paper className={classes.paper}>
            <img src={logo} alt="logo" className={classes.logo} />
            <Typography variant="h1" component="h1" gutterBottom>
              Venture Hub
            </Typography>
            <Typography variant="body1" gutterBottom>
              A student activity website!
            </Typography>
            <div>
              <Link to="/register">
                <Button variant="contained" color="primary" className={classes.button}>
                  Sign Up
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="contained" color="secondary" className={classes.button}>
                  Sign In
                </Button>
              </Link>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
