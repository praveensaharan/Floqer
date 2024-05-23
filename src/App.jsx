import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Table from "./Pages/Table";
import NoRoutePage from "./components/Notfound";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/data/:year" element={<Table />} />
        <Route path="*" element={<NoRoutePage />} />
      </Routes>
    </Router>
  );
}

export default App;
