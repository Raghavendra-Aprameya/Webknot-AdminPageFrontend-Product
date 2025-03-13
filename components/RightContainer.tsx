import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import axios from "axios";
import { UseCaseData } from "./../types/user";

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
    } catch (error) {
      console.error("Error submitting data:", error);
    }
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
          </>
        ) : (
          <p>No use case selected yet.</p>
        )}

        <pre className="bg-slate-100 p-2 rounded text-sm overflow-x-auto">
          {responseData ? JSON.stringify(responseData.status, null, 2) : ""}
        </pre>
      </div>
    </Card>
  );
};

export default RightContainer;
