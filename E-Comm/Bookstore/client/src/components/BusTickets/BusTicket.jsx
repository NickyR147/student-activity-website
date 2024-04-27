import React, { useState } from "react";
// import "./BusTickets.scss";
import { useDispatch, useSelector } from "react-redux";
import { addBusTicket, removeBusTicket } from "../../redux/busTicketReducer";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

const BusTickets = () => {
  const [selectedZones, setSelectedZones] = useState([]);
  const dispatch = useDispatch();
  const busTickets = useSelector((state) => state.busTickets.tickets);

  const handleZoneSelect = (zone) => {
    if (selectedZones.includes(zone)) {
      setSelectedZones(selectedZones.filter((item) => item !== zone));
      dispatch(removeBusTicket(zone));
    } else {
      setSelectedZones([...selectedZones, zone]);
      dispatch(addBusTicket(zone));
    }
  };

  const calculateTotalPrice = () => {
    let total = 0;
    selectedZones.forEach((zone) => {
      if (zone === 1) total += 2;
      else if (zone === 2) total += 4;
      else if (zone === 3) total += 6;
    });
    return total.toFixed(2);
  };

  return (
    <div className="bus-tickets">
      <h1 style={{ textAlign: "center" }}>Bus Tickets</h1>
      <TableContainer component={Paper} elevation={0}>
        <Table
          sx={{
            minWidth: 350,
            borderBottom: "1px solid #e0e0e0",
            marginBottom: 5,
          }}
          aria-label="simple table"
        >
          <TableBody>
            <TableRow>
              <TableCell align="center">
                <input
                  type="checkbox"
                  checked={selectedZones.includes(1)}
                  onChange={() => handleZoneSelect(1)}
                />
                Zone 1 ($2)
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">
                <input
                  type="checkbox"
                  checked={selectedZones.includes(2)}
                  onChange={() => handleZoneSelect(2)}
                />
                Zone 2 ($4)
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">
                <input
                  type="checkbox"
                  checked={selectedZones.includes(3)}
                  onChange={() => handleZoneSelect(3)}
                />
                Zone 3 ($6)
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div className="total">
        <span>TOTAL</span>
        <span>${calculateTotalPrice()}</span>
      </div>
    </div>
  );
};

export default BusTickets;
