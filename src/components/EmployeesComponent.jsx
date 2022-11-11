import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import "../assets/styles/EmployeesComponent.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

export default function EmployeesComponent() {
  // fetching data
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [status, setStatus] = useState();

  //   Fetch data
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/getAllemployees")
      .then((res) => {
        console.log("getting data", res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  // Post request
  const [name, setName] = useState("");

  const AddEmployee = () => {
    console.warn(name);
    const formData = new FormData();
    formData.append("name", name);

    axios
      .post("http://localhost:8080/api/addEmployee", formData, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("Employee Added");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // Delete request
  const removeUser = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/api/deleteEmployee/${id}`
      );
      alert("Employee successfully deleted.");
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="EmployeesComponent">
      <br /> <br />
      <button className="btn-submit" onClick={handleShow}>
        Add Employee
      </button>
      <br /> <br />
      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table class="styled-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Employee ID</th>
              <th>Employee Name</th>

              <th>Action</th>
            </tr>
          </thead>
          {data.length == 0 ? (
            <p style={{ color: "red" }}>No employees, </p>
          ) : (
            <tbody>
              {data.map((data) => (
                <tr>
                  <td>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="gridCheck"
                      />
                    </div>
                  </td>
                  <td>{data.id}</td>
                  <td>{data.name}</td>

                  <td>
                    <a
                      className="downloadbtn"
                      href={`http://localhost:8080/updateEmployee/${data.id}`}
                    >
                      <FiEdit />
                    </a>
                    |
                    <a
                      className="downloadbtn"
                      onClick={() => removeUser(data.id)}
                      href={`#`}
                    >
                      <AiOutlineDelete />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      {/* end of table */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ height: "5px" }} />
          <div className="col-md-12">
            <div className="form-group">
              <label>
                Employee Full Name: <span className="asterisc">*</span>
              </label>
              <form>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  required
                />
              </form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={AddEmployee} type="submit" className="btn-submit">
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
