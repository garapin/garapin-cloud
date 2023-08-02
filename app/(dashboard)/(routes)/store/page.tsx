"use client";

import Banner from "@/components/banner";
import StoreCard from "@/components/store-card";
import React, { useState } from "react";
import axios from "axios";
import { Skeleton } from "@mantine/core";

export default function Store() {
  const [busy, setBusy] = useState(false);
  const [storeApps, setStoreApps] = useState([]);

  const getStoreApps = async () => {
    try {
      setBusy(true);
      const data = await axios.get(`/api/store`);
      setStoreApps(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setBusy(false);
    }
  };

  React.useEffect(() => {
    getStoreApps();
  }, []);

  return (
    <main className="space-y-10">
      <section className="pb-4">
        <Banner />
      </section>
      <section>
        <div className="grid grid-cols-12 mb-4">
          <div className="col-span-5">
            <h2 className="text-2xl">Store</h2>
          </div>
          <div className="col-span-7">
            <input
              type="text"
              placeholder="Search an apps"
              className="w-full px-4 py-2 rounded-md"
            />
          </div>
        </div>

        {
          storeApps.length === 0 && !busy && (
            <div className="flex items-center justify-center py-20">
              <p className="text-2xl">
                There is no apps in store. Please come back later.
              </p>
            </div>
          )
        }

        <div className="grid grid-cols-12 gap-4">
          {storeApps.map((item, i) => (
            <StoreCard key={i} data={item} />
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
