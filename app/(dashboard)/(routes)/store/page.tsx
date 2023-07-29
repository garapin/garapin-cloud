"use client";

import { DownloadIconSVG } from "@/app/assets/icons/DownloadIcon";
import Image from "next/image";
import { IoMdStar } from "react-icons/io";
import { useRouter } from "next/navigation";
import Banner from "@/components/banner";

export default function Store() {
  const router = useRouter();
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
        <div className="grid grid-cols-12 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div className="col-span-3 bg-white p-4 rounded-2xl">
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
                <p>Price</p>
                <p className="text-slate-500 text-sm">
                  <span className="text-blue-500">Rp. 125.000 </span>
                  on 24-Mei-2023
                </p>

                <div className="action mt-2">
                  <button
                    className="flex items-center gap-2 bg-[#223CFF] hover:bg-[#223CFF]/80 px-4 py-2 rounded-md text-white"
                    onClick={() => router.push("/store/62gdf7weti7")}
                  >
                    <DownloadIconSVG className="w-6 h-6 text-white" />
                    <span>Install Now</span>
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
