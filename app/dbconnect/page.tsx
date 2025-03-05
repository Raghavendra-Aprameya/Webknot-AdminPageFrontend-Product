// import React from 'react'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input"


// const page = () => {
//   return (

//     <div className='w-[360px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
//       <Select>
//         <SelectTrigger className="w-[360px]">
//           <SelectValue placeholder="Select Database" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="light">MySQL</SelectItem>
//           <SelectItem value="dark">PostGress</SelectItem>
//           <SelectItem value="system">MongoDB</SelectItem>
//         </SelectContent>
//       </Select>
//       <Input className='w-[360px] mt-2'/>
//     </div>
//   );
// }

// export default page

"use client"

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Server, Lock } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const DatabaseConnectionForm = () => {
  const [selectedDatabase, setSelectedDatabase] = useState("");
  const [connectionString, setConnectionString] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const databases = [
    {
      value: "mysql",
      label: "MySQL",
      icon: <Database className="mr-2 h-4 w-4" />,
    },
    {
      value: "postgres",
      label: "PostgreSQL",
      icon: <Server className="mr-2 h-4 w-4" />,
    },
    {
      value: "mongodb",
      label: "MongoDB",
      icon: <Lock className="mr-2 h-4 w-4" />,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(
      "Connecting to",
      selectedDatabase,
      "with connection string:",
      connectionString
    );
    setIsLoading(true);

    try {
      const response = await axios.post('/api/database/connect', {
        type: selectedDatabase,
        connectionString: connectionString
      });

      toast.success('Database Connected Successfully', {
        description: `Connected to ${selectedDatabase} database`
      });

      console.log(response.data);
    } catch (error: any) {
      toast.error('Connection Failed', {
        description: error.response?.data?.message || 'Unable to connect to database'
      });

      console.error('Database connection error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center justify-center">
            {/* <Database className="mr-2 h-6 w-6 text-blue-500" /> */}
            <h2 className="text-2xl">Database Connection</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="database-select" className="mb-2 block">
                Select Database
              </Label>
              <Select
                value={selectedDatabase}
                onValueChange={setSelectedDatabase}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a database">
                    {selectedDatabase &&
                      databases.find((db) => db.value === selectedDatabase)
                        ?.icon}
                    {selectedDatabase
                      ? databases.find((db) => db.value === selectedDatabase)
                          ?.label
                      : "Select Database"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {databases.map((db) => (
                    <SelectItem key={db.value} value={db.value}>
                      <div className="flex items-center">
                        {db.icon}
                        {db.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="connection-string" className="mb-2 block">
                Connection String
              </Label>
              <Input
                id="connection-string"
                placeholder="Enter database connection string"
                value={connectionString}
                onChange={(e) => setConnectionString(e.target.value)}
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              //   disabled={!selectedDatabase || !connectionString}
            >
              Connect to Database
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseConnectionForm;