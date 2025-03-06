"use client";

import React, { useState } from "react";
import Navbar from "./../../components/Navbar";
import TableView from "@/components/TableView";
import AppSidebar from "@/components/app-sidebar";

const Page = () => {
  // const [selectedTable, setSelectedTable] = useState<string | null>(null);

  // const handleTableSelect = (tableName: string) => {
  //   setSelectedTable(tableName);
  // };

  return (
    <div className="">
      <div className="flex h-screen">
        <div className="flex-1">
          <div className="p-4 border-b">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-500">Welcome to your database manager</p>
          </div>
          {/* <div className="p-4">
            {selectedTable && <TableView tableName={selectedTable} />}

            {!selectedTable && <p>Please select a table to view data.</p>}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Page;
