"use client";

import { useState } from "react";
import { resetPassword } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";

export const useResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError("Token reset password tidak valid atau kedaluwarsa.");
      return;
    }
    if (password.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { error } = await resetPassword({
        newPassword: password,
        token,
      });

      if (error) {
        setError(error.message || "Gagal memperbarui password.");
      } else {
        setSuccess(true);
      }
    } catch (err: any) {
      setError("Terjadi kesalahan sistem.");
    } finally {
      setLoading(false);
    }
  };

  return { password, setPassword, confirmPassword, setConfirmPassword, loading, error, success, handleReset };
};
