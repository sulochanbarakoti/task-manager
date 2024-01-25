import axios from "axios";
import React, { useState } from "react";

const TaskForm = () => {
  // State to manage the task input
  const [task, setTask] = useState("");

  //handle the changes in Input
  const handleInputChange = (text) => {
    setTask(text.target.value);
  };

  //handle the submit form
  const handleSubmit = async () => {
    try {
      // Make a POST request to the backend API to add a new task
      const addTask = await axios.post("http://localhost:5000/api/v1/tasks", {
        name: task,
      });
      console.log(JSON.stringify(addTask));
    } catch (error) {
      console.error("error to set new task", error);
    }
  };
  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter task...."
          value={task}
          onChange={handleInputChange}
          style={styles.input}
        />
        <button type="submit" style={styles.addButton}>
          Add
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  form: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    padding: "10px",
    marginRight: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    flex: 1,
  },
  addButton: {
    backgroundColor: "#3498db",
    color: "#fff",
    padding: "10px 15px",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
  },
};

export default TaskForm;
