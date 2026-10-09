"use client";

import { useState } from "react";
import { forgetPassword } from "@/lib/auth-client";

export const useForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await forgetPassword({
      email,
      redirectTo: "/auth/reset-password",
    });
    if (error) setError(error.message);
    else setSuccess(true);
    setLoading(false);
  };

  return { email, setEmail, loading, error, success, handleForgot };
};
