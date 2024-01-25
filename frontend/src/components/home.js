import TaskForm from "./task-form";
import TaskList from "./task-list";

const Home = () => {
  return (
    <div>
      <h2 style={styles.container}>Task manager</h2>
      <TaskForm></TaskForm>
      <TaskList></TaskList>
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
};

export default Home;
