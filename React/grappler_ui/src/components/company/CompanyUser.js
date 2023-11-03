import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CompanyUser() {
  const navigate = useNavigate();
  const { companies } = useSelector((state) => state.companylist);
  console.log("Inside User Company ", companies);

  const queryParams = new URLSearchParams(window.location.search);
  const companyId = queryParams.get("id");
  const companyName = queryParams.get("companyName");
  console.log("company is ", companyId);
  console.log("company name ", companyName);
  const company = companies.find((x) => x.id == companyId);
  console.log(company);
  const users = company?.userRole || [];
  console.log(users);
  return (
    <div>
      <div key={users.id}>
        <h3 className="mt-4 mb-3 text-danger"> {companyName}</h3>

        <h3 className="mt-4 mb-3 text-primary">User Details</h3>
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th className="bg-primary">Name </th>
              <th className="bg-success">Role </th>
              <th className="bg-warning">Email </th>

              <th className="bg-secondary">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.user.name}</td>
                <td>{user.role}</td>
                <td>{user.user.email}</td>
                {/* <td >
               <button onClick={() => handleCarDelete(car.carNo)} className="btn btn-danger" >
                    Delete
                  </button>
                </td>    */}
              </tr>
            ))}
          </tbody>
        </table>
        <center>
          <button onClick={() => navigate(-1)} className="btn btn-primary">
            Go Back{" "}
          </button>
        </center>
      </div>
    </div>
  );
}

export default CompanyUser;
