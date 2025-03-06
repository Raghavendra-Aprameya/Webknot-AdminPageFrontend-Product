// "use client";

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Loader2 } from "lucide-react";
// import { toast } from "sonner";

// interface TableViewProps {
//   tableName: string | null;
// }

// interface TableData {
//   columns: string[];
//   rows: Record<string, any>[];
// }

// export function TableView({ tableName }: TableViewProps) {
//   const [columns, setColumns] = useState<string[]>([]);
//   const [rows, setRows] = useState<Record<string, any>[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchTableData = async () => {
//       if (!tableName) {
//         setIsLoading(false);
//         return;
//       }

//       setIsLoading(true);
//       try {
//         const response = await axios.get<TableData>(
//           `http://localhost:8080/api/v1/db/fetch-columns/{tableName}`
//         );
//         setColumns(response.data.columns || []);
//         setRows(response.data.rows || []);
//         setIsLoading(false);

//         toast.success("Table Data Loaded", {
//           description: `Loaded data for ${tableName}`,
//         });
//       } catch (error: any) {
//         setIsLoading(false);
//         toast.error("Failed to Load Table Data", {
//           description:
//             error.response?.data?.message || "Unable to fetch table data",
//         });
//         console.error("Table data fetching error:", error);
//       }
//     };

//     fetchTableData();
//   }, [tableName]);

//   if (!tableName) {
//     return (
//       <div className="p-6 text-center text-gray-500">
//         Select a table from the sidebar to view data
//       </div>
//     );
//   }

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <Loader2 className="mr-2 h-6 w-6 animate-spin" />
//         <span>Loading table data...</span>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">{tableName}</h2>

//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               {columns.map((column, index) => (
//                 <th
//                   key={index}
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   {column}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {rows.map((row, rowIndex) => (
//               <tr key={rowIndex}>
//                 {columns.map((column, colIndex) => (
//                   <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
//                     {row[column] !== undefined ? String(row[column]) : "NULL"}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {rows.length === 0 && (
//         <div className="text-center py-8 text-gray-500">
//           No data found in this table
//         </div>
//       )}
//     </div>
//   );
// }

// export default TableView;



import React, { useEffect, useState } from "react";
import axios from "axios";

interface TableViewProps {
  tableName: string;
}

export default function TableView({ tableName }: TableViewProps) {
  const [tableData, setTableData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/db/tables/${tableName}`);
        setTableData(response.data);
        setIsLoading(false);
      } catch (error: any) {
        console.error("Failed to fetch table data:", error);
        setIsLoading(false);
      }
    };

    fetchTableData();
  }, [tableName]);

  if (isLoading) {
    return <div>Loading table data...</div>;
  }

  return (
    <div>
      <h1 className="text-xl font-semibold">{tableName} Data</h1>
      <table className="min-w-full mt-4 border-collapse">
        <thead>
          <tr>
            {tableData.length > 0 && Object.keys(tableData[0]).map((key) => (
              <th key={key} className="px-4 py-2 border">{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, i) => (
                <td key={i} className="px-4 py-2 border">{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

