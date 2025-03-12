import { Home, BarChart, Users, Settings } from "lucide-react";
import Image from "next/image";

export default function MainSidebar() {
  return (
    <div className="w-21 min-h-screen bg-gray-100 text-black flex flex-col justify-between items-center p-1">
      <div className="flex items-center justify-center mb-6">
        <Image src="/logo.svg" alt="" width={40} height={40} />
      </div>

      <nav className="flex flex-col justify-center space-y-4">
        <ul>
          <li className="hover:bg-gray-800 w-12 h-12 flex items-center justify-center border-0 rounded-md">
            <Home size={20} />
          </li>
          <li className="hover:bg-gray-800 w-12 h-12 flex items-center justify-center border-0 rounded-md">
            <BarChart size={20} />
          </li>
        </ul>
      </nav>

      <div className="mt-auto flex items-center space-x-2 p-2 bg-gray-800 rounded-lg">
        <Image
          src="/profile.jpg"
          alt="Profile"
          width={30}
          height={30}
          className="rounded-full"
        />
      </div>
    </div>
  );
}
