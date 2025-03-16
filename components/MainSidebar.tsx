"use client";

import { usePathname } from "next/navigation";
import {
  Home,
  BarChart,
  Users,
  Settings,
  Database,
  LayoutDashboard,
  UserRoundPen,
  House,
  ListOrdered,
  ListCollapse,
  List,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Cable } from 'lucide-react';
import { GalleryHorizontalEnd } from 'lucide-react';

export default function MainSidebar() {
  const pathname = usePathname();

  return (
    <div className="pl-4 w-18 min-h-screen bg-gray-100 text-black flex flex-col justify-between items-center p-1 pt-8 pb-7">
      <div className="flex items-center justify-center mb-6">
        <Image src="/logo.svg" alt="" width={40} height={40} />
      </div>

      <nav className="flex flex-col justify-center space-y-4 mb-55">
        <ul>
          <li
            className={`group w-12 h-12 flex items-center justify-center border-0 rounded-md transition-colors 
              ${pathname === "/home" ? "bg-black text-white" : "hover:bg-black"}
            `}
          >
            <Link href="/home">
              <House
                className={`${
                  pathname === "/home"
                    ? "text-white"
                    : "text-black group-hover:text-white"
                }`}
              />
            </Link>
          </li>
          <li
            className={`group w-12 h-12 flex items-center justify-center border-0 rounded-md transition-colors 
              ${
                pathname === "/dbconnect"
                  ? "bg-black text-white"
                  : "hover:bg-black"
              }
            `}
          >
            <Link href="/dbconnect">
              <Cable
                className={`${
                  pathname === "/dbconnect"
                    ? "text-white"
                    : "text-black group-hover:text-white"
                }`}
              />
            </Link>
          </li>
          <li
            className={`group w-12 h-12 flex items-center justify-center border-0 rounded-md transition-colors 
              ${
                pathname === "/usecase"
                  ? "bg-black text-white"
                  : "hover:bg-black"
              }
            `}
          >
            <Link href="/usecase">
              <GalleryHorizontalEnd
                className={`${
                  pathname === "/usecase"
                    ? "text-white"
                    : "text-black group-hover:text-white"
                }`}
              />
              
            </Link>
          </li>
          <li
            className={`group w-12 h-12 flex items-center justify-center border-0 rounded-md transition-colors 
              ${pathname === "/main" ? "bg-black text-white" : "hover:bg-black"}
            `}
          >
            <Link href="/main">
              <LayoutDashboard
                className={`${
                  pathname === "/main"
                    ? "text-white"
                    : "text-black group-hover:text-white"
                }`}
              />
            </Link>
          </li>
          <li
            className={`group w-12 h-12 flex items-center justify-center border-0 rounded-md transition-colors 
              ${
                pathname === "/dashboard"
                  ? "bg-black text-white"
                  : "hover:bg-black"
              }
            `}
          >
            <Link href="/dashboard">
              <Database
                className={`${
                  pathname === "/dashboard"
                    ? "text-white"
                    : "text-black group-hover:text-white"
                }`}
              />
            </Link>
          </li>
        </ul>
      </nav>

      <div className="flex flex-col justify-center space-y-4">
        <ul>
          <li
            className={`group w-12 h-12 flex items-center justify-center border-0 rounded-md transition-colors 
              ${
                pathname === "/settings"
                  ? "bg-black text-white"
                  : "hover:bg-black"
              }
            `}
          >
            <Link href="/settings">
              <Settings
                strokeWidth={3}
                className={`${
                  pathname === "/settings"
                    ? "text-white"
                    : "text-black group-hover:text-white"
                }`}
              />
            </Link>
          </li>
          <li
            className={`group w-12 h-12 flex items-center justify-center border-0 rounded-md transition-colors 
              ${
                pathname === "/profile"
                  ? "bg-black text-white"
                  : "hover:bg-black"
              }
            `}
          >
            <Link href="/profile">
              <UserRoundPen
                strokeWidth={3}
                className={`${
                  pathname === "/profile"
                    ? "text-white"
                    : "text-black group-hover:text-white"
                }`}
              />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
