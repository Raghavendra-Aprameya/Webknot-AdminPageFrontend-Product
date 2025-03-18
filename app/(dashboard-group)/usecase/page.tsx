"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { X, PlusCircle, Check } from "lucide-react";

import {
  useOperationContext,
  Operation,
  OperationCategory,
} from "@/context/OperationContext";

const CrudOperationsPage: React.FC = () => {
  // Available operations fetched from API
  const [operations, setOperations] = useState<
    Record<OperationCategory, string[]>
  >({
    Create: [],
    Read: [],
    Update: [],
    Delete: [],
    User: [],
  });

  const [selectedOperationsMap, setSelectedOperationsMap] = useState<
    Record<string, boolean>
  >({});
  const [userOperations, setUserOperations] = useState<Operation[]>([]);
  const [newUserOperation, setNewUserOperation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const { selectedOperations, setSelectedOperations } = useOperationContext();

  const fetchUseCases = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/fastapi/use-cases",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(token);
      const data = response.data;

      setOperations((prev) => ({
        ...prev,
        Create: data.Create || [],
        Read: data.Read || [],
        Update: data.Update || [],
        Delete: data.Delete || [],
      }));
    } catch (error) {
      console.error("Failed to fetch use cases:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUseCases();
  }, []);

  // Handle checkbox changes for fetched operations
  const handleSelectChange = (
    value: boolean,
    category: OperationCategory,
    index: number
  ) => {
    setSelectedOperationsMap((prev) => ({
      ...prev,
      [`${category}-${index}`]: value,
    }));
  };

  // Handle checkbox changes for user-added operations
  const handleUserSelectChange = (value: boolean, index: number) => {
    setSelectedOperationsMap((prev) => ({
      ...prev,
      [`user-${index}`]: value,
    }));
  };

  // Add a user-defined operation
  const handleAddUserOperation = () => {
    if (newUserOperation.trim()) {
      setUserOperations((prev) => [
        ...prev,
        { text: newUserOperation.trim(), category: "User" },
      ]);
      setNewUserOperation("");
    }
  };

  // Collect and store all selected operations directly into context
  const handleAddSelectedOperations = () => {
    const selectedUseCases: Operation[] = [];

    // Collect from standard operations
    (Object.entries(operations) as [OperationCategory, string[]][]).forEach(
      ([category, cases]) => {
        cases.forEach((useCase, index) => {
          if (selectedOperationsMap[`${category}-${index}`]) {
            selectedUseCases.push({ category, text: useCase });
          }
        });
      }
    );

    // Collect from user operations
    userOperations.forEach((op, index) => {
      if (selectedOperationsMap[`user-${index}`]) {
        selectedUseCases.push(op);
      }
    });

    // Update context with all selected operations
    setSelectedOperations([...selectedOperations, ...selectedUseCases]);
  };

  // Remove operation from selected operations context
  const handleRemoveSelectedUseCase = (indexToRemove: number) => {
    setSelectedOperations((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  // Navigate to /main when ready
  const handleNavigate = () => {
    router.push("/main");
  };

  return (
    <div className="container mx-auto p-4 max-h-screen">
      <div className="flex justify-between p-2">
        <h1 className="text-2xl font-semibold mb-4">AI Generated UseCases</h1>
        <Button onClick={fetchUseCases} disabled={loading}>
          {loading ? "Refreshing..." : "Refresh Usecases"}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Section - Use Cases and Add New */}
        <Card className="flex-1 p-3 space-y-6">
          {/* Generated UseCases */}
          {(Object.entries(operations) as [OperationCategory, string[]][]).map(
            ([category, useCases]) => (
              <section key={category}>
                <h2 className="text-lg font-medium mb-1">
                  {category} Operations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {useCases.length > 0 ? (
                    useCases.map((useCase, index) => (
                      <Card key={index} className="shadow-sm p-4">
                        <CardContent className="flex items-center gap-2">
                          <Checkbox
                            id={`${category}-${index}`}
                            checked={
                              selectedOperationsMap[`${category}-${index}`] ||
                              false
                            }
                            onCheckedChange={(value: boolean) =>
                              handleSelectChange(value, category, index)
                            }
                          />
                          <p className="text-sm">{useCase}</p>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p className="text-gray-500 col-span-3 text-sm">
                      No {category.toLowerCase()} operations available.
                    </p>
                  )}
                </div>
              </section>
            )
          )}

          {/* User Added Operations */}
          <section>
            <h2 className="text-lg font-medium mb-2">User Added Operations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {userOperations.length > 0 ? (
                userOperations.map((op, index) => (
                  <Card key={index} className="shadow-sm p-4">
                    <CardContent className="flex items-center gap-2">
                      <Checkbox
                        id={`user-${index}`}
                        checked={
                          selectedOperationsMap[`user-${index}`] || false
                        }
                        onCheckedChange={(value: boolean) =>
                          handleUserSelectChange(value, index)
                        }
                      />
                      <p className="text-sm">{op.text}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-gray-500 col-span-3 text-sm">
                  No user operations added yet.
                </p>
              )}
            </div>
          </section>

          {/* Add New Operation */}
          <Card className="shadow-sm p-3">
            <CardHeader>
              <CardTitle className="text-base">Add New Operation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter new operation..."
                  value={newUserOperation}
                  onChange={(e) => setNewUserOperation(e.target.value)}
                  className="flex-1 text-sm"
                />
                <Button onClick={handleAddUserOperation} className="px-3 py-2">
                  <PlusCircle className="mr-1 h-4 w-4" />
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
        </Card>

        {/* Right Section - Selected Operations */}
        <div className="w-full md:w-1/4 flex flex-col gap-6">
          <Card className="shadow-md p-3 sticky top-4">
            <CardHeader>
              <CardTitle className="text-lg">Selected Operations</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleAddSelectedOperations}
                className="w-full mb-3"
              >
                <Check className="mr-2 h-4 w-4" />
                Add Selected
              </Button>

              {selectedOperations.length > 0 ? (
                <div className="border rounded-md p-3 text-sm space-y-2">
                  {selectedOperations.map((useCase, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-start gap-2"
                    >
                      <div>
                        <span className="font-medium">{useCase.category}:</span>{" "}
                        <p className="inline">{useCase.text}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 p-1"
                        onClick={() => handleRemoveSelectedUseCase(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No operations selected yet.</p>
              )}
            </CardContent>
          </Card>

          <div className="mt-4 flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={handleNavigate}
              className="w-full md:w-auto cursor-pointer"
            >
              Launch Admin Panel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrudOperationsPage;
