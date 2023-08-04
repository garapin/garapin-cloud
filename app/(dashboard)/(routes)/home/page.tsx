"use client";

import Banner from "@/components/banner";
import LaunchCard from "@/components/launch-card";
import firebase_app from "@/firebase/firebaseApp";
import { Skeleton } from "@mantine/core";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [busy, setBusy] = useState(false);
  const [apps, setApps] = useState([]);
  const auth = getAuth(firebase_app);
  const [user] = useAuthState(auth);

  const getInstalledApps = async (user_id: string | undefined) => {
    try {
      setBusy(true);
      const res = await axios.get(`/api/application/install?user_id=${user_id}`);

      if (res) {
        setApps(res.data);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    if(user) {
      getInstalledApps(user?.uid);
    }
  }, [user]);
  return (
    <main className="space-y-10">
      <section className="pb-4">
        <Banner />
      </section>
      <section>
        <h2 className="text-2xl mb-4">Installed Apps</h2>
        <div className="grid grid-cols-12 gap-4">
          {apps.map((item, i) => (
            <LaunchCard key={i} data={item} />
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
