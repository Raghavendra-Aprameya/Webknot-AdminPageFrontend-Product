"use client";

import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useUseCase } from "@/context/UseCaseContext";

interface RightContainerProps {
  data: any;
}

const RightContainer: React.FC<RightContainerProps> = ({ data }) => {
  const { useCase } = useUseCase();
  const [userInputs, setUserInputs] = useState<{ [key: string]: any }>({});
  const [useCaseData, setUseCaseData] = useState<any>(null);
  const [responseData, setResponseData] = useState<any>(null);

  useEffect(() => {
    if (useCase) {
      const fetchUseCaseData = async () => {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.post(
            "http://localhost:8080/api/v1/fastapi/execute_use_case",
            {
              use_case: useCase,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          console.log("Response Data:", response.data);
          setUseCaseData(response.data);
        } catch (error) {
          console.error("Error fetching use case data:", error);
        }
      };
      fetchUseCaseData();
    }
  }, [useCase]); // Re-fetch when use_case changes

  const handleInputChange = (column: string, value: any) => {
    setUserInputs((prevInputs) => ({
      ...prevInputs,
      [column]: value,
    }));
  };

  const handleSubmit = async () => {
    const userInputValuesArray = useCaseData?.user_input_columns.map(
      (column: string) => userInputs[column] || ""
    );

    const payload = {
      use_case: useCaseData?.use_case,
      query: useCaseData?.query,
      params: userInputValuesArray,
    };

    console.log("Submitting payload:", payload);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/api/v1/update_data",
        payload
      );
      console.log("Response:", response.data);
      setResponseData(response.data);

      toast.success("Data Updated Successfully", {
        description: response?.data?.status || "Data Updated Successfully",
      });
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Error submitting data. Please try again.");
    }
  };

  const renderInputs = () => {
    if (!useCaseData) return null;

    return useCaseData.user_input_columns.map(
      (column: string, index: number) => (
        <div key={index} className="flex flex-col mb-2">
          <label className="text-sm font-medium text-gray-700">{column}</label>
          <input
            type="text"
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-500"
            value={userInputs[column] || ""}
            onChange={(e) => handleInputChange(column, e.target.value)}
            placeholder={`Enter ${column}`}
          />
        </div>
      )
    );
  };

  const renderExecutionResult = () => {
    if (Array.isArray(responseData?.execution_result)) {
      const keys = Object.keys(responseData.execution_result[0]);
      return (
        <table className="min-w-full mt-4 table-auto border-collapse border border-gray-300 overflow-auto">
          <thead>
            <tr>
              {keys.map((key) => (
                <th
                  key={key}
                  className="border-b px-4 py-2 text-left text-sm font-semibold"
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {responseData.execution_result.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                {keys.map((key) => (
                  <td key={key} className="border-b px-4 py-2 text-sm">
                    {item[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    return <p className="mt-4 text-sm text-gray-700">No results available.</p>;
  };

  return (
    <Card className="p-3 border rounded-lg shadow-md h-full">
      <div className="space-y-2">
        {useCaseData ? (
          <>
            <p className="text-lg font-semibold">{useCaseData.use_case}</p>
            <pre className="bg-slate-100 p-2 rounded text-sm overflow-x-auto">
              {useCaseData.query}
            </pre>

            <div className="space-y-2">
              <p className="text-md font-semibold mt-2">Enter Values:</p>
              {renderInputs()}
            </div>

            <Button
              className="mt-4"
              onClick={handleSubmit}
              disabled={!useCaseData}
            >
              Submit
            </Button>
          </>
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <h1 className="text-3xl font-semibold text-gray-700">
              Please select a usecase to Continue
            </h1>
          </div>
        )}

        {/* Response section */}
        {responseData && (
          <div className="mt-4 max-h-[50vh] overflow-y-auto">
            <h3 className="text-md font-semibold mb-2">Response:</h3>
            {renderExecutionResult()}
          </div>
        )}
      </div>
    </Card>
  );
};

export default RightContainer;

