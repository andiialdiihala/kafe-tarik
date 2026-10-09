"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signUp } from "@/lib/auth-client";

export const useRegister = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email] = useState(searchParams.get("email") || "");
  const [role] = useState(searchParams.get("role") || "kasir");
  const [token] = useState(searchParams.get("token") || "");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await signUp.email({
        email,
        password,
        name,
        // @ts-ignore
        role,
        // @ts-ignore
        token
      });
      if (error) setError(error.message);
      else router.push("/auth/login");
    } catch {
      setError("Gagal daftar");
    } finally {
      setLoading(false);
    }
  };

  return { email, name, setName, password, setPassword, error, loading, handleRegister };
};
