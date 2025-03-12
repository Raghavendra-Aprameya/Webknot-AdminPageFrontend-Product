"use client";
import { useAuth } from "../context/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  return user ? children : null;
}
