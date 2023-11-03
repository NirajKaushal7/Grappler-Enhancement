import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./../../css/tasknavbar.css";
import moment from "moment";
import { Link } from "react-router-dom";
import { getTickets } from "../../slices/taskSlice";
import { Drawer, Table, Button } from "antd";

const UsersTask = () => {
  const tasks = useSelector((state) => state.tasks.tickets);
  const [filter, setFilter] = useState("All");
  const [selectedTask, setSelectedTask] = useState(null);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShow(true);
  };

  const filteredTasks = tasks?.filter((task) => {
    if (filter === "All") {
      return true;
    } else {
      return task.stage === filter;
    }
  });

  const columns = [
    {
      title: "Task Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ticket ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Created At",
      dataIndex: "startDate",
      key: "startDate",
      render: (startDate) =>
        startDate ? moment(startDate).format("MMM D,YYYY") : "N/A",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (endDate) =>
        endDate ? moment(endDate).format("MMM D,YYYY") : "N/A",
    },
    {
      title: "Project",
      dataIndex: ["projectIn", "name"],
      key: "projectIn",
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Status",
      dataIndex: "stage",
      key: "stage",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      render: (endTime) =>
        endTime ? moment(endTime).format("HH:mm A") : "N/A",
    },
  ];

  return (
        <div style={{ width: "80%", marginLeft: "20%" }}> 
      <div className="container">
        <h1>Users Task List</h1>
        {/* <div className="task-navbar">
          <div className="task-navbar-left">
            <Button onClick={() => setFilter("All")} className="button">
              All
            </Button>
            <Button onClick={() => setFilter("To Do")} className="button">
              To Do
            </Button>
            <Button onClick={() => setFilter("In Progress")} className="button">
              Progress
            </Button>
            <Button onClick={() => setFilter("On Hold")} className="button">
              On Hold
            </Button>
            <Button onClick={() => setFilter("Done")} className="button">
              Done
            </Button>
          </div>
          <div className="task-navbar-right">
            <Link to="/custom-ticket">
              <Button className="button">Customize</Button>
            </Link>
          </div>
        </div> */}
        <Table 
          columns={columns.map((column) => ({
            ...column,
            title: <span className={"table-header"}>{column.title}</span>,
          }))}
          dataSource={filteredTasks}
          onRow={(record) => ({
            onClick: () => handleTaskClick(record),
          })}
          rowKey="id"
        />
      </div>
      </div>
    // </>
  );
};

export default UsersTask;
