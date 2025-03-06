"use client";

import React from "react";
import Navbar from "@/components/Navbar"; // Adjust the import path if needed
import TableView from "@/components/TableView";
import AppSidebar from "@/components/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Page = () => {
  return (
    <div className="flex max-h-screen h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Dashboard Content */}
        <div className="p-6 flex-1">
          <Card className="shadow-lg border border-gray-200 bg-white w-{500}">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">
                Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-lg">
                Welcome to your dashboard. Manage your data efficiently!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
