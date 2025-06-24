import React from "react";
import { UserMenu } from "./user-menu";

function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="flex justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Board</h1>
          <p className="text-gray-600">Find your next opportunity</p>
        </div>
        <UserMenu />
      </div>
    </header>
  );
}

export default Header;
