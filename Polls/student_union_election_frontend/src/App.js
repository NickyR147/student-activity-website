// VoteForm.js (React frontend component)
import React, { useState } from 'react';

const VoteForm = () => {
  const [candidate, setCandidate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5555/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ candidate }),
      });
      const data = await response.json();
      console.log(data);
      alert('Your vote has been registered successfully!');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Vote for:
        <select value={candidate} onChange={(e) => setCandidate(e.target.value)}>
          <option value="">Select candidate</option>
          <option value="John">John</option>
          <option value="Mary">Mary</option>
          <option value="Susan">Susan</option>
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default VoteForm;
