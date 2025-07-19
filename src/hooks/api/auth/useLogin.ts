"use client";

import { axiosInstance } from "@/lib/axios";
import type { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: Pick<User, "username" | "password">) => {
      const { data } = await axiosInstance.post("/auth/login", payload);
      return data;
    },
    onSuccess: async (data) => {
      await signIn("credentials", { ...data, redirect: false });
      toast.success("Login success");

      if (data.role === "Admin") {
        router.push("/admin/articles");
      } else {
        router.push("/");
      }
    },
    onError: (error: AxiosError<any>) => {
      toast.error(
        error.response?.data.message ||
          "Login failed. Please check your credentials."
      );
    },
  });
};

export default useLogin;
