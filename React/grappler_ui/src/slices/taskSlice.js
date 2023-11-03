import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tickets: [
    {
      name: "Task 1",
      id: "TKT0001",
      description: "Task 1 description",
      createdAt: "2023-11-01 09:00:00",
      endDate: "2023-11-03",
      project: "Project A",
      createdBy: "John Doe",
      status: "In-Progress",
      priority: "High",
      endTime: "17:00:00",
    },
    {
      name: "Task 2",
      id: "TKT0002",
      description: "Task 2 description",
      createdAt: "2023-11-02 10:30:00",
      endDate: "2023-11-04",
      project: "Project B",
      createdBy: "Jane Smith",
      status: "Completed",
      priority: "Medium",
      endTime: "15:45:00",
    },
  ],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    addTicket: (state, action) => {
      console.log(action);
      return {
        ...state,
        tickets: [...state.tickets, action.payload],
      };
    },
    updateTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      return {
        ...state,
        tickets: state.tickets.map((ticket) =>
          ticket.id === id ? { ...ticket, ...updatedTask } : ticket
        ),
      };
    },
    getTickets: (state, action) => {
      return {
        ...state,
        tickets: action.payload,
      };
    },
    setUserList: (state, action) => {
      state.users = action.payload;
    },
    setprojectList: (state, action) => {
      state.projects = action.payload;
    },
    setReestimatedList: (state, action) => {
      state.reestimatedTicket = action.payload;
    },
    setReestimatedStatus: (state, action) => {
      const { id, status } = action.payload;
      console.log(status);
      const updatedReestimatedTicket = state.reestimatedTicket.map((ticket) => {
        if (ticket.id === id) {
          return { ...ticket, status };
        }
        return ticket;
      });
      state.reestimatedTicket = updatedReestimatedTicket;
    },
  },
});

export const {
  addTicket,
  getTickets,
  updateTask,
  setUserList,
  setprojectList,
  setReestimatedList,
  setReestimatedStatus,
} = taskSlice.actions;
export default taskSlice.reducer;
