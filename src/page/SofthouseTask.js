import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./Login/Login";
import Github from "./Github/Github";

function Anonimi() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/github" element={<Github />} /> 
        </Routes>
        </BrowserRouter>
  );
}

export default Anonimi;