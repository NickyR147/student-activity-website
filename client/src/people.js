import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import { Card, CardContent, Typography, TextField, Button, Grid } from '@mui/material';

const Search = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    department: '',
    firstName: '',
    lastName: ''
  });
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (e) => {
    setSearchCriteria({
      ...searchCriteria,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:5000/search', {
        params: searchCriteria
      });
      setSearchResults(response.data);
      setShowResults(true);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  return (
    <div className='First'>
      <Header />
      <Grid container justifyContent="center" style={{ marginTop: '2rem' }}>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom align="center">
                Search Users
              </Typography>
              <form>
                <TextField
                  fullWidth
                  label="Department"
                  name="department"
                  value={searchCriteria.department}
                  onChange={handleInputChange}
                  style={{ marginBottom: '1rem' }}
                />
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={searchCriteria.firstName}
                  onChange={handleInputChange}
                  style={{ marginBottom: '1rem' }}
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={searchCriteria.lastName}
                  onChange={handleInputChange}
                  style={{ marginBottom: '1rem' }}
                />
                <Button variant="contained" onClick={handleSearch} fullWidth>
                  Search
                </Button>
              </form>
              {showResults && (
                <div style={{ marginTop: '1rem' }}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Search Results:
                      </Typography>
                      {searchResults.length === 0 ? (
                        <Typography variant="body1">No results found.</Typography>
                      ) : (
                        searchResults.map((user) => (
                          <div key={user._id} style={{ marginBottom: '1rem' }}>
                            <Typography variant="body1">
                              Name: {user.firstName} {user.lastName}
                            </Typography>
                            <Typography variant="body1">Department: {user.department}</Typography>
                            <Typography variant="body1">Phone Number: {user.phoneNumber}</Typography>
                            <Typography variant="body1">Email: {user.email}</Typography>
                          </div>
                        ))
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Search;
