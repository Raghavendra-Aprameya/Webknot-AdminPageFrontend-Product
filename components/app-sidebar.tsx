"use client"

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, Home, Inbox, Search, Settings, Table } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Static menu items
const staticItems = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const [tableName, setTableName] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get("/api/database/tables");

        setTableName(response.data);
        setIsLoading(false);

        toast.success("Tables Loaded", {
          description: `Loaded ${response.data.length} tables`,
        });
      } catch (error : any) {
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


  const handleTableClick = (tableName : string) => {
    router.push(`/tables/${tableName}`);
  };

  return (
    <Sidebar>
      <SidebarContent>
        {/* Static Menu Group */}
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
                {tableName.length === 0 ? (
                  <div className="p-4 text-sm text-gray-500">
                    No tables found
                  </div>
                ) : (
                  tableName.map((table) => (
                    <SidebarMenuItem key={table}>
                      <SidebarMenuButton asChild
                        onClick={() => handleTableClick(table)}
                        className="cursor-pointer"
                      >
                        <Table className="mr-2 h-4 w-4" />
                        <span>{table}</span>
                      </SidebarMenuButton>
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
