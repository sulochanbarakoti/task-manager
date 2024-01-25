import React, { useEffect, useState } from "react";
import "./EditComponent.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TaskEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [editedData, setEditedData] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  // Initialize the state with the data received from the location
  useEffect(() => {
    setEditedData(location.state);
    setIsChecked(editedData.completed);
  }, []);

  // Handle input change for task name
  const handleInputChange = (e) => {
    const { value } = e.target;
    editedData.name = value;
    console.log(value);
  };

  // Handle checkbox change for task completion
  const handleCheckBox = (e) => {
    const { value } = e.target;
    if (value) {
      const checked = editedData.completed;
      editedData.completed = !checked;
      console.log(editedData);
    }
  };

  // Handle save button click
  const handleSave = async () => {
    // setEditedData(receivedData);
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/v1/tasks/${editedData._id}`,
        editedData
      );
      console.log(res);
      navigate(`/`);
    } catch (error) {
      console.error("Error deleting data", error);
    }
  };
  return (
    <div className="edit-container">
      <h2>Edit Component</h2>
      <label>
        <text className="text">ID:</text>
        <input type="text" value={editedData._id} name="id" readOnly />
      </label>
      <br />
      <label>
        <text className="text">Task:</text>
        <input
          type="text"
          name="name"
          placeholder={editedData.name}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        <text className="text">checkbox</text>
        <input
          type="checkbox"
          name="isChecked"
          checked={isChecked}
          onChange={handleCheckBox}
        />
      </label>
      <br />
      <button className="save-button" onClick={handleSave}>
        Save
      </button>
      <button className="cancel-button">Cancel</button>
    </div>
  );
};

export default TaskEdit;
