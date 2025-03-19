// "use client";

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { X, PlusCircle, Check } from "lucide-react";
// import { useOperationContext } from "@/context/OperationContext";
// import { useDbContext } from "@/context/DbContext";
// import { toast } from "sonner";

// interface ApiOperation {
//   use_case_id: string;
//   use_case: string;
//   query: string;
//   user_input_columns: string[];
// }

// const CrudOperationsPage: React.FC = () => {
//   const router = useRouter();
//   const { dbConnected } = useDbContext();
//   const {
//     selectedOperations,
//     setSelectedOperations,
//     finalSelectedUsecase,
//     setFinalSelectedUsecase,
//   } = useOperationContext();

//   const [operations, setOperations] = useState<Record<string, ApiOperation[]>>({
//     Create: [],
//     Read: [],
//     Update: [],
//     Delete: [],
//   });
//   const [userOperations, setUserOperations] = useState<ApiOperation[]>([]);
//   const [newUserOperation, setNewUserOperation] = useState("");
//   const [selectedMap, setSelectedMap] = useState<Record<string, boolean>>({});
//   const [loading, setLoading] = useState(false);

//   const fetchUseCases = async () => {
//     if (!dbConnected) return;

//     setLoading(true);
//     try {
//       const response = await axios.get("/example_data.json");
//       const { use_cases_result } = response.data.data;

//       setOperations({
//         Create: use_cases_result?.create || [],
//         Read: use_cases_result?.read || [],
//         Update: use_cases_result?.update || [],
//         Delete: use_cases_result?.delete || [],
//       });
//     } catch (error) {
//       console.error("Failed to fetch use cases:", error);
//       toast.error("Failed to load use cases");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUseCases();
//   }, [dbConnected]);

//   const handleAddSelected = () => {
//     const allOperations = [
//       ...operations.Create,
//       ...operations.Read,
//       ...operations.Update,
//       ...operations.Delete,
//       ...userOperations,
//     ];

//     const selected = allOperations.filter(
//       (_, index) => selectedMap[`op-${index}`]
//     );

//     const newSelections = selected.filter(
//       (newOp) =>
//         !selectedOperations.some(
//           (existingOp) => existingOp.use_case_id === newOp.use_case_id
//         )
//     );

//     setSelectedOperations([...selectedOperations, ...newSelections]);
//     setFinalSelectedUsecase([...finalSelectedUsecase, ...newSelections]);
//     setSelectedMap({});
//   };

//   const handleAddUserOperation = async () => {
//     if (!newUserOperation.trim()) return;

//     try {
//       const toastId = toast.loading("Validating use case...");
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/v1/execute_use_case",
//         {
//           use_case: newUserOperation.trim(),
//         }
//       );

//       const { valid, data } = response.data;
//       toast.dismiss(toastId);

//       if (valid) {
//         const newOp = {
//           ...data,
//           use_case_id: crypto.randomUUID(),
//         };
//         setUserOperations((prev) => [...prev, newOp]);
//         toast.success("Use case added!");
//       } else {
//         toast.error("Invalid use case");
//       }
//     } catch (error) {
//       toast.error("Validation failed");
//       console.error("Validation error:", error);
//     }
//     setNewUserOperation("");
//   };

//   const handleRemoveOperation = (id: string) => {
//     const filtered = selectedOperations.filter((op) => op.use_case_id !== id);
//     setSelectedOperations(filtered);
//     setFinalSelectedUsecase(filtered);
//   };

//   return (
//     <div className="container mx-auto p-4 max-h-screen">
//       <div className="flex flex-col md:flex-row gap-4">
//         {/* Left Panel */}
//         <Card className="flex-1 p-3 space-y-6">
//           <div className="flex justify-between items-center border-b pb-4">
//             <h1 className="text-xl font-semibold">AI Generated Use Cases</h1>
//             <Button onClick={fetchUseCases} disabled={loading}>
//               {loading ? "Refreshing..." : "Refresh"}
//             </Button>
//           </div>

//           {dbConnected ? (
//             <>
//               {Object.entries(operations).map(([category, ops]) => (
//                 <section key={category}>
//                   <h2 className="text-lg font-medium mb-2">
//                     {category} Operations
//                   </h2>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
//                     {ops.map((op, index) => (
//                       <Card key={op.use_case_id} className="p-2">
//                         <CardContent className="flex items-center gap-2 p-2">
//                           <Checkbox
//                             checked={selectedMap[`op-${index}`] || false}
//                             onCheckedChange={(checked: boolean) =>
//                               setSelectedMap((prev) => ({
//                                 ...prev,
//                                 [`op-${index}`]: checked,
//                               }))
//                             }
//                           />
//                           <span className="text-sm">{op.use_case}</span>
//                         </CardContent>
//                       </Card>
//                     ))}
//                   </div>
//                 </section>
//               ))}

//               <section>
//                 <h2 className="text-lg font-medium mb-2">Custom Operations</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
//                   {userOperations.map((op, index) => (
//                     <Card key={op.use_case_id} className="p-2">
//                       <CardContent className="flex items-center gap-2 p-2">
//                         <Checkbox
//                           checked={selectedMap[`user-${index}`] || false}
//                           onCheckedChange={(checked: boolean) =>
//                             setSelectedMap((prev) => ({
//                               ...prev,
//                               [`user-${index}`]: checked,
//                             }))
//                           }
//                         />
//                         <span className="text-sm">{op.use_case}</span>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               </section>

//               <Card>
//                 <CardHeader>
//                   <CardTitle className="text-lg">
//                     Add Custom Operation
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex gap-2">
//                     <Input
//                       value={newUserOperation}
//                       onChange={(e) => setNewUserOperation(e.target.value)}
//                       placeholder="Describe your operation..."
//                     />
//                     <Button onClick={handleAddUserOperation}>
//                       <PlusCircle className="mr-2 h-4 w-4" />
//                       Add
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             </>
//           ) : (
//             <div className="text-center p-8 border-2 border-dashed">
//               <h2 className="text-xl font-semibold mb-4">
//                 Connect Database First
//               </h2>
//               <Button disabled>Connect Database</Button>
//             </div>
//           )}
//         </Card>

//         {/* Right Panel */}
//         <div className="w-full md:w-1/3 space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-lg">Selected Operations</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <Button className="w-full" onClick={handleAddSelected}>
//                 <Check className="mr-2 h-4 w-4" />
//                 Confirm Selection
//               </Button>

//               <div className="space-y-2">
//                 {selectedOperations.map((op) => (
//                   <div
//                     key={op.use_case_id}
//                     className="flex justify-between items-center p-2 border rounded"
//                   >
//                     <span className="text-sm">{op.use_case}</span>
//                     <X
//                       className="h-4 w-4 cursor-pointer text-red-500"
//                       onClick={() => handleRemoveOperation(op.use_case_id)}
//                     />
//                   </div>
//                 ))}
//               </div>

//               {selectedOperations.length > 0 && (
//                 <Button className="w-full" onClick={() => router.push("/main")}>
//                   Launch Dashboard
//                 </Button>
//               )}
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { X, PlusCircle, Check } from "lucide-react";
import { useOperationContext } from "@/context/OperationContext";
import { useDbContext } from "@/context/DbContext";
import { toast } from "sonner";

interface ApiOperation {
  use_case_id: string;
  use_case: string;
  query: string;
  user_input_columns: string[];
}

const CrudOperationsPage: React.FC = () => {
  const router = useRouter();
  const { dbConnected } = useDbContext();
  const {
    selectedOperations,
    setSelectedOperations,
    finalSelectedUsecase,
    setFinalSelectedUsecase,
  } = useOperationContext();

  const [operations, setOperations] = useState<Record<string, ApiOperation[]>>({
    Create: [],
    Read: [],
    Update: [],
    Delete: [],
  });
  const [userOperations, setUserOperations] = useState<ApiOperation[]>([]);
  const [newUserOperation, setNewUserOperation] = useState("");
  const [selectedMap, setSelectedMap] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  const fetchUseCases = async () => {
    if (!dbConnected) return;

    setLoading(true);
    try {
      const response = await axios.get("/example_data.json");
      const { use_cases_result } = response.data.data;

      setOperations({
        Create: use_cases_result?.create || [],
        Read: use_cases_result?.read || [],
        Update: use_cases_result?.update || [],
        Delete: use_cases_result?.delete || [],
      });
    } catch (error) {
      console.error("Failed to fetch use cases:", error);
      toast.error("Failed to load use cases");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUseCases();
  }, [dbConnected]);

  const toggleSelection = (id: string) => {
    setSelectedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddSelected = () => {
    const allOperations = [
      ...operations.Create,
      ...operations.Read,
      ...operations.Update,
      ...operations.Delete,
      ...userOperations,
    ];

    const selected = allOperations.filter((op) => selectedMap[op.use_case_id]);
    const newSelections = selected.filter(
      (newOp) =>
        !selectedOperations.some(
          (existingOp) => existingOp.use_case_id === newOp.use_case_id
        )
    );

    setSelectedOperations([...selectedOperations, ...newSelections]);
    setFinalSelectedUsecase([...finalSelectedUsecase, ...newSelections]);
    setSelectedMap({});
  };

  const handleAddUserOperation = async () => {
    if (!newUserOperation.trim()) return;

    try {
      const toastId = toast.loading("Validating use case...");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/execute_use_case",
        {
          use_case: newUserOperation.trim(),
        }
      );

      const { valid, data } = response.data;
      toast.dismiss(toastId);

      if (valid) {
        const newOp = {
          ...data,
          use_case_id: crypto.randomUUID(),
        };
        setUserOperations((prev) => [...prev, newOp]);
        toast.success("Use case added!");
      } else {
        toast.error("Invalid use case");
      }
    } catch (error) {
      toast.error("Validation failed");
      console.error("Validation error:", error);
    }
    setNewUserOperation("");
  };

  const handleRemoveOperation = (id: string) => {
    const filtered = selectedOperations.filter((op) => op.use_case_id !== id);
    setSelectedOperations(filtered);
    setFinalSelectedUsecase(filtered);
  };

  return (
    <div className="container mx-auto p-4 max-h-screen">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Panel */}
        <Card className="flex-1 p-3 space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h1 className="text-xl font-semibold">AI Generated Use Cases</h1>
            <Button onClick={fetchUseCases} disabled={loading}>
              {loading ? "Refreshing..." : "Refresh"}
            </Button>
          </div>

          {dbConnected ? (
            <>
              {Object.entries(operations).map(([category, ops]) => (
                <section key={category}>
                  <h2 className="text-lg font-medium mb-2">
                    {category} Operations
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {ops.map((op) => (
                      <Card
                        key={op.use_case_id}
                        className={`p-2 transition-all cursor-pointer hover:bg-accent/50 ${
                          selectedMap[op.use_case_id]
                            ? "border-primary bg-accent/30"
                            : ""
                        }`}
                        onClick={() => toggleSelection(op.use_case_id)}
                      >
                        <CardContent className="flex items-center gap-2 p-2">
                          <Checkbox
                            checked={selectedMap[op.use_case_id] || false}
                            onCheckedChange={(checked: boolean) => {
                              setSelectedMap((prev) => ({
                                ...prev,
                                [op.use_case_id]: checked,
                              }));
                            }}
                          />
                          <span className="text-sm">{op.use_case}</span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              ))}

              <section>
                <h2 className="text-lg font-medium mb-2">Custom Operations</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {userOperations.map((op) => (
                    <Card
                      key={op.use_case_id}
                      className={`p-2 transition-all cursor-pointer hover:bg-accent/50 ${
                        selectedMap[op.use_case_id]
                          ? "border-primary bg-accent/30"
                          : ""
                      }`}
                      onClick={() => toggleSelection(op.use_case_id)}
                    >
                      <CardContent className="flex items-center gap-2 p-2">
                        <Checkbox
                          checked={selectedMap[op.use_case_id] || false}
                          onCheckedChange={(checked: boolean) => {
                            setSelectedMap((prev) => ({
                              ...prev,
                              [op.use_case_id]: checked,
                            }));
                          }}
                        />
                        <span className="text-sm">{op.use_case}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Add Custom Operation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Input
                      value={newUserOperation}
                      onChange={(e) => setNewUserOperation(e.target.value)}
                      placeholder="Describe your operation..."
                    />
                    <Button onClick={handleAddUserOperation}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="text-center p-8 border-2 border-dashed">
              <h2 className="text-xl font-semibold mb-4">
                Connect Database First
              </h2>
              <Button disabled>Connect Database</Button>
            </div>
          )}
        </Card>

        {/* Right Panel */}
        <div className="w-full md:w-1/3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Selected Operations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" onClick={handleAddSelected}>
                <Check className="mr-2 h-4 w-4" />
                Confirm Selection
              </Button>

              <div className="space-y-2">
                {selectedOperations.map((op) => (
                  <div
                    key={op.use_case_id}
                    className="flex justify-between items-center p-2 border rounded hover:bg-accent/30 transition-colors"
                  >
                    <span className="text-sm">{op.use_case}</span>
                    <X
                      className="h-4 w-4 cursor-pointer text-red-500"
                      onClick={() => handleRemoveOperation(op.use_case_id)}
                    />
                  </div>
                ))}
              </div>

              {selectedOperations.length > 0 && (
                <Button className="w-full" onClick={() => router.push("/main")}>
                  Launch Dashboard
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CrudOperationsPage;