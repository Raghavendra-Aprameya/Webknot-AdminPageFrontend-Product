import React from "react";

interface RightContainerProps {
  data: any;
}

const RightContainer: React.FC<RightContainerProps> = ({ data }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md h-full">
      <p className="text-md font-semibold mb-2">Dynamic UI Container</p>
      <table className="min-w-full border-collapse rounded-md overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 border-b border-slate-200 text-left text-sm font-semibold text-slate-700">
              ID
            </th>
            <th className="px-6 py-3 border-b border-slate-200 text-left text-sm font-semibold text-slate-700">
              Title
            </th>
            <th className="px-6 py-3 border-b border-slate-200 text-left text-sm font-semibold text-slate-700">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data?.tableData?.map((item: any, index: number) => (
            <tr
              key={index}
              className="hover:bg-slate-50 transition-all duration-200"
            >
              <td className="px-6 py-4 text-sm text-slate-700 border-b border-slate-100">
                {item.id}
              </td>
              <td className="px-6 py-4 text-sm text-slate-700 border-b border-slate-100">
                {item.title}
              </td>
              <td className="px-6 py-4 text-sm text-slate-700 border-b border-slate-100">
                {item.description}
              </td>
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
