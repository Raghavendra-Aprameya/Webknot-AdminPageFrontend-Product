import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, Home, Settings, Table } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; 


const staticItems = [
  { title: "Home", url: "#", icon: Home },
  { title: "Calendar", url: "#", icon: Calendar },
  { title: "Settings", url: "#", icon: Settings },
];

interface StaticMenuItem {
  title: string;
  url: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

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
        const response = await axios.get<string[]>("http://localhost:8080/api/v1/db/fetch-tables");
        setTableNames(response.data);
        setIsLoading(false);
        toast.success("Tables Loaded", {
          description: `Loaded ${response.data.length} tables`,
        });
      } catch (error: any) {
        setIsLoading(false);
        toast.error("Failed to Load Tables", {
          description: error.response?.data?.message || "Unable to fetch tables",
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
    <Sidebar>
      <SidebarContent>
        <SidebarHeader className="flex flex-row items-center gap-3 p-4 border-b">
          <img src="/logo.png" alt="Brand Logo" className="h-10 w-auto" />
          <h1 className="text-lg font-medium">Brand Name</h1>
        </SidebarHeader>

        {/* Static Menu Group */}
        {/* just for sample for now */}
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {staticItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Dynamic Tables Group */}
        <SidebarGroup>
          <SidebarGroupLabel>Database Tables</SidebarGroupLabel>
          <SidebarGroupContent>
            {isLoading ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Loading Tables...</span>
              </div>
            ) : (
              <SidebarMenu>
                {tableNames.length === 0 ? (
                  <div className="p-4 text-sm text-gray-500">No tables found</div>
                ) : (
                  tableNames.map((table) => (
                    <SidebarMenuItem key={table}>
                      <div onClick={() => handleTableClick(table)} className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-md w-full cursor-pointer">
                        <Table className="mr-2 h-4 w-4" />
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
