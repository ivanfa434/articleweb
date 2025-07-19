"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useLogin from "@/hooks/api/auth/useLogin";
import Link from "next/link";
import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginSchemaType } from "../schemas";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { mutateAsync: login, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginSchemaType) => {
    await login(values);
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div
      className={cn(
        "mx-auto flex flex-col bg-white rounded-[12px]",
        "w-full max-w-[343px] p-[24px_10px] gap-6",
        hasErrors ? "h-auto" : "h-auto",

        "md:max-w-[400px] md:p-[40px_16px] md:gap-6",
        hasErrors ? "md:h-[424px]" : "md:h-[376px]",

        "lg:max-w-[400px] lg:p-[40px_16px] lg:gap-6",
        hasErrors ? "lg:h-[424px]" : "lg:h-[376px]",
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
                className={`h-10 rounded-md border border-slate-200 ${
                  errors.username
                } px-4 py-2 font-archivo text-sm text-slate-900`}
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
                  className={`h-10 rounded-md border border-slate-200 ${
                    errors.password
                  } pr-10 pl-4 py-2 font-archivo text-sm text-slate-900 `}
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

            <Button
              type="submit"
              className="h-10 w-full rounded-md bg-blue-600 text-white hover:bg-blue-700 mt-4"
              disabled={isPending}
            >
              {isPending ? "Loading..." : "Login"}
            </Button>
          </div>

          <div className="mt-6 text-center text-sm font-archivo text-slate-600">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="underline underline-offset-4 text-blue-600"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
