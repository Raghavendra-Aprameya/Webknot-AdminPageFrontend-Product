// "use client";

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { X, PlusCircle, Check } from "lucide-react";
// import Link from "next/link";

// // Type Definitions
// type OperationCategory = "Create" | "Read" | "Update" | "Delete" | "User";

// interface Operation {
//   text: string;
//   category: OperationCategory;
// }

// const CrudOperationsPage: React.FC = () => {
//   const [operations, setOperations] = useState<Record<OperationCategory, string[]>>({
//     Create: [],
//     Read: [],
//     Update: [],
//     Delete: [],
//     User: []
//   });

//   const [selectedOperations, setSelectedOperations] = useState<Record<string, boolean>>({});
//   const [userOperations, setUserOperations] = useState<Operation[]>([]);
//   const [newUserOperation, setNewUserOperation] = useState<string>("");
//   const [finalSelectedUseCases, setFinalSelectedUseCases] = useState<Operation[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);

//   // Fetch use cases from the API
//   const fetchUseCases = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("http://localhost:8000/api/v1/use_cases");
//       const data = response.data;
//       setOperations((prev) => ({
//         ...prev,
//         Create: data.Create || [],
//         Read: data.Read || [],
//         Update: data.Update || [],
//         Delete: data.Delete || [],
//       }));
//     } catch (error) {
//       console.error("Failed to fetch use cases:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch use cases on component mount
//   useEffect(() => {
//     fetchUseCases();
//   }, []);

//   const handleSelectChange = (
//     value: boolean,
//     category: OperationCategory,
//     index: number
//   ) => {
//     setSelectedOperations((prev) => ({
//       ...prev,
//       [`${category}-${index}`]: value,
//     }));
//   };

//   const handleUserSelectChange = (value: boolean, index: number) => {
//     setSelectedOperations((prev) => ({
//       ...prev,
//       [`user-${index}`]: value,
//     }));
//   };

//   const handleAddUserOperation = () => {
//     if (newUserOperation.trim()) {
//       setUserOperations((prev) => [
//         ...prev,
//         { text: newUserOperation.trim(), category: "User" },
//       ]);
//       setNewUserOperation("");
//     }
//   };

//   const handleAddSelectedOperations = () => {
//     const selectedUseCases: Operation[] = [];

//     (Object.entries(operations) as [OperationCategory, string[]][]).forEach(
//       ([category, cases]) => {
//         cases.forEach((useCase, index) => {
//           if (selectedOperations[`${category}-${index}`]) {
//             selectedUseCases.push({ category, text: useCase });
//           }
//         });
//       }
//     );

//     userOperations.forEach((op, index) => {
//       if (selectedOperations[`user-${index}`]) {
//         selectedUseCases.push(op);
//       }
//     });

//     setFinalSelectedUseCases(selectedUseCases);
//   };

//   const handleRemoveSelectedUseCase = (indexToRemove: number) => {
//     setFinalSelectedUseCases((prev) =>
//       prev.filter((_, index) => index !== indexToRemove)
//     );
//   };

//   return (
//     <div className="container mx-auto p-4 max-h-screen">
//       <div className="flex justify-between p-2">
//         <h1 className="text-2xl font-semibold mb-4">AI Generated UseCases</h1>
//         <Button onClick={fetchUseCases} disabled={loading}>
//           {loading ? "Refreshing..." : "Refresh Usecases"}
//         </Button>
//       </div>

//       <div className="flex flex-col md:flex-row gap-4">
//         <Card className="flex-1 p-3">
//           {(Object.entries(operations) as [OperationCategory, string[]][]).map(
//             ([category, useCases]) => (
//               <section key={category}>
//                 <h2 className="text-lg font-medium mb-1">
//                   {category} Operations
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
//                   {useCases.length > 0 ? (
//                     useCases.map((useCase, index) => (
//                       <Card key={index} className="shadow-sm p-4">
//                         <CardContent className="flex items-center gap-2">
//                           <Checkbox
//                             id={`${category}-${index}`}
//                             checked={
//                               selectedOperations[`${category}-${index}`] || false
//                             }
//                             onCheckedChange={(value: boolean) =>
//                               handleSelectChange(value, category, index)
//                             }
//                           />
//                           <p className="text-sm">{useCase}</p>
//                         </CardContent>
//                       </Card>
//                     ))
//                   ) : (
//                     <p className="text-gray-500 col-span-3 text-sm">
//                       No {category.toLowerCase()} operations available.
//                     </p>
//                   )}
//                 </div>
//               </section>
//             )
//           )}

//           <section>
//             <h2 className="text-lg font-medium mb-2">User Added Operations</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
//               {userOperations.length > 0 ? (
//                 userOperations.map((op, index) => (
//                   <Card key={index} className="shadow-sm p-4">
//                     <CardContent className="flex items-center gap-2">
//                       <Checkbox
//                         id={`user-${index}`}
//                         checked={selectedOperations[`user-${index}`] || false}
//                         onCheckedChange={(value: boolean) =>
//                           handleUserSelectChange(value, index)
//                         }
//                       />
//                       <p className="text-sm">{op.text}</p>
//                     </CardContent>
//                   </Card>
//                 ))
//               ) : (
//                 <p className="text-gray-500 col-span-3 text-sm">
//                   No user operations added yet.
//                 </p>
//               )}
//             </div>
//           </section>

//           <Card className="shadow-sm p-3">
//             <CardHeader>
//               <CardTitle className="text-base">Add New Operation</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="flex gap-2">
//                 <Input
//                   placeholder="Enter new operation..."
//                   value={newUserOperation}
//                   onChange={(e) => setNewUserOperation(e.target.value)}
//                   className="flex-1 text-sm"
//                 />
//                 <Button onClick={handleAddUserOperation} className="px-3 py-2">
//                   <PlusCircle className="mr-1 h-4 w-4" />
//                   Add
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </Card>

//         <div className="w-full md:w-1/4 flex flex-col gap-6">
//           <Card className="shadow-md p-3 sticky top-4">
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

//               {finalSelectedUseCases.length > 0 ? (
//                 <div className="border rounded-md p-3 text-sm space-y-2">
//                   {finalSelectedUseCases.map((useCase, index) => (
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
//                         className="h-5 w-5 text-red-500 hover:bg-red-100"
//                         onClick={() => handleRemoveSelectedUseCase(index)}
//                       >
//                         <X className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-500 text-sm">
//                   No operations selected yet.
//                 </p>
//               )}
//               <Link href="/main">
//                 <Button
//                   variant="outline"
//                   className="cursor-pointer p-4 w-full mt-5"
//                 >
//                   Launch Admin Panel
//                 </Button>
//               </Link>
//             </CardContent>
//           </Card>
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

// UI Components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { X, PlusCircle, Check } from "lucide-react";

// Context
import {
  useOperationContext,
  Operation,
  OperationCategory,
} from "@/context/OperationContext";

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
  const [finalSelectedUseCases, setFinalSelectedUseCases] = useState<
    Operation[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const { setSelectedOperations } = useOperationContext();

  // Fetch use cases from API
  const fetchUseCases = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/use_cases"
      );
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

  // Collect and store all selected operations into state
  const handleAddSelectedOperations = () => {
    const selectedUseCases: Operation[] = [];

    (Object.entries(operations) as [OperationCategory, string[]][]).forEach(
      ([category, cases]) => {
        cases.forEach((useCase, index) => {
          if (selectedOperationsMap[`${category}-${index}`]) {
            selectedUseCases.push({ category, text: useCase });
          }
        });
      }
    );

    userOperations.forEach((op, index) => {
      if (selectedOperationsMap[`user-${index}`]) {
        selectedUseCases.push(op);
      }
    });

    setFinalSelectedUseCases(selectedUseCases);
  };

  // Remove operation from selected operations list
  const handleRemoveSelectedUseCase = (indexToRemove: number) => {
    setFinalSelectedUseCases((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  // Navigate to /main and pass selected operations via context
  const handleNavigate = () => {
    setSelectedOperations(finalSelectedUseCases);
    router.push("/main");
  };

  return (
    <div className="container mx-auto p-4 max-h-screen">
      <div className="flex justify-between p-2">
        <h1 className="text-2xl font-semibold mb-4">
          AI Generated UseCases
        </h1>
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

              {finalSelectedUseCases.length > 0 ? (
                <div className="border rounded-md p-3 text-sm space-y-2">
                  {finalSelectedUseCases.map((useCase, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-start gap-2"
                    >
                      <div>
                        <span className="font-medium">
                          {useCase.category}:
                        </span>{" "}
                        <p className="inline">{useCase.text}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 text-red-500 hover:bg-red-100"
                        onClick={() => handleRemoveSelectedUseCase(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">
                  No operations selected yet.
                </p>
              )}

              {/* Navigate Button */}
              <Button
                variant="outline"
                onClick={handleNavigate}
                className="cursor-pointer p-4 w-full mt-5"
              >
                Launch Admin Panel
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CrudOperationsPage;
