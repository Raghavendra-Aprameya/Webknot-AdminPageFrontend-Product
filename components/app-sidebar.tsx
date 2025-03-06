import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { Table, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  onTableSelect?: (tableName: string) => void;
}

export function AppSidebar({ onTableSelect }: AppSidebarProps) {
  const [tableNames, setTableNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get<string[]>(
          "http://localhost:8080/api/v1/db/fetch-tables"
        );
        setTableNames(response.data);
        setIsLoading(false);
        toast.success("Tables Loaded", {
          description: `Loaded ${response.data.length} tables`,
        });
      } catch (error: any) {
        setIsLoading(false);
        toast.error("Failed to Load Tables", {
          description:
            error.response?.data?.message || "Unable to fetch tables",
        });
        console.error("Table fetching error:", error);
      }
    };

    fetchTables();
  }, []);

  const handleTableClick = (tableName: string) => {
    router.push(`/dashboard/${tableName}`);
    if (onTableSelect) onTableSelect(tableName);
  };

  return (
    <Sidebar className="shadow-md min-h-screen border-r border-slate-200 bg-white">
      <SidebarContent className="bg-white">
        {/* Sidebar Header with Logo */}
        <SidebarHeader className="bg-white flex flex-col items-center py-6 border-b border-slate-100 shadow-sm h-[93px]">
  <Image src="/logo.png" alt="Brand Logo" width={180} height={10} />
</SidebarHeader>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-slate-700 font-semibold text-xs uppercase tracking-wider mt-4">
            Database Tables
          </SidebarGroupLabel>

          <SidebarGroupContent>
            {isLoading ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="mr-2 h-5 w-5 animate-spin text-indigo-600" />
                <span className="text-slate-600 text-sm">Loading Tables...</span>
              </div>
            ) : (
              <SidebarMenu>
                {tableNames.length === 0 ? (
                  <div className="p-4 text-sm text-slate-500">No tables found</div>
                ) : (
                  tableNames.map((table) => (
                    <SidebarMenuItem key={table}>
                      <div
                        onClick={() => handleTableClick(table)}
                        className="flex items-center px-4 py-3 text-slate-700 font-medium hover:bg-slate-100 rounded-lg w-full cursor-pointer transition-all duration-200"
                      >
                        <Table className="mr-3 h-5 w-5 text-black" />
                        <span>{table}</span>
                      </div>
                    </SidebarMenuItem>
                  ))
                )}
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;