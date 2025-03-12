"use client";

import MainSidebar from "../../components/MainSidebar";
import { Card } from "../../components/ui/card";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-100">
        <Card className="p-2 shadow-md h-1/2 flex flex-row">
        <MainSidebar />
        <div className="flex-1 p-1">
            <main className="flex-1 p-1">{children}</main>
        </div>
        </Card>
    </div>
  );
}
