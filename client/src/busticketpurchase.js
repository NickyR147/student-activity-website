import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; // For navigation after purchase

const TicketPurchase = () => {
  const [zones, setZones] = useState([]); // Array of selected zones
  const [paymentType, setPaymentType] = useState(""); // 'Credit Card' or 'Bus Card'
  const [totalPrice, setTotalPrice] = useState(0);
  const history = useHistory();

  // Fetch zone data (assuming you have an API endpoint for this)
  useEffect(() => {
    const fetchZones = async () => {
      try {
        const response = await fetch("/api/zones"); // Replace with your API endpoint
        const zoneData = await response.json();
        setZones(zoneData);
      } catch (error) {
        console.error("Error fetching zones:", error);
      }
    };

    fetchZones();
  }, []);

  const handleZoneChange = (event, zone) => {
    const newZones = [...zones];
    const zoneIndex = newZones.findIndex((z) => z.id === zone.id); // Replace 'id' with actual zone identifier

    if (event.target.checked) {
      newZones.push({ ...zone, quantity: 1 }); // Add zone with initial quantity 1
    } else {
      newZones.splice(zoneIndex, 1); // Remove zone from selection
    }

    setZones(newZones);
    calculateTotalPrice();
  };

  const handleQuantityChange = (event, zone) => {
    const newZones = [...zones];
    const zoneIndex = newZones.findIndex((z) => z.id === zone.id); // Replace 'id' with actual zone identifier
    newZones[zoneIndex].quantity = parseInt(event.target.value);

    setZones(newZones);
    calculateTotalPrice();
  };

  const calculateTotalPrice = () => {
    let total = 0;
    zones.forEach((zone) => {
      switch (zone.zone) {
        case "Zone 1":
          total += 2 * zone.quantity;
          break;
        case "Zone 2":
          total += 4 * zone.quantity;
          break;
        case "Zone 3":
          total += 6 * zone.quantity;
          break;
        default:
          break;
      }
    });
    setTotalPrice(total);
  };

  const handlePaymentChange = (event) => {
    setPaymentType(event.target.value);
  };

  const handleSubmitPurchase = async (event) => {
    event.preventDefault();
    if (!zones.length || !paymentType) {
      alert("Please select zones and a payment method");
      return;
    }

    const purchaseData = {
      /* Get user ID from your authentication system */ userId: zones,
      paymentType,
    };

    try {
      const response = await fetch("/api/tickets/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(purchaseData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.clientSecret) {
          // For credit card payments, handle Stripe checkout flow
          // Use Stripe.js to handle payment using the clientSecret
          // Upon successful payment, navigate to a confirmation page
          alert("Stripe checkout not implemented yet!");
        } else {
          alert("Ticket purchased successfully using bus card!");
          history.push("/tickets"); // Navigate to tickets page or similar
        }
      } else {
        alert("Error processing purchase");
      }
    } catch (error) {
      console.error(error);
      alert("Error processing purchase");
    }
  };

  return (
    <div>
      <h2>Purchase Bus Tickets</h2>
      <form onSubmit={handleSubmitPurchase}>
        {/* UI elements for selecting zones and quantities */}
        {zones.map((zone) => (
          <div key={zone.id}>
            <label>
              <input
                type="checkbox"
                checked={zones.some((z) => z.id === zone.id)}
                onChange={(event) => handleZoneChange(event, zone)}
              />
              {zone.zone} - ${zone.price}
            </label>
            <input
              type="number"
              value={zone.quantity || 0}
              min="0"
              onChange={(event) => handleQuantityChange(event, zone)}
            />
          </div>
        ))}
        <label>
          Payment Type:
          <select value={paymentType} onChange={handlePaymentChange}>
            <option value="">Select...</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Bus Card">Bus Card</option>
          </select>
        </label>
        <br />
        <span>Total Price: ${totalPrice}</span>
        <br />
        <button type="submit">Purchase Tickets</button>
      </form>
    </div>
  );
};

export default TicketPurchase;
