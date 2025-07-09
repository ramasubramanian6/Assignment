import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import React from "react";
import Login from "./Login";

const AllRouter = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
    </Routes>
);

export default AllRouter;