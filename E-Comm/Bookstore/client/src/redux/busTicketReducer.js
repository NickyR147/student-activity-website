import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tickets: [],
};

export const busTicketReducer = createSlice({
  name: "busTickets",
  initialState,
  reducers: {
    addBusTicket: (state, action) => {
      if (!state.tickets.includes(action.payload)) {
        state.tickets.push(action.payload);
      }
    },
    removeBusTicket: (state, action) => {
      state.tickets = state.tickets.filter((ticket) => ticket !== action.payload);
    },
    resetBusTickets: (state) => {
      state.tickets = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addBusTicket, removeBusTicket, resetBusTickets } = busTicketReducer;

export default busTicketReducer;
