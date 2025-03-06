"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

const DatabaseConnectionForm = () => {
  const [connectionString, setConnectionString] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(
      "Connecting with connection string:",
      connectionString,
      "username:",
      username,
      "password:",
      password
    );
    setIsLoading(true);

    try {
      const response = await axios.post("/api/database/connect", {
        connectionString,
        username,
        password,
      });

      toast.success("Database Connected Successfully", {
        description: `Successfully connected to the database`,
      });

      console.log(response.data);

  
      router.push("/dashboard");
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
    <div className="flex items-center justify-center min-h-screen bg-white">
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
              // disabled={
              //   !connectionString || !username || !password || isLoading
              // }
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
