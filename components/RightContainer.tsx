import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import axios from "axios";
import { UseCaseData } from "./../types/user";
import { toast } from "sonner";

interface RightContainerProps {
  data: any;
  useCaseData: UseCaseData;
}

const RightContainer: React.FC<RightContainerProps> = ({
  data,
  useCaseData,
}) => {
  const [userInputs, setUserInputs] = useState<{ [key: string]: any }>({});
  const userInputColumns = useCaseData?.user_input_columns || [];

  const [responseData, setResponseData] = useState<any>(null);

  const handleInputChange = (column: string, value: any) => {
    setUserInputs((prevInputs) => ({
      ...prevInputs,
      [column]: value,
    }));
  };

  const handleSubmit = async () => {
    const userInputValuesArray = userInputColumns.map(
      (column) => userInputs[column] || ""
    );

    const payload = {
      use_case: useCaseData?.use_case,
      query: useCaseData?.query,
      params: userInputColumns.length > 0 ? userInputValuesArray : [],
    };

    console.log("Submitting payload:", payload);

    try {
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
    }
  };

  const handleUpdate = () => {
    setUserInputs({});
    setResponseData(null);
    console.log("Inputs and response cleared!");
  };

  // Function to render table if execution_result is an array of objects
  const renderTable = (executionResult: any[]) => {
    if (executionResult.length === 0) {
      return <p>No data found.</p>;
    }

    const headers = Object.keys(executionResult[0]);

    return (
      <div className="overflow-x-auto mt-4 overflow-y-auto pr-2 flex-1 max-h-85 thin-scrollbar">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  className="px-4 py-2 border border-gray-300 text-left font-medium"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {executionResult.map((row, idx) => (
              <tr key={idx} className="odd:bg-white even:bg-gray-50">
                {headers.map((header, i) => (
                  <td key={i} className="px-4 py-2 border border-gray-300">
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Function to determine how to display execution_result
  const renderExecutionResult = () => {
    const executionResult = responseData?.execution_result;

    if (!executionResult) return null;

    // Case 1: It's an array of objects (table)
    if (Array.isArray(executionResult) && executionResult.length > 0) {
      const isObjectArray = typeof executionResult[0] === "object";
      if (isObjectArray) {
        return renderTable(executionResult);
      }
    }

    // Case 2: It's a message (string or no valid data)
    if (typeof executionResult === "string") {
      return (
        <p className="mt-4 p-2 bg-slate-100 rounded text-sm">
          {executionResult}
        </p>
      );
    }

    // Default fallback if empty or unknown format
    return (
      <p className="mt-4 p-2 bg-slate-100 rounded text-sm">
        No data available.
      </p>
    );
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

            {userInputColumns.length > 0 && (
              <div className="space-y-2">
                <p className="text-md font-semibold mt-2">Enter Values:</p>
                {userInputColumns.map((column: string, index: number) => (
                  <div key={index} className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">
                      {column}
                    </label>
                    <input
                      type="text"
                      className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-500"
                      value={userInputs[column] || ""}
                      onChange={(e) =>
                        handleInputChange(column, e.target.value)
                      }
                      placeholder={`Enter ${column}`}
                    />
                  </div>
                ))}
              </div>
            )}

            <Button
              className="mt-4"
              onClick={handleSubmit}
              disabled={!useCaseData}
            >
              Submit
            </Button>
            <Button
              variant="outline"
              onClick={handleUpdate}
              disabled={!useCaseData}
            >
              Clear
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
          <div className="mt-4">
            <h3 className="text-md font-semibold mb-2">Response:</h3>
            {renderExecutionResult()}
          </div>
        )}
      </div>
    </Card>
  );
};

export default RightContainer;

