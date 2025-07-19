import React from "react";
import { LoginForm } from "./components/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white md:bg-gray-100 lg:bg-gray-100">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
