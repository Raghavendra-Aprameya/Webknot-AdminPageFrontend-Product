// "use client";

// import React, { createContext, useContext, useState, ReactNode } from "react";

// // Define the types
// export type OperationCategory =
//   | "Create"
//   | "Read"
//   | "Update"
//   | "Delete"
//   | "User";

// export interface Operation {
//   text: string;
//   category: OperationCategory;
// }

// // Context State Interface - remove useCases from context
// interface OperationContextType {
//   selectedOperations: Operation[];
//   setSelectedOperations: (operations: Operation[]) => void;
// }

// // Create the Context with default values
// const OperationContext = createContext<OperationContextType>({
//   selectedOperations: [],
//   setSelectedOperations: () => {},
// });

// // Provider component
// export const OperationProvider = ({ children }: { children: ReactNode }) => {
//   const [selectedOperations, setSelectedOperations] = useState<Operation[]>([]);

//   return (
//     <OperationContext.Provider
//       value={{
//         selectedOperations,
//         setSelectedOperations,
//       }}
//     >
//       {children}
//     </OperationContext.Provider>
//   );
// };

// // Custom hook to use context easily
// export const useOperationContext = () => useContext(OperationContext);






"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type OperationCategory =
  | "Create"
  | "Read"
  | "Update"
  | "Delete"
  | "User";

export interface Operation {
  use_case_id: string;
  use_case: string;
  query: string;
  user_input_columns: string[];
  category: OperationCategory;
}

interface OperationContextType {
  selectedOperations: Operation[];
  setSelectedOperations: (operations: Operation[]) => void;
}

const OperationContext = createContext<OperationContextType | undefined>(
  undefined
);

export const OperationProvider = ({ children }: { children: ReactNode }) => {
  const [selectedOperations, setSelectedOperations] = useState<Operation[]>([]);

  return (
    <OperationContext.Provider
      value={{ selectedOperations, setSelectedOperations }}
    >
      {children}
    </OperationContext.Provider>
  );
};

export const useOperationContext = () => {
  const context = useContext(OperationContext);
  if (!context) {
    throw new Error(
      "useOperationContext must be used within an OperationProvider"
    );
  }
  return context;
};