"use client"

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";

interface UseCaseContainerProps {
  data: any;
}

interface UseCaseData {
  use_case: string;
  query: string;
  user_input_columns: string[];
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
    <Card className="p-2 shadow-md h-1/2">
      <CardContent>
        <p className="text-lg font-semibold">AI Generated Use Case</p>
        <div className="mt-2 text-gray-600 text-sm overflow-y-auto flex-1 pr-2">
          {data && data.length > 0 ? (
            <ul className="list-disc list-inside space-y-1">
              {data.map((useCase, index) => (
                <li
                  className="cursor-pointer"
                  key={index}
                  onClick={() => {
                    onSelectUseCase(useCase);
                  }}
                >
                  {useCase}
                </li>
              ))}
            </ul>
          ) : (
            "Loading use cases..."
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UseCaseContainer;
