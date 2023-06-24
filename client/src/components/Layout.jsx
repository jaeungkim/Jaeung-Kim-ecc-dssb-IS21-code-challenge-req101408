import React from "react";

// Layout component that wraps around other components
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header section */}
      <header className="bg-white shadow py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header title */}
          <h1 className="text-xl font-semibold text-gray-700">
            Jaeung-Kim-IS24-full-stack-competition-req97073
          </h1>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Wrap children components with a white background and rounded corners */}
            <div className="bg-white shadow rounded-lg p-6">{children}</div>
          </div>
        </div>
      </main>

      {/* Footer section */}
      <footer className="bg-white shadow py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Copyright notice */}
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Jaeung Kim. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
