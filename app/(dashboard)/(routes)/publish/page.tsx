"use client";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import PublishCard from "@/components/publish-card";
import axios from "axios";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase_app from "@/firebase/firebaseApp";
import { getAuth } from "firebase/auth";
import { Skeleton } from "@mantine/core";

export default function Publish() {
  const router = useRouter();
  const [publishedApps, setPublishedApps] = useState([]);
  const auth = getAuth(firebase_app);
  const [user] = useAuthState(auth);
  const [busy, setBusy] = useState(false);

  const getPublishedApps = async () => {
    try {
      setBusy(true);
      const data = await axios.get(`/api/application/publish/${user?.uid}`);
      setPublishedApps(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setBusy(false);
    }
  }

  React.useEffect(() => {
    getPublishedApps()
  }, [user])

  return (
    <main className="space-y-10">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl">My Application</h2>
          <button
            className="bg-blue-600 hover:bg-blue-600/80 flex items-center gap-2 text-white px-4 py-2 rounded-md"
            onClick={() => router.push("/publish/new")}
          >
            <FaPlus className="w-6 h-6" />
            <span>Add New</span>
          </button>
        </div>
        {
          publishedApps.length === 0 && !busy && (
            <div className="flex items-center justify-center py-20">
              <p className="text-2xl">You don't have any published apps.</p>
            </div>
          )
        }
        <div className="grid grid-cols-12 gap-4">
          {publishedApps.map((item, i) => (
            <PublishCard key={i} data={item} />
          ))}
          {busy &&
            [1, 2, 3, 4].map((item) => (
              <div className="col-span-3" key={item}>
                <Skeleton height={200} radius="md" className="mb-2" />
                <Skeleton height={20} radius="md" className="mb-2" />
                <Skeleton height={25} radius="md" className="mb-2" />
                <Skeleton height={20} radius="md" className="mb-2" />
              </div>
            ))}
        </div>
      </section>
    </main>
  );
}
