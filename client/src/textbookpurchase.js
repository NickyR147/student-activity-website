import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TextbookPurchase = () => {
  const [isbn, setIsbn] = useState('');
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState('');
  const [bookstore, setBookstore] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const response = await axios.get('/api/purchases'); // Replace '/api/purchases' with your endpoint to fetch purchases
      setPurchases(response.data);
    } catch (error) {
      console.error('Error fetching purchases:', error);
    }
  };

  const handlePurchase = async () => {
    try {
      const response = await axios.post('/purchase', { isbn, amount: 1 }); // Assuming amount is 1 for now
      if (response.data.location) {
        setLocation(response.data.location);
        setMessage('Textbook is available in the library');
      } else if (response.data.bookstore) {
        setBookstore(response.data.bookstore);
        setMessage('Textbook is not available in the library');
      }
    } catch (error) {
      console.error('Error purchasing textbook:', error);
    }
  };

  return (
    <div>
      <h2>Textbook Purchase</h2>
      <div>
        <label>Enter ISBN:</label>
        <input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
        <button onClick={handlePurchase}>Purchase</button>
      </div>
      <div>
        <p>{message}</p>
        {location && <p>Location in library: {location}</p>}
        {bookstore && <p>Available at: {bookstore}</p>}
      </div>
      <div>
        <h3>Previous Purchases:</h3>
        <ul>
          {purchases.map((purchase, index) => (
            <li key={index}>{purchase.title} by {purchase.author}</li>
          ))}
        </ul>
      </div>
      <div>
        <label>Enter Credit Card Number:</label>
        <input type="text" value={creditCard} onChange={(e) => setCreditCard(e.target.value)} />
      </div>
    </div>
  );
};

export default TextbookPurchase;
