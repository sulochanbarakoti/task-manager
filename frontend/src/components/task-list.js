import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const navigate = useNavigate();
  const [taskList, setTaskList] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);

  // Fetch tasks on component mount and whenever refreshFlag change
  useEffect(() => {
    const getTasks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/tasks");
        setTaskList(res.data.tasks);
      } catch (error) {
        console.error("error fatching tasks", error);
      }
    };
    getTasks();
  }, [refreshFlag]);

  // Delete a task
  const handleDelete = async (task) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/v1/tasks/${task._id}`
      );
      console.log(res);
      // Refresh the task list after deletion
      setRefreshFlag(!refreshFlag);
    } catch (error) {
      console.error("Error deleting data", error);
    }
  };

  // Edit a task and navigate to the edit page
  const handleEdit = async (task) => {
    console.log("clicked");
    navigate(`/task-list`, { state: task });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.h2}>Tasks</h2>
      <ul style={styles.ul}>
        {taskList.map((task) => (
          <li style={styles.li} key={task._id}>
            {task.completed ? (
              <text style={styles.textTrue}>{task.name}</text>
            ) : (
              <text style={styles.textFalse}>{task.name}</text>
            )}

            <button style={styles.buttonEdit} onClick={() => handleEdit(task)}>
              Edit
            </button>
            <button
              style={styles.buttonDelete}
              onClick={() => handleDelete(task)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    width: "auto",
    margin: "20px",
  },
  h2: {
    textAlign: "center",
  },
  ul: {
    listStyleType: "none",
    paddingLeft: "40%",
  },
  li: {
    width: "300px",
    marginBottom: "10px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
  },
  textTrue: {
    width: "160px",
    textDecoration: "line-through",
  },
  textFalse: {
    width: "160px",
  },
  taskContent: {
    flex: 1, // Takes remaining space
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  buttonEdit: {
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    marginLeft: "10px",
  },
  buttonDelete: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default TaskList;
