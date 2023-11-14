import React from "react";
import { useLocation } from "react-router-dom";

function Task() {
  console.log("Inside task ");
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  console.log("id in task ", id);

  
  return (
    <div style={{ width: "70%", marginLeft: "30%" }}>
      <h1>................Task....................... </h1>
    </div>
  );
}

export default Task;
