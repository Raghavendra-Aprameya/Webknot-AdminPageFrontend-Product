"use client";
import { useState } from "react";
import { useAuth } from "../../../context/AuthProvider";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import Link from "next/link";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ username, password });
    router.push("/home");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <Button
          variant="default"
          type="submit"
          className="w-full cursor-pointer"
        >
          Login
        </Button>
        <p className="text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-black font-semibold hover:underline"
          >
            Register{" "}
          </Link>
          {" "}
        </p>
      </form>
    </div>
  );
}




// "use client";
// import { useState } from "react";
// import { useAuth } from "../../../context/AuthProvider";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Button } from "../../../components/ui/button";
// import { Input } from "../../../components/ui/input";

// export default function Login() {
//   const [username, setUsername] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const { login } = useAuth();
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await login({ username, password });
//     router.push("/home");
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-2xl shadow-lg w-96 flex flex-col gap-4"
//       >
//         <h2 className="text-2xl font-bold text-center text-gray-800">Welcome Back</h2>
//         <p className="text-gray-500 text-center text-sm">Log in to continue</p>
        
//         <Input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
//           required
//         />
//         <Input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
//           required
//         />
        
//         <Button
//           variant="default"
//           type="submit"
//           className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-900 transition"
//         >
//           Login
//         </Button>

//         <p className="text-sm text-gray-600 text-center">
//           Don't have an account?{" "}
//           <Link href="/register" className="text-black font-semibold hover:underline">
//             Register
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }
