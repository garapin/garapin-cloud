'use client'

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import firebase_app from "@/firebase/firebaseApp";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const auth = getAuth(firebase_app);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  if (!loading && !user) {
    router.push("/login");
  }
  
  return (
    <div className="min-h-screen flex relative bg-slate-100">
      <div className={`hidden h-full md:flex-col md:fixed md:inset-y-0 z-[80] bg-[#000B5B] shadow-sm ${sidebarOpen ? 'md:w-64 md:flex' : 'md:w-0 md:hidden'}`}>
        <Sidebar />
      </div>
      <main className={`w-full ${sidebarOpen ? 'md:pl-64' : 'md:pl-0'}`}>
        <div className="h-full md:pb-10">
          <Navbar user={user} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="py-4 px-6">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
