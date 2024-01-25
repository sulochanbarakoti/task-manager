import React from "react";
import Home from "./components/home";
import TaskEdit from "./components/task-edit";
import "./app.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task-list" element={<TaskEdit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
