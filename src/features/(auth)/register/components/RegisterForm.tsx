"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

import useRegister from "@/hooks/api/auth/useRegister"; // Asumsi hook ini sudah ada
import { RegisterSchema, RegisterSchemaType } from "../schema";

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { mutateAsync: registerUser, isPending } = useRegister();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      password: "",
      role: "User",
    },
  });

  const onSubmit = async (values: RegisterSchemaType) => {
    console.log("Registering:", values);
    await registerUser(values);
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div
      className={cn(
        "mx-auto flex flex-col bg-white rounded-[12px]",
        "w-full max-w-[343px] p-[24px_10px] gap-6",
        hasErrors ? "h-auto" : "h-auto",

        "md:max-w-[400px] md:p-[40px_16px] md:gap-6",
        hasErrors ? "md:h-[500px]" : "md:h-[452px]",

        "lg:max-w-[400px] lg:p-[40px_16px] lg:gap-6",
        hasErrors ? "lg:h-[500px]" : "lg:h-[452px]",
        className
      )}
      {...props}
    >
      <div className="flex justify-center">
        <Image
          src="/logo.svg"
          alt="Logoipsum"
          width={134}
          height={24}
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/134x24/cccccc/333333?text=Logo";
            e.currentTarget.onerror = null;
          }}
        />
      </div>
      <div className="p-0">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            <div className="grid gap-1">
              <Label
                htmlFor="username"
                className="font-archivo text-sm font-medium text-gray-900"
              >
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Input username"
                className={`h-10 rounded-md border ${errors.username} px-4 py-2 font-archivo text-sm text-slate-900 focus:outline-none focus:ring-0`}
                {...register("username")}
              />
              {errors.username && (
                <p className="text-xs text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="grid gap-1">
              <Label
                htmlFor="password"
                className="font-archivo text-sm font-medium text-gray-900"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Input password"
                  className={`h-10 rounded-md border ${errors.password} pr-10 pl-4 py-2 font-archivo text-sm text-slate-900 focus:outline-none focus:ring-0`}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-600"
                >
                  {showPassword ? (
                    <Eye size={16} strokeWidth={1.5} />
                  ) : (
                    <EyeOff size={16} strokeWidth={1.5} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Role Selection Input */}
            <div className="grid gap-1">
              <Label
                htmlFor="role"
                className="font-archivo text-sm font-medium text-gray-900"
              >
                Role
              </Label>
              <div className="relative">
                <select
                  id="role"
                  className={`h-10 w-full appearance-none rounded-md border ${
                    errors.role ? "border-red-500" : "border-slate-200"
                  } px-4 py-2 font-archivo text-sm text-slate-900 focus:outline-none focus:ring-0`}
                  {...register("role")}
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600 pointer-events-none" />
              </div>
              {errors.role && (
                <p className="text-xs text-red-500">{errors.role.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="h-10 w-full rounded-md bg-blue-600 text-white hover:bg-blue-700 mt-4"
              disabled={isPending}
            >
              Register
            </Button>
          </div>

          <div className="mt-6 text-center text-sm font-archivo text-slate-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="underline underline-offset-4 text-blue-600"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
