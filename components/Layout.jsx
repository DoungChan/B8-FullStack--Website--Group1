import React from "react";
import Navbar from "./navbar/Navbar";

export const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};
