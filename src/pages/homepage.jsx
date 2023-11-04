import React from "react";
import NavBar from "../components/header/NavBar";
import Form from "../components/form/Form";
const Homepage = () => {
  return (
    <div style={{ backgroundColor: "#000" }}>
      <NavBar />
      <div
        className="d-flex justify-content-center flex-column align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <Form />
      </div>
    </div>
  );
};

export default Homepage;
