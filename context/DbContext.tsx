"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface DbContextType {
  successMessage: string;
  setSuccessMessage: (message: string) => void;
}

const DbContext = createContext<DbContextType | undefined>(undefined);

export const DbProvider = ({ children }: { children: ReactNode }) => {
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <DbContext.Provider value={{ successMessage, setSuccessMessage }}>
      {children}
    </DbContext.Provider>
  );
};

export const useDbContext = () => {
  const context = useContext(DbContext);
  if (!context) {
    throw new Error("useDbContext must be used within a DbProvider");
  }
  return context;
};
