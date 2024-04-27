import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, makeStyles, Card, CardContent } from '@material-ui/core';
import Header from './Header';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh', // Ensure the form is centered vertically on the page
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  button: {
    margin: theme.spacing(1),
  },
  card: {
    margin: theme.spacing(2),
    width: 300,
    textAlign: 'center',
  },
}));

const VoteForm = () => {
  const classes = useStyles();
  const [candidate, setCandidate] = useState('');
  const [votes, setVotes] = useState({
    John: 0,
    Mary: 0,
    Susan: 0,
  });
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    // Check if the user has already voted (you can implement your own logic here)
    const hasVoted = localStorage.getItem('hasVoted');
    if (hasVoted) {
      setHasVoted(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ candidate }),
      });
      const data = await response.json();
      console.log(data);
      alert('Your vote has been registered successfully!');
      setVotes((prevVotes) => ({
        ...prevVotes,
        [candidate]: prevVotes[candidate] + 1,
      }));
      // Set local storage to indicate that the user has voted
      localStorage.setItem('hasVoted', true);
      setHasVoted(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="first">
      <Header />
      <div className={classes.formContainer}>
        <h2>Voting</h2>
        {hasVoted ? (
          <p>You have already voted. Thank you!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <FormControl className={classes.formControl}>
              <InputLabel>Vote for</InputLabel>
              <Select value={candidate} onChange={(e) => setCandidate(e.target.value)}>
                <MenuItem value="">
                  <em>Select candidate</em>
                </MenuItem>
                <MenuItem value="John">John</MenuItem>
                <MenuItem value="Mary">Mary</MenuItem>
                <MenuItem value="Susan">Susan</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" className={classes.button}>
              Submit
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default VoteForm;
