import React from "react";
import EmployeesComponent from "../components/EmployeesComponent";

export default function HomePage() {
  return (
    <div style={{ overflowY: "scroll", overflowx: "hidden" }}>
     <EmployeesComponent/>
    </div>
  );
}
