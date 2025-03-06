"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Settings, Bell } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [currentDate, setCurrentDate] = useState("");
  
  useEffect(() => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDate(date.toLocaleDateString('en-US', options));
  }, []);

  return (
    <div className="flex items-center justify-between w-full px-6 py-3 bg-white shadow-sm z-10">
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold">Hi, Anna!</h1>
        <p className="text-sm text-gray-500">{currentDate}</p>
      </div>

      <div className="flex items-center max-w-md w-full relative mx-4">
        <Search className="absolute left-3 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Find Something"
          className="pl-10 pr-12 w-full rounded-full border border-gray-300"
        />
        <kbd className="absolute right-3 text-gray-400 text-xs bg-gray-100 px-2 py-1 rounded">
          ⌘
        </kbd>
      </div>

      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon" className="hidden sm:flex">
          <Settings className="w-5 h-5 text-gray-600" />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5 text-gray-600" />
        </Button>
        <Button className="bg-black text-white px-4 py-2 rounded-lg">
          Optimize
        </Button>
      </div>
    </div>
  );
}
