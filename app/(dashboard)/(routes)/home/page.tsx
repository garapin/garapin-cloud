"use client";

import Image from "next/image";
import { IoMdStar } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import Banner from "@/components/banner";

export default function Home() {
  return (
    <main className="space-y-10">
      <section className="pb-4">
        <Banner />
      </section>
      <section>
        <h2 className="text-2xl mb-4">Installed Apps</h2>
        <div className="grid grid-cols-12 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="col-span-3 bg-white p-4 rounded-2xl">
              <Image
                alt="apps"
                src="/images/apps-img.png"
                className="w-full mb-2"
                width={400}
                height={400}
              />
              <div className="content">
                <p className="mb-1">Installed</p>
                <p className="text-xl mb-2">Inventory System</p>
                <div className="rating flex gap-2 mb-1">
                  <span className="text-sm text-yellow-400">4.3</span>
                  <div className="flex items-center gap-1">
                    <IoMdStar className="text-yellow-400" />
                    <IoMdStar className="text-yellow-400" />
                    <IoMdStar className="text-yellow-400" />
                    <IoMdStar className="text-yellow-400" />
                    <IoMdStar className="text-yellow-400" />
                  </div>
                  <span className="text-slate-500 text-sm">(16,325)</span>
                </div>
                <p>Next Billing</p>
                <p className="text-slate-500 text-sm">
                  <span className="text-blue-500">Rp. 125.000 </span>
                  on 24-Mei-2023
                </p>

                <div className="action mt-2">
                  <button
                    className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded-md text-white"
                    onClick={() =>
                      window.open("/home/237623286d6tdbtwuds", "_blank")
                    }
                  >
                    <FaPlay className="w-6 h-6 text-white" />
                    <span>Launch</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
