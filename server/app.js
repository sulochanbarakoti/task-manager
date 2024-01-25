const express = require("express");
const app = express();
const cors = require("cors");
const connectDb = require("./db/connect");
const tasks = require("./routes/tasks");
require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.static("./public"));

//route
app.use("/api/v1/tasks", tasks);

const start = async () => {
  try {
    await connectDb(process.env.MANGO_URI);
    //server On
    app.listen(5000, () => {
      console.log("Server started at port 5000");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
