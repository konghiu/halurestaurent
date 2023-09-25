import React from "react";
import "./css/admin.css";
import { Outlet } from "react-router-dom";

const Admin = () => {
     return (
          <div className="center">
               <div className="container py-8">
                    <Outlet />
               </div>
          </div>
     );
};

export default Admin;
