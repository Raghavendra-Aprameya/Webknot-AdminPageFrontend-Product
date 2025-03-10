import React from "react";

interface RightContainerProps {
  data: any;
}

const RightContainer: React.FC<RightContainerProps> = ({ data }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md h-full">
      <p className="text-md font-semibold mb-2">Dynamic UI Container</p>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-1">ID</th>
            <th className="border border-gray-300 p-1">Title</th>
            <th className="border border-gray-300 p-1">Description</th>
          </tr>
        </thead>
        <tbody>
          {data?.tableData?.map((item: any, index: number) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 p-1">{item.id}</td>
              <td className="border border-gray-300 p-1">{item.title}</td>
              <td className="border border-gray-300 p-1">{item.description}</td>
            </tr>
          )) || (
            <tr>
              <td
                colSpan={3}
                className="border border-gray-300 p-2 text-center text-gray-500"
              >
                Loading data...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RightContainer;
