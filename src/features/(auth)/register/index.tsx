import React from "react";
import { RegisterForm } from "./components/RegisterForm"; // Sesuaikan path jika perlu

const RegisterPage = () => {
  return (
    // Menggunakan gaya yang sama dengan LoginPage
    <div className="flex min-h-screen items-center justify-center bg-white md:bg-gray-100 lg:bg-gray-100">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
