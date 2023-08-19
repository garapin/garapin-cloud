"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase_app from "@/firebase/firebaseApp";
import { Skeleton } from "@mantine/core";
import BillingCard from "@/components/billing-card";

export default function Billing() {
  const [busy, setBusy] = useState(false);
  const [apps, setApps] = useState({
    dueDate: [],
    inActive: [],
    deleted: [],
  });
  const auth = getAuth(firebase_app);
  const [user] = useAuthState(auth);

  const getInstalledApps = async (user_id: string | undefined) => {
    try {
      setBusy(true);
      const res = await axios.get(`/api/billing?user_id=${user_id}`);

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
    if (user) {
      getInstalledApps(user?.uid);
    }
  }, [user]);

  return (
    <main className="space-y-10">
      <section>
        <h2 className="text-2xl mb-4">Due Date</h2>
        <div className="grid grid-cols-12 gap-4">
          {busy &&
            [1, 2, 3, 4].map((item) => (
              <div className="col-span-3" key={item}>
                <Skeleton height={200} radius="md" className="mb-2" />
                <Skeleton height={20} radius="md" className="mb-2" />
                <Skeleton height={25} radius="md" className="mb-2" />
                <Skeleton height={20} radius="md" className="mb-2" />
              </div>
            ))}
          {!busy &&
            apps.dueDate.map((item) => <BillingCard key={item} data={item} />)}
        </div>
      </section>
      <section>
        <h2 className="text-2xl mb-4">Overdue</h2>
        <div className="grid grid-cols-12 gap-4">
          {busy &&
            [1, 2, 3, 4].map((item) => (
              <div className="col-span-3" key={item}>
                <Skeleton height={200} radius="md" className="mb-2" />
                <Skeleton height={20} radius="md" className="mb-2" />
                <Skeleton height={25} radius="md" className="mb-2" />
                <Skeleton height={20} radius="md" className="mb-2" />
              </div>
            ))}
          {!busy &&
            apps.inActive.map((item) => <BillingCard key={item} data={item} />)}
        </div>
      </section>
      <section>
        <h2 className="text-2xl mb-4">Deleted</h2>
        <div className="grid grid-cols-12 gap-4">
          {busy &&
            [1, 2, 3, 4].map((item) => (
              <div className="col-span-3" key={item}>
                <Skeleton height={200} radius="md" className="mb-2" />
                <Skeleton height={20} radius="md" className="mb-2" />
                <Skeleton height={25} radius="md" className="mb-2" />
                <Skeleton height={20} radius="md" className="mb-2" />
              </div>
            ))}
          {!busy &&
            apps.deleted.map((item) => <BillingCard key={item} data={item} />)}
        </div>
      </section>
    </main>
  );
}
