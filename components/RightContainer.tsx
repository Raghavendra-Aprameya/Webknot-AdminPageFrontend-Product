import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

interface RightContainerProps {
  data: any;
}

interface UseCaseData {
  use_case: string;
  query: string;
  user_input_columns: string[];
}



const RightContainer: React.FC<RightContainerProps> = ({
  data,
  useCaseData
}) => {

  const [userInputs, setUserInputs] = useState<{ [key: string]: string }>({});
  const userInputColumns = useCaseData?.user_input_columns || [];


  const handleInputChange = (column: string, value: string) => {
    setUserInputs((prevInputs) => ({
      ...prevInputs,
      [column]: value,
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      use_case: useCaseData?.use_case,
      query: useCaseData?.query,
      user_input_columns: userInputColumns.length > 0 ? userInputs : {},
    };

    console.log("Submitting payload:", payload);

    try {
      const response = await axios.post("/api/execute-query", payload);
      console.log("Response:", response.data);
      // Handle response actions here
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle error here
    }
  };

  return (
    <Card className="p-3 border rounded-lg shadow-md h-full">
      {useCaseData ? (
        <p>{useCaseData.use_case}</p>
      ) : (
        <p>No use case selected yet.</p>
      )}

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
                      value={userInputs[column]}
                      onChange={(e) =>
                        handleInputChange(column, e.target.value)
                      }
                      placeholder={`Enter ${column}`}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Submit Button */}
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
      </div>

      <p className="text-md font-semibold mb-2">Dynamic UI Container</p>
      <table className="min-w-full border-collapse rounded-md overflow-hidden">
        <thead>
          <tr className="bg-[#f1f5f9]">
            <th className="px-6 py-3 border-b border-slate-200 text-left text-sm font-semibold text-slate-700">
              ID
            </th>
            <th className="px-6 py-3 border-b border-slate-200 text-left text-sm font-semibold text-slate-700">
              Title
            </th>
            <th className="px-6 py-3 border-b border-slate-200 text-left text-sm font-semibold text-slate-700">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data?.tableData?.map((item: any, index: number) => (
            <tr
              key={index}
              className="hover:bg-slate-50 transition-all duration-200"
            >
              <td className="px-6 py-4 text-sm text-slate-700 border-b border-slate-100">
                {item.id}
              </td>
              <td className="px-6 py-4 text-sm text-slate-700 border-b border-slate-100">
                {item.title}
              </td>
              <td className="px-6 py-4 text-sm text-slate-700 border-b border-slate-100">
                {item.description}
              </td>
            </tr>
          )) || (
            <tr>
              <td
                colSpan={3}
                className="border border-gray-300 p-2 text-center text-gray-500"
              >
                Loading data...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Card>
  );
};

export default RightContainer;
