import React from "react";
import { CheckIcon } from "../icons/Icons";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen gap-6 max-md:mt-6">
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl lg:text-6xl max-sm:text-3xl font-extrabold tracking-tight">
              ProductHub
            </h1>
            <p className="mt-4 text-lg text-indigo-200">
              CRUD Management Platform
            </p>
            <ul className="mt-8 space-y-4 text-lg max-sm:text-base">
              <li className="flex items-center gap-3">
                <CheckIcon /> Full CRUD operations
              </li>
              <li className="flex items-center gap-3">
                <CheckIcon /> Advanced table management
              </li>
              <li className="flex items-center gap-3">
                <CheckIcon /> Search & filter products
              </li>
              <li className="flex items-center gap-3">
                <CheckIcon /> Responsive design
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-center">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
