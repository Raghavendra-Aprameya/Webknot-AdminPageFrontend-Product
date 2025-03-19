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
  finalSelectedUsecase: Operation[]; // Add finalSelectedUsecase
  setFinalSelectedUsecase: (usecases: Operation[]) => void; // Setter function
}

const OperationContext = createContext<OperationContextType | undefined>(
  undefined
);

export const OperationProvider = ({ children }: { children: ReactNode }) => {
  const [selectedOperations, setSelectedOperations] = useState<Operation[]>([]);
  const [finalSelectedUsecase, setFinalSelectedUsecase] = useState<Operation[]>(
    []
  ); // Initialize state

  return (
    <OperationContext.Provider
      value={{
        selectedOperations,
        setSelectedOperations,
        finalSelectedUsecase, // Provide it in context
        setFinalSelectedUsecase, // Provide setter function
      }}
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
