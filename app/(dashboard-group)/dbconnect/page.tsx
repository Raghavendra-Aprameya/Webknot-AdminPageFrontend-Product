"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DatabaseConnectionForm = () => {
  const [connectionString, setConnectionString] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if(!connectionString || !username || !password){
      console.log("hello");
      
      toast("Fill all the required fields");
      return;
    }
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/api/v1/db/connect", {
        connectionUrl: connectionString,
        username,
        password,
      });

    

      console.log(response.data);

      if(response.data.status==="success")
      {
        router.push("/dashboard");
        toast.success("Database Connected Successfully", {
          description: `Successfully connected to the database`,
        });
      }
      else
      {
        toast.error("Connection Failed", {
          description: `Unable to connect to the database`,
        });
      }
    } catch (error: any) {
      toast.error("Connection Failed", {
        description:
          error.response?.data?.message || "Unable to connect to the database",
      });

      console.error("Database connection error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#F5F5F7] flex items-center justify-center min-h-[80vh] bg-white">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center justify-center">
            <h2 className="text-2xl">Database Connection</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div>
              <Label htmlFor="username" className="mb-2 block">
                Username
              </Label>
              <Input
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="password" className="mb-2 block">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
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
