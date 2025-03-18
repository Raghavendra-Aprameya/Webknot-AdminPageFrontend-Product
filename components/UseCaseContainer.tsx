// "use client";

// import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { useOperationContext } from "@/context/OperationContext";

// const UseCaseContainer: React.FC<{
//   onSelectUseCase: (useCase: string) => void;
// }> = ({ onSelectUseCase }) => {
//   const { selectedOperations } = useOperationContext(); // Get selected operations from context

//   // Extract just the text from each operation object
//   const selectedUseCases = selectedOperations.map(
//     (operation) => operation.text
//   );

//   return (
//     <Card className="p-2 shadow-md h-1/2 flex flex-col">
//       <CardContent className="flex flex-col h-full">
//         <p className="text-lg font-semibold mb-2">Selected Use Cases</p>

//         <div className="overflow-y-auto pr-2 flex-1 max-h-64 thin-scrollbar">
//           {selectedUseCases && selectedUseCases.length > 0 ? (
//             <ul className="space-y-0">
//               {selectedUseCases.map((useCase: string, index: number) => (
//                 <li
//                   key={index}
//                   className="cursor-pointer py-2 px-1 hover:bg-gray-100 transition-colors border-b last:border-none"
//                   onClick={() => onSelectUseCase(useCase)} // Selecting a use case
//                 >
//                   <span className="text-sm text-gray-800">{useCase}</span>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-500 text-sm">
//               No selected use cases available.
//             </p>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default UseCaseContainer;



"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useOperationContext } from "@/context/OperationContext";
import { useUseCase } from "@/context/UseCaseContext"; // Import the useUseCase hook

const UseCaseContainer: React.FC<{
  onSelectUseCase: (useCase: string) => void;
}> = ({ onSelectUseCase }) => {
  const { selectedOperations } = useOperationContext(); // Get selected operations from context
  const { setUseCase } = useUseCase(); // Get the setUseCase function from the context

  // Extract just the text from each operation object
  const selectedUseCases = selectedOperations.map(
    (operation) => operation.text
  );

  const handleUseCaseClick = (useCase: string) => {
    // Update the context with the clicked use case
    setUseCase(useCase);
    onSelectUseCase(useCase); // Optionally call onSelectUseCase if needed
  };

  return (
    <Card className="p-2 shadow-md h-1/2 flex flex-col">
      <CardContent className="flex flex-col h-full">
        <p className="text-lg font-semibold mb-2">Selected Use Cases</p>

        <div className="overflow-y-auto pr-2 flex-1 max-h-64 thin-scrollbar">
          {selectedUseCases && selectedUseCases.length > 0 ? (
            <ul className="space-y-0">
              {selectedUseCases.map((useCase: string, index: number) => (
                <li
                  key={index}
                  className="cursor-pointer py-2 px-1 hover:bg-gray-100 transition-colors border-b last:border-none"
                  onClick={() => handleUseCaseClick(useCase)} // Handle use case click
                >
                  <span className="text-sm text-gray-800">{useCase}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">
              No selected use cases available.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UseCaseContainer;
