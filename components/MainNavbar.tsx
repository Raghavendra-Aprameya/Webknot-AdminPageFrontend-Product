import React from 'react'
import { Bell } from 'lucide-react';
import Link from 'next/link';

const MainNavbar = () => {
  return (
    <div className="flex justify-between items-center p-3 border-b-3 border-gray-200 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex justify-center items-center">
        <div className="ml-6 hidden md:block">
          <h2 className="text-lg text-gray-700 dark:text-gray-300">
            Welcome back, <span className="font-medium">User!</span>
          </h2>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 mr-4">
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <Bell size={20} className="text-gray-600 dark:text-gray-300" />
        </button>
        <Link href="/login">
          <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}

export default MainNavbar



// import React from 'react';
// import { Bell, Search, User } from 'lucide-react';
// import Link from 'next/link';

// const MainNavbar = () => {
//   return (
//     <div className="flex justify-between items-center p-4 border-b-2 border-gray-200 dark:border-gray-800 shadow-md bg-white dark:bg-gray-900">
//       <div className="flex items-center">
//         <Link href="/">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
//               <span className="text-white font-bold text-xl">A</span>
//             </div>
//             <h1 className="text-lg font-semibold hidden sm:block">Admin Panel</h1>
//           </div>
//         </Link>
//         <div className="ml-6 hidden md:block">
//           <h2 className="text-gray-700 dark:text-gray-300">Welcome back, <span className="font-medium">User!</span></h2>
//         </div>
//       </div>
      
//       <div className="relative max-w-md w-full mx-4 hidden sm:block">
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//           <Search size={18} className="text-gray-400" />
//         </div>
//         <input 
//           type="text"
//           placeholder="Search dashboards, reports, data..."
//           className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary border border-gray-200 dark:border-gray-700"
//         />
//       </div>
      
//       <div className="flex items-center gap-4">
//         <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition relative">
//           <Bell size={20} className="text-gray-600 dark:text-gray-300" />
//           <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
//         </button>
        
//         <Link href="/login">
//           <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition">
//             <User size={16} />
//             <span>Login</span>
//           </button>
//           <button className="sm:hidden p-2 rounded-full bg-primary text-white">
//             <User size={18} />
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default MainNavbar;
