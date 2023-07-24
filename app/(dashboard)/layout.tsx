import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex relative bg-slate-100">
      <div className="hidden h-full md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-[80] bg-[#000B5B] shadow-sm">
        <Sidebar />
      </div>
      <main className="md:pl-64 w-full">
        <div className="h-full md:pb-10">
          <Navbar />
          <div className="py-4 px-6">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
