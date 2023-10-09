import React from "react";
import { RotatingLines } from 'react-loader-spinner'; // Import the loader component

const Loader = ({ visible }) => {
  return (
    <div
      className="loader-container"
      style={{
        display: visible ? "block" : "none",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: "5px",
        padding: "20px",
      }}
    >
      <RotatingLines strokeColor="grey" strokeWidth="5" animationDuration="0.75" width="96" visible={true} />
    </div>
  );
};

export default Loader;
