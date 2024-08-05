import React from "react";
import ShipmentsOverview from "../components/Dashboard/ShipmentsOverview";

const Dashboard = () => {
  return (
    <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <ShipmentsOverview />
          </div>
          <div className="col-xl-12">
            <ShipmentsOverview />
          </div>
        </div>
    </div>
  );
};

export default Dashboard;
