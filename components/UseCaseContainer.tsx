"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { UseCaseData } from "../types/user";

interface UseCaseContainerProps {
  data: any;
  onSelectUseCase: any;
}

const UseCaseContainer: React.FC<UseCaseContainerProps> = ({
  data,
  onSelectUseCase,
}) => {
  const [useCaseData, setUseCaseData] = useState<UseCaseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUseCaseDetails = async (selectedUseCase: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/use_case/${selectedUseCase}`
      );

      setUseCaseData(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-2 shadow-md h-1/2 flex flex-col">
      <CardContent className="flex flex-col h-full">
        <p className="text-lg font-semibold mb-2">AI Generated Use Case</p>

        {/* Scrollable list */}
        <div className="overflow-y-auto pr-2 flex-1 max-h-64">
          {data && data.length > 0 ? (
            <ul className="space-y-0">
              {data.map((useCase: string, index: number) => (
                <li
                  key={index}
                  className="cursor-pointer py-2 px-1 hover:bg-gray-100 transition-colors border-b last:border-none"
                  onClick={() => {
                    onSelectUseCase(useCase);
                  }}
                >
                  <span className="text-sm text-gray-800">{useCase}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Loading use cases...</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UseCaseContainer;
