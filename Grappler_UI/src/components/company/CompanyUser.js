import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUser,updateUserRole } from "../../slices/companySlice";
import { getAllUsersByCompanyId, updateUserRoleApi } from "../../api/api";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

function CompanyUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { usersWithRole } = useSelector((state) => state.companylist);
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [userId, setUserId] = useState(-1);
  const queryParams = new URLSearchParams(window.location.search);
  const companyId = queryParams.get("id");

  const fetchData = async () => {
    try {
      const response = await getAllUsersByCompanyId(companyId);
      dispatch(fetchUser(response.data));
    } catch (error) {
      // console.error("Error Message ", error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
    return () => {
      dispatch(fetchUser([])); // Cleanup function when the component unmounts
    };
  }, [dispatch,companyId]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  function handleRoleSelect(event) {
    setSelectedRole(event.target.value);
  }

 function handleUpdate(companyId, userId) {
    setSelectedRole(""); // Clear any previous selection
    setUserId(userId);
    console.log("userId and comapanyID",userId,companyId);
    openModal();
  }
async function handleUpdateUserRole()
{
  console.log("Inside handleUpdateUserRole userId and comapanyID",userId,companyId);
  try{
    const response = updateUserRoleApi(companyId,userId,selectedRole);
    console.log(response);
    fetchData();
  }
  catch(error)
  {
    alert(error.response.message);
  }
  closeModal();
}
 
  return (
    <div>
      <h3 className="mt-4 mb-3 text-danger"></h3>
      <h3 className="mt-4 mb-3 text-primary">User Details</h3>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th className="bg-primary">Name</th>
            <th className="bg-success">Role</th>
            <th className="bg-warning">Email</th>
            <th className="bg-warning">Update Role</th>
          </tr>
        </thead>
        <tbody>
          {usersWithRole.map((item, index) => (
            <tr key={index}>
              <td>{item.user.name}</td>
              <td>{item.role}</td>
              <td>{item.user.email}</td>
              <td>
                <button
                  onClick={() => handleUpdate(companyId, item.user.id)}
                  className="btn btn-secondary"
                >
                  {" "}
                  Update Role{" "}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <center>
        <button onClick={() => navigate(-1)} className="btn btn-primary">
          Go Back
        </button>
      </center>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update User Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Role:</Form.Label>
              <Form.Control
                as="select"
                value={selectedRole}
                onChange={handleRoleSelect}
                required
              >
                <option value="SUPERADMIN">SUPERADMIN</option>
                <option value="EMPLOYEE">EMPLOYEE</option>
                <option value="ADMIN">ADMIN</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleUpdateUserRole}
            disabled={!selectedRole} // Disable the button when selectedRole is empty
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CompanyUser;
