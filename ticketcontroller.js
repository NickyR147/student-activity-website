const express = require('express');
const stripe = require('stripe')('pk_test_51P9ej3K4pfrPfQYLphCQZTsx2YrLEQJHmFeviOfZ5U0APAGQoYyQ2Z6DfYGmm2dbjoVYsNmV4i25Pc0TFsjMc2gU00M1f3AmPm'); // Replace with your live key for production
const Ticket = require('../models/ticket');

const router = express.Router();

router.post('/buy', async (req, res) => {
  const { userId, zones, paymentType } = req.body;

  if (!userId || zones.length === 0 || !paymentType) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    let totalPrice = 0;
    zones.forEach(zone => {
      switch (zone.zone) {
        case 'Zone 1':
          totalPrice += 2 * zone.quantity;
          break;
        case 'Zone 2':
          totalPrice += 4 * zone.quantity;
          break;
        case 'Zone 3':
          totalPrice += 6 * zone.connection; // Typo corrected
          break;
      }
    });

    if (paymentType === 'Credit Card') {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalPrice * 100, // Convert to cents for Stripe
        currency: 'usd',
        payment_method_types: ['card'],
      });

      // Handle successful payment intent creation
      res.status(201).json({ clientSecret: paymentIntent.client_secret });
    } else if (paymentType === 'Bus Card') {
      // Check if user has sufficient bus cards (Optional)
      const user = await User.findById(userId);
      if (user.busCards < zones.length) {
        return res.status(400).json({ message: 'Insufficient bus cards' });
      }

      // Update user's bus card balance
      user.busCards -= zones.length;
      await user.save();

      // Create ticket with busCardUsed flag set to true
      const newTicket = new Ticket({
        userId,
        zones,
        totalPrice: 0, // No charge for bus cards
        purchaseDate: Date.now(),
        paymentType: 'Bus Card',
        busCardUsed: true
      });

      await newTicket.save();

      res.status(201).json({ message: 'Ticket purchased using bus card' });
    } else {
      return res.status(400).json({ message: 'Invalid payment type' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error processing purchase' });
  }
});

module.exports = router;
