import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface UseCaseContainerProps {
  data: any;
}

const UseCaseContainer: React.FC<UseCaseContainerProps> = ({ data }) => {
  return (
    <Card className="p-2 shadow-md h-1/2">
      <CardContent>
        <p className="text-lg font-semibold">AI Generated Use Case</p>
        <div className="mt-2 text-gray-600 text-sm">
          {data?.useCase || "Loading use case..."}
        </div>
      </CardContent>
    </Card>
  );
};

export default UseCaseContainer;
