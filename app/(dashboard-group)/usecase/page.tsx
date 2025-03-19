// "use client";

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { X, PlusCircle, Check, DatabaseIcon } from "lucide-react";
// import {
//   useOperationContext,
//   Operation,
//   OperationCategory,
// } from "@/context/OperationContext";
// import { useDbContext } from "@/context/DbContext";

// const CrudOperationsPage: React.FC = () => {
//   const [operations, setOperations] = useState<
//     Record<OperationCategory, string[]>
//   >({
//     Create: [],
//     Read: [],
//     Update: [],
//     Delete: [],
//     User: [],
//   });

//   const [selectedOperationsMap, setSelectedOperationsMap] = useState<
//     Record<string, boolean>
//   >({});
//   const [userOperations, setUserOperations] = useState<Operation[]>([]);
//   const [newUserOperation, setNewUserOperation] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const { dbConnected } = useDbContext();
//   const router = useRouter();

//   const { selectedOperations, setSelectedOperations } = useOperationContext();

//   const fetchUseCases = async () => {
//     const token = localStorage.getItem("token");
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         "http://127.0.0.1:8000/api/v1/use_cases"
//       );
//       const data = response.data;
//       console.log(data);
//       if (data.status === "success" && data.use_cases_result) {
//         setOperations({
//           Create:
//             data.use_cases_result.create.map((item: any) => item.use_case) ||
//             [],
//           Read:
//             data.use_cases_result.read.map((item: any) => item.use_case) || [],
//           Update:
//             data.use_cases_result.update.map((item: any) => item.use_case) ||
//             [],
//           Delete:
//             data.use_cases_result.delete.map((item: any) => item.use_case) ||
//             [],
//         });
//       }
//     } catch (error) {
//       console.error("Failed to fetch use cases:", error);
//     } finally {
//       setLoading(false);
//     }
//   };


//   useEffect(() => {
//     fetchUseCases();
//   }, []);

//   // Handle checkbox changes for fetched operations
//   const handleSelectChange = (
//     value: boolean,
//     category: OperationCategory,
//     index: number
//   ) => {
//     setSelectedOperationsMap((prev) => ({
//       ...prev,
//       [`${category}-${index}`]: value,
//     }));
//   };

//   // Handle checkbox changes for user-added operations
//   const handleUserSelectChange = (value: boolean, index: number) => {
//     setSelectedOperationsMap((prev) => ({
//       ...prev,
//       [`user-${index}`]: value,
//     }));
//   };

//   // Add a user-defined operation
//   const handleAddUserOperation = () => {
//     if (newUserOperation.trim()) {
//       setUserOperations((prev) => [
//         ...prev,
//         { text: newUserOperation.trim(), category: "User" },
//       ]);
//       setNewUserOperation("");
//     }
//   };

//   // Collect and store all selected operations directly into context
//   const handleAddSelectedOperations = () => {
//     const selectedUseCases: Operation[] = [];

//     // Collect from standard operations
//     (Object.entries(operations) as [OperationCategory, string[]][]).forEach(
//       ([category, cases]) => {
//         cases.forEach((useCase, index) => {
//           if (selectedOperationsMap[`${category}-${index}`]) {
//             selectedUseCases.push({ category, text: useCase });
//           }
//         });
//       }
//     );

//     // Collect from user operations
//     userOperations.forEach((op, index) => {
//       if (selectedOperationsMap[`user-${index}`]) {
//         selectedUseCases.push(op);
//       }
//     });

//     // Update context with all selected operations
//     setSelectedOperations([...selectedOperations, ...selectedUseCases]);
//   };

//   // Remove operation from selected operations context
//   const handleRemoveSelectedUseCase = (indexToRemove: number) => {
//     setSelectedOperations((prev) =>
//       prev.filter((_, index) => index !== indexToRemove)
//     );
//   };

//   // Navigate to /main when ready
//   const handleNavigate = () => {
//     router.push("/main");
//   };

//   return (
//     <div className="container mx-auto p-4 max-h-screen">
//       <div className="flex flex-col md:flex-row gap-4">
//         {/* Left Section - Use Cases and Add New */}
//         <Card className="flex-1 p-3 space-y-6 min-h-[80vh]">
//           <div className="flex justify-between p-0.5 border-b-2">
//             <h1 className="text-xl font-semibold mb-4">
//               AI Generated UseCases
//             </h1>
//             <Button onClick={fetchUseCases} disabled={loading}>
//               {loading ? "Refreshing..." : "Refresh Usecases"}
//             </Button>
//           </div>

//           {/* Check for dbConnection and show accordingly */}
//           {dbConnected ? (
//             /* Content when database is connected */
//             <>
//               {/* Generated UseCases */}
//               {(Object.entries(operations) as [OperationCategory, string[]][])
//                 .slice(0, 4)
//                 .map(([category, useCases]) => (
//                   <section key={category}>
//                     <h2 className="text-lg font-medium mb-1">
//                       {category} Operations
//                     </h2>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
//                       {useCases.length > 0 ? (
//                         useCases.map((useCase, index) => (
//                           <Card key={index} className="shadow-sm p-4">
//                             <CardContent className="flex items-center gap-2">
//                               <Checkbox
//                                 id={`${category}-${index}`}
//                                 checked={
//                                   selectedOperationsMap[
//                                     `${category}-${index}`
//                                   ] || false
//                                 }
//                                 onCheckedChange={(value: boolean) =>
//                                   handleSelectChange(value, category, index)
//                                 }
//                               />
//                               <p className="text-sm">{useCase}</p>
//                             </CardContent>
//                           </Card>
//                         ))
//                       ) : (
//                         <p className="text-gray-500 col-span-3 text-sm">
//                           No {category.toLowerCase()} operations available.
//                         </p>
//                       )}
//                     </div>
//                   </section>
//                 ))}

//               {/* User Added Operations */}
//               <section>
//                 <h2 className="text-lg font-medium mb-2">
//                   User Added Operations
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
//                   {userOperations.length > 0 ? (
//                     userOperations.map((op, index) => (
//                       <Card key={index} className="shadow-sm p-4">
//                         <CardContent className="flex items-center gap-2">
//                           <Checkbox
//                             id={`user-${index}`}
//                             checked={
//                               selectedOperationsMap[`user-${index}`] || false
//                             }
//                             onCheckedChange={(value: boolean) =>
//                               handleUserSelectChange(value, index)
//                             }
//                           />
//                           <p className="text-sm">{op.text}</p>
//                         </CardContent>
//                       </Card>
//                     ))
//                   ) : (
//                     <p className="text-gray-500 col-span-3 text-sm">
//                       No user operations added yet.
//                     </p>
//                   )}
//                 </div>
//               </section>

//               {/* Add New Operation */}
//               <Card className="shadow-sm p-3">
//                 <CardHeader>
//                   <CardTitle className="text-base">Add New Operation</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex gap-2">
//                     <Input
//                       placeholder="Enter new operation..."
//                       value={newUserOperation}
//                       onChange={(e) => setNewUserOperation(e.target.value)}
//                       className="flex-1 text-sm"
//                     />
//                     <Button
//                       onClick={handleAddUserOperation}
//                       className="px-3 py-2"
//                     >
//                       <PlusCircle className="mr-1 h-4 w-4" />
//                       Add
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             </>
//           ) : (
//             /* Database Connection Required message - replaces all content in the left card */
//             <div className="text-center text-black my-8 p-8 border-2 border-dashed rounded-lg bg-white">
//               <div className="flex justify-center mb-4">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="48"
//                   height="48"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="text-gray-300"
//                 >
//                   <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
//                   <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
//                   <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
//                 </svg>
//               </div>
//               <h2 className="text-xl font-semibold mb-2">
//                 Database Connection Required
//               </h2>
//               <p className="mb-4">
//                 Connect your database to unlock AI-generated use cases tailored
//                 to your schema.
//               </p>
//               <Button
//                 variant="outline"
//                 className="mx-auto bg-[#f1f5f9] cursor-pointer text-black"
//               >
//                 Connect Database
//               </Button>
//             </div>
//           )}
//         </Card>

//         {/* Right Section - Selected Operations */}
//         <div className="w-full md:w-1/4 flex flex-col gap-6 sticky top-4">
//           <Card className="shadow-md p-3">
//             <CardHeader>
//               <CardTitle className="text-lg">Selected Operations</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <Button
//                 onClick={handleAddSelectedOperations}
//                 className="w-full mb-3"
//               >
//                 <Check className="mr-2 h-4 w-4" />
//                 Add Selected
//               </Button>

//               {selectedOperations.length > 0 ? (
//                 <div className="border rounded-md p-3 text-sm space-y-2">
//                   {selectedOperations.map((useCase, index) => (
//                     <div
//                       key={index}
//                       className="flex justify-between items-start gap-2"
//                     >
//                       <div>
//                         <span className="font-medium">{useCase.category}:</span>{" "}
//                         <p className="inline">{useCase.text}</p>
//                       </div>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="h-6 w-6 p-1"
//                         onClick={() => handleRemoveSelectedUseCase(index)}
//                       >
//                         <X className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-500">No operations selected yet.</p>
//               )}
//             </CardContent>
//           </Card>

//           <div className="mt-4 flex gap-3 justify-end">
//             <Button
//               variant="outline"
//               onClick={handleNavigate}
//               className="w-full md:w-auto cursor-pointer"
//             >
//               Launch Admin Panel
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CrudOperationsPage;








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
import { useDbContext } from "@/context/DbContext";
import { toast } from "sonner";

const CrudOperationsPage: React.FC = () => {
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
  const { dbConnected } = useDbContext();
  const router = useRouter();

  const {
    selectedOperations,
    setSelectedOperations,
    finalSelectedUsecase,
    setFinalSelectedUsecase,
  } = useOperationContext();

  const fetchUseCases = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.get("/example_data.json");
      const data = response.data.data;
      console.log(data);
      if (data.status === "success" && data.use_cases_result) {
        setOperations({
          Create:
            data.use_cases_result.create.map((item: any) => item.use_case) ||
            [],
          Read:
            data.use_cases_result.read.map((item: any) => item.use_case) || [],
          Update:
            data.use_cases_result.update.map((item: any) => item.use_case) ||
            [],
          Delete:
            data.use_cases_result.delete.map((item: any) => item.use_case) ||
            [],
        });
      }
    } catch (error) {
      console.error("Failed to fetch use cases:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUseCases();
  }, []);

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

  const handleUserSelectChange = (value: boolean, index: number) => {
    setSelectedOperationsMap((prev) => ({
      ...prev,
      [`user-${index}`]: value,
    }));
  };

  // const handleAddUserOperation = () => {
  //   if (newUserOperation.trim()) {
  //     setUserOperations((prev) => [
  //       ...prev,
  //       { text: newUserOperation.trim(), category: "User" },
  //     ]);
  //     setNewUserOperation("");
  //   }
  // };


  const handleAddUserOperation = async () => {
    if (!newUserOperation.trim()) return;

    // Show validation message
    toast.loading("Validating your use case...", { id: "validate-toast" });

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/execute_use_case",
        {
          use_case: newUserOperation.trim(),
        }
      );

      const data = response.data;

      if (data.valid) {
        // Add to user operations and final selected use cases
        const newOperation: Operation = {
          use_case_id: crypto.randomUUID(),
          use_case: data.use_case,
          query: data.query,
          user_input_columns: data.user_input_columns,
          category: "User",
        };

        setUserOperations((prev) => [...prev, newOperation]);
        setFinalSelectedUsecase((prev) => [...prev, newOperation]);

        toast.success("Use case added successfully!", { id: "validate-toast" });
      } else {
        // Show error message if invalid
        toast.error("Invalid use case: " + data.query, {
          id: "validate-toast",
        });
      }
    } catch (error) {
      console.error("Failed to validate use case:", error);
      toast.error("Something went wrong! Try again.", { id: "validate-toast" });
    } finally {
      setNewUserOperation(""); // Clear input
    }
  };



  // const handleAddSelectedOperations = () => {
  //   const selectedUseCases: Operation[] = [];
  //   const finalUseCases: any[] = [];

  //   (Object.entries(operations) as [OperationCategory, string[]][]).forEach(
  //     ([category, cases]) => {
  //       cases.forEach((useCase, index) => {
  //         if (selectedOperationsMap[`${category}-${index}`]) {
  //           const useCaseId = crypto.randomUUID();
  //           selectedUseCases.push({ category, text: useCase });
  //           finalUseCases.push({
  //             use_case_id: useCaseId,
  //             use_case: useCase,
  //             query: "Generated SQL query for " + useCase,
  //             user_input_columns: ["Column1", "Column2"],
  //           });
  //         }
  //       });
  //     }
  //   );

  //   userOperations.forEach((op, index) => {
  //     if (selectedOperationsMap[`user-${index}`]) {
  //       const useCaseId = crypto.randomUUID();
  //       selectedUseCases.push(op);
  //       finalUseCases.push({
  //         use_case_id: useCaseId,
  //         use_case: op.text,
  //         query: "Generated SQL query for " + op.text,
  //         user_input_columns: ["Column1", "Column2"],
  //       });
  //     }
  //   });

  //   setSelectedOperations([...selectedOperations, ...selectedUseCases]);
  //   setFinalSelectedUsecase([...finalSelectedUsecase, ...finalUseCases]);
  // };



  const handleAddSelectedOperations = () => {
    const selectedUseCases: Operation[] = [];

    (Object.entries(operations) as [OperationCategory, string[]][]).forEach(
      ([category, cases]) => {
        cases.forEach((useCase, index) => {
          if (selectedOperationsMap[`${category}-${index}`]) {
            selectedUseCases.push({
              category,
              text: useCase,
            });
          }
        });
      }
    );

    userOperations.forEach((op, index) => {
      if (selectedOperationsMap[`user-${index}`]) {
        selectedUseCases.push(op);
      }
    });

    setSelectedOperations([...selectedOperations, ...selectedUseCases]);

    // Ensure finalSelectedUsecase is always an array before spreading
    setFinalSelectedUsecase([
      ...(finalSelectedUsecase ?? []), // Ensure it's an array before spreading
      ...selectedUseCases.map((useCase) => ({
        use_case_id: crypto.randomUUID(), // Generate a UUID for each
        use_case: useCase.text,
        query: "", // You might want to generate or fetch a query for this
        user_input_columns: [], // Adjust based on your data structure
      })),
    ]);
  };



  const handleRemoveSelectedUseCase = (indexToRemove: number) => {
    setSelectedOperations((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
    setFinalSelectedUsecase((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleNavigate = () => {
    router.push("/main");
  };

  return (
    <div className="container mx-auto p-4 max-h-screen">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Section - Use Cases and Add New */}
        <Card className="flex-1 p-3 space-y-6 min-h-[80vh]">
          <div className="flex justify-between p-0.5 border-b-2">
            <h1 className="text-xl font-semibold mb-4">
              AI Generated UseCases
            </h1>
            <Button onClick={fetchUseCases} disabled={loading}>
              {loading ? "Refreshing..." : "Refresh Usecases"}
            </Button>
          </div>

          {/* Check for dbConnection and show accordingly */}
          {dbConnected ? (
            /* Content when database is connected */
            <>
              {/* Generated UseCases */}
              {(Object.entries(operations) as [OperationCategory, string[]][])
                .slice(0, 4)
                .map(([category, useCases]) => (
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
                                  selectedOperationsMap[
                                    `${category}-${index}`
                                  ] || false
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
                ))}

              {/* User Added Operations */}
              <section>
                <h2 className="text-lg font-medium mb-2">
                  User Added Operations
                </h2>
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
                    <Button
                      onClick={handleAddUserOperation}
                      className="px-3 py-2"
                    >
                      <PlusCircle className="mr-1 h-4 w-4" />
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            /* Database Connection Required message - replaces all content in the left card */
            <div className="text-center text-black my-8 p-8 border-2 border-dashed rounded-lg bg-white">
              <div className="flex justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-300"
                >
                  <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">
                Database Connection Required
              </h2>
              <p className="mb-4">
                Connect your database to unlock AI-generated use cases tailored
                to your schema.
              </p>
              <Button
                variant="outline"
                className="mx-auto bg-[#f1f5f9] cursor-pointer text-black"
              >
                Connect Database
              </Button>
            </div>
          )}
        </Card>

        {/* Right Section - Selected Operations */}
        <div className="w-full md:w-1/4 flex flex-col gap-6 sticky top-4">
          <Card className="shadow-md p-3">
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
