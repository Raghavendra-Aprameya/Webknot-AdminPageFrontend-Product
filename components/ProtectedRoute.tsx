// "use client";
// import { useAuth } from "../context/AuthProvider";
// import { useRouter } from "next/navigation";
// import { useEffect, ReactNode } from "react";

// export default function ProtectedRoute({ children }: { children: ReactNode }) {
//   const { user } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!user) router.push("/login");
//   }, [user, router]);

//   return user ? children : null;
// }



"use client";
import { useAuth } from "../context/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) return null; // Prevent flashing a login redirect

  return user ? children : null;
}
