"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import Chatbot from "@/components/Chatbot";
import UseCaseContainer from "../../components/UseCaseContainer";
import RightContainer from "../../components/RightContainer";

const MainContainer: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    axios
      .get("/example_data.json")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);


  return (
    <div className="flex h-screen p-3 gap-3">
      <div className="w-1/3 flex flex-col gap-3">
        <UseCaseContainer data={data} />
        <Chatbot />
      </div>
      <div className="w-2/3">
        <RightContainer data={data} />
      </div>
    </div>
  );
};

export default MainContainer;
