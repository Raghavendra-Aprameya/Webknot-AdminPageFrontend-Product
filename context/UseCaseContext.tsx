"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface UseCaseContextType {
  useCase: string;
  setUseCase: (value: string) => void;
}

const UseCaseContext = createContext<UseCaseContextType | null>(null);

export const UseCaseProvider = ({ children }: { children: ReactNode }) => {
  const [useCase, setUseCase] = useState<string>("");

  return (
    <UseCaseContext.Provider value={{ useCase, setUseCase }}>
      {children}
    </UseCaseContext.Provider>
  );
};

export const useUseCase = () => {
  const context = useContext(UseCaseContext);
  if (!context)
    throw new Error("useUseCase must be used within a UseCaseProvider");
  return context;
};
