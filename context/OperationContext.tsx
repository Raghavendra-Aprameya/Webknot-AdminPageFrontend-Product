"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the types
export type OperationCategory =
  | "Create"
  | "Read"
  | "Update"
  | "Delete"
  | "User";

export interface Operation {
  text: string;
  category: OperationCategory;
}

// Context State Interface - remove useCases from context
interface OperationContextType {
  selectedOperations: Operation[];
  setSelectedOperations: (operations: Operation[]) => void;
}

// Create the Context with default values
const OperationContext = createContext<OperationContextType>({
  selectedOperations: [],
  setSelectedOperations: () => {},
});

// Provider component
export const OperationProvider = ({ children }: { children: ReactNode }) => {
  const [selectedOperations, setSelectedOperations] = useState<Operation[]>([]);

  return (
    <OperationContext.Provider
      value={{
        selectedOperations,
        setSelectedOperations,
      }}
    >
      {children}
    </OperationContext.Provider>
  );
};

// Custom hook to use context easily
export const useOperationContext = () => useContext(OperationContext);
