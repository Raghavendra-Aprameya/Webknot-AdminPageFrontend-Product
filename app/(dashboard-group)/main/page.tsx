"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Chatbot from "@/components/Chatbot";
import UseCaseContainer from "../../../components/UseCaseContainer";
import RightContainer from "../../../components/RightContainer";
import { UseCaseData } from "../../../types/user";


const MainContainer: React.FC = () => {
  const [data, setData] = useState<any>({});

  const [useCaseData, setUseCaseData] = useState<UseCaseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedUseCase, setSelectedUseCase] = useState(null);

  const handleSelectUseCase = async (useCase: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/use_case/${useCase}`
      );

      setUseCaseData(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/use_cases")
      .then((response) =>{ setData(response.data.use_cases);

      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-xl m-2">
      <div className="flex h-screen p-3 gap-3">
        <div className="w-1/3 flex flex-col gap-3">
          <UseCaseContainer data={data} onSelectUseCase={handleSelectUseCase} />
          <Chatbot />
        </div>
        <div className="w-2/3">
          <RightContainer data={data} useCaseData={useCaseData} />
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
