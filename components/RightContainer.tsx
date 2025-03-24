// "use client";

// import React, { useEffect, useState } from "react";
// import { Card } from "./ui/card";
// import { Button } from "./ui/button";
// import axios from "axios";
// import { toast } from "sonner";
// import { useSelectedUseCase } from "@/context/SelectedUseCaseContext"; // Updated import
// import { useOperationContext } from "../context/OperationContext";

// interface RightContainerProps {}

// const RightContainer: React.FC<RightContainerProps> = () => {
//   const { selectedUseCase, setSelectedUseCase } = useSelectedUseCase(); // Get from context
//   const [userInputs, setUserInputs] = useState<{ [key: string]: any }>({});
//   const [responseData, setResponseData] = useState<any>(null);

//   const {
//     selectedOperations,
//     setSelectedOperations,
//     finalSelectedUsecase,
//     setFinalSelectedUsecase,
//   } = useOperationContext();

//   const handleInputChange = (column: string, value: any) => {
//     setUserInputs((prevInputs) => ({
//       ...prevInputs,
//       [column]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     if (!selectedUseCase) return;

//     const userInputValuesArray = selectedUseCase?.user_input_columns.map(
//       (column: string) => userInputs[column] || ""
//     );

//     const payload = {
//       use_case: selectedUseCase.use_case,
//       query: selectedUseCase.query,
//       params: userInputValuesArray,
//     };
//     // toast.loading("Executing Query...");

//     console.log("Submitting payload:", payload);

//     try {
//       // const token = localStorage.getItem("token");
//       const response = await axios.post(
//         "http://localhost:8000/api/v1/update_data",
//         payload
//       );
//       console.log("Response:", response.data);
//       setResponseData(response.data);
//       console.log("hiiii")
//       console.log(responseData);

//       toast.success("Data Updated Successfully", {
//         description:
//           responseData.execution_result || "Data Updated Successfully",
//       });
//     } catch (error) {
//       console.error("Error submitting data:", error);
//       toast.error("Error submitting data. Please try again.");
//     }
//   };

//   const handleClear = () => {
//     setUserInputs({});
//     setResponseData(null);
//     console.log("Inputs and response cleared!");
//   };

//   useEffect(() => {
//     if (selectedUseCase) {
//       handleClear();
//     }
//   }, [selectedUseCase]);

//   const handleDeleteUseCase = () => {
//     if (!selectedUseCase) return;

//     setSelectedOperations((prevOperations) =>
//       prevOperations.filter((op) => op.use_case !== selectedUseCase.use_case)
//     );
//     setSelectedUseCase(null);
//     toast.success("Use Case Deleted Successfully");
//   };

//   const renderInputs = () => {
//     if (!selectedUseCase) return null;

//     return selectedUseCase.user_input_columns.map(
//       (column: string, index: number) => (
//         <div key={index} className="flex flex-col mb-2">
//           <label className="text-sm font-medium text-gray-700">{column}</label>
//           <input
//             type="text"
//             className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-500"
//             value={userInputs[column] || ""}
//             onChange={(e) => handleInputChange(column, e.target.value)}
//             placeholder={`Enter ${column}`}
//           />
//         </div>
//       )
//     );
//   };

//   const renderExecutionResult = () => {
//     if (Array.isArray(responseData?.execution_result)) {
//       const keys = Object.keys(responseData.execution_result[0]);
//       return (
//         <table className="min-w-full mt-4 table-auto border-collapse border border-gray-300 overflow-auto">
//           <thead>
//             <tr>
//               {keys.map((key) => (
//                 <th
//                   key={key}
//                   className="border-b px-4 py-2 text-left text-sm font-semibold"
//                 >
//                   {key}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {responseData.execution_result.map((item, index) => (
//               <tr key={index} className="hover:bg-gray-100">
//                 {keys.map((key) => (
//                   <td key={key} className="border-b px-4 py-2 text-sm">
//                     {item[key]}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       );
//     }
//     return <p className="mt-4 text-sm text-gray-700">No results available.</p>;
//   };

//   return (
//     <Card className="p-5 border rounded-lg shadow-md h-full max-w-[62vw] overflow-auto">
//       <div className="space-y-4">
//         {selectedUseCase ? (
//           <>
//             <div className="flex justify-between items-center pb-2">
//               <p className="text-lg font-semibold">
//                 {selectedUseCase.use_case}
//               </p>
//               <Button
//                 className="ml-2 cursor-pointer"
//                 onClick={handleDeleteUseCase}
//               >
//                 Remove From Dashboard
//               </Button>
//             </div>
//             <pre className="bg-[#f1f5f9] p-2 rounded text-sm overflow-x-auto">
//               {selectedUseCase.query}
//             </pre>

//             <div className="space-y-2">
//               <p className="text-md font-semibold mt-2">Enter Values:</p>
//               {renderInputs()}
//             </div>
//             <div>
//               <Button
//                 className="mt-4 cursor-pointer"
//                 onClick={handleSubmit}
//                 disabled={!selectedUseCase}
//               >
//                 Execute Query
//               </Button>
//               <Button
//                 variant="ghost"
//                 className="mt-4 ml-2 cursor-pointer bg-[#f1f5f9]"
//                 onClick={handleClear}
//               >
//                 Clear Response
//               </Button>
//             </div>
//           </>
//         ) : (
//           <div className="flex items-center justify-center h-full w-full">
//             <h1 className="text-3xl font-semibold text-gray-700">
//               Please select a use case to continue
//             </h1>
//           </div>
//         )}
//       </div>
//     </Card>
//   );
// };

// export default RightContainer;






"use client";

import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useSelectedUseCase } from "@/context/SelectedUseCaseContext";
import { useOperationContext } from "../context/OperationContext";

interface RightContainerProps {}

const RightContainer: React.FC<RightContainerProps> = () => {
  const { selectedUseCase, setSelectedUseCase } = useSelectedUseCase();
  const [userInputs, setUserInputs] = useState<{ [key: string]: any }>({});
  const [responseData, setResponseData] = useState<any>(null);

  const {
    selectedOperations,
    setSelectedOperations,
    finalSelectedUsecase,
    setFinalSelectedUsecase,
  } = useOperationContext();

  // Handle input changes for user input fields
  const handleInputChange = (column: string, value: any) => {
    setUserInputs((prevInputs) => ({
      ...prevInputs,
      [column]: value,
    }));
  };

  // Handle API call to execute query
  const handleSubmit = async () => {
    if (!selectedUseCase) return;

    const userInputValuesArray = selectedUseCase?.user_input_columns.map(
      (column: string) => userInputs[column] || ""
    );

    const payload = {
      use_case: selectedUseCase.use_case,
      query: selectedUseCase.query,
      params: userInputValuesArray,
    };

    console.log("Submitting payload:", payload);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/update_data",
        payload
      );

      console.log("Response:", response.data);
      setResponseData(response.data);
      
      toast.success("Data Retrieved Successfully", {
        description:
          response.data.execution_result || "Query executed successfully!",
      });
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Error fetching data. Please try again.");
    }
  };

  // Clear input and response
  const handleClear = () => {
    setUserInputs({});
    setResponseData(null);
  };

  useEffect(() => {
    if (selectedUseCase) {
      handleClear();
    }
  }, [selectedUseCase]);

  // Remove a selected use case
  const handleDeleteUseCase = () => {
    if (!selectedUseCase) return;

    setSelectedOperations((prevOperations) =>
      prevOperations.filter((op) => op.use_case !== selectedUseCase.use_case)
    );
    setSelectedUseCase(null);
    toast.success("Use Case Removed Successfully");
  };

  // Render input fields dynamically
  const renderInputs = () => {
    if (!selectedUseCase || !selectedUseCase.user_input_columns) return null;

    return selectedUseCase.user_input_columns.map(
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

  // Render API data as a table
  const renderExecutionResult = () => {
    if (Array.isArray(responseData?.data) && responseData.data.length > 0) {
      const keys = Object.keys(responseData.data[0]);

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
            {responseData.data.map((item, index) => (
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
    return <p className="mt-4 text-sm text-gray-700"></p>;
  };

  return (
    <Card className="p-5 border rounded-lg shadow-md h-full max-w-[62vw] overflow-auto">
      <div className="space-y-4">
        {selectedUseCase ? (
          <>
            <div className="flex justify-between items-center pb-2">
              <p className="text-lg font-semibold">
                {selectedUseCase.use_case}
              </p>
              <Button
                className="ml-2 cursor-pointer"
                onClick={handleDeleteUseCase}
              >
                Remove From Dashboard
              </Button>
            </div>

            {/* Query Display */}
            <pre className="bg-[#f1f5f9] p-2 rounded text-sm overflow-x-auto">
              {selectedUseCase.query}
            </pre>

            {/* User Inputs */}
            <div className="space-y-2">
              <p className="text-md font-semibold mt-2">Enter Values:</p>
              {renderInputs()}
            </div>

            {/* Buttons */}
            <div>
              <Button
                className="mt-4 cursor-pointer"
                onClick={handleSubmit}
                disabled={!selectedUseCase}
              >
                Execute Query
              </Button>
              <Button
                variant="ghost"
                className="mt-4 ml-2 cursor-pointer bg-[#f1f5f9]"
                onClick={handleClear}
              >
                Clear Response
              </Button>
            </div>

            {/* Execution Result */}
            {renderExecutionResult()}
          </>
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <h1 className="text-3xl font-semibold text-gray-700">
              Please select a use case to continue
            </h1>
          </div>
        )}
      </div>
    </Card>
  );
};

export default RightContainer;
