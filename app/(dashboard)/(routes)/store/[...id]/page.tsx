"use client";

import { DownloadIconSVG } from "@/app/assets/icons/DownloadIcon";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const DetailStoreApps = () => {
  const pathname = usePathname();
  const slug = pathname.split("/")[2];
  const [busy, setBusy] = useState(false);
  const [detail, setDetail] = useState<any>(null);

  const getAppDetail = async () => {
    try {
      setBusy(true);
      const data = await axios.get(`/api/store/${slug}`);
      setDetail(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setBusy(false);
    }
  };

  React.useEffect(() => {
    getAppDetail();
  }, []);

  console.log("detail", detail);
  return (
    <div className="bg-white p-4 rounded-md min-h-[calc(88vh)]">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <div className="flex gap-4 mb-10">
            <img
              src={detail?.logo?.url}
              alt="logo"
              className="h-20 w-20 rounded-md"
            />
            <div className="flex-1">
              <h2 className="text-4xl line-clamp-2 mb-2">{detail?.title}</h2>
              <p className="text-slate-500 mb-2">By SolidWorx</p>
              {/* <p className="mb-2">Version 2.0.3</p> */}
              <div className="bg-slate-500 w-fit px-2 py-1 rounded-sm font-medium text-white">
                {detail?.category}
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Description</h2>
            <div dangerouslySetInnerHTML={{ __html: detail?.description }} />
          </div>
          {/* <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Software Included</h2>
            <table className="w-full border rounded-md">
              <thead>
                <tr>
                  <th className="text-left p-4 bg-slate-200 font-medium">
                    Package
                  </th>
                  <th className="text-left p-4 bg-slate-200 font-medium">
                    Version
                  </th>
                  <th className="text-left p-4 bg-slate-200 font-medium">
                    License
                  </th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((item) => (
                  <tr key={item}>
                    <td className="p-4">Inventory System</td>
                    <td className="p-4">2.0.3</td>
                    <td className="p-4">MIT</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}
        </div>
        <div className="col-span-4">
          <div className="max-w-xs mx-auto mb-10">
            <button className="w-full mb-6 bg-[#223CFF] hover:bg-[#223CFF]/80 flex items-center h-16 justify-start px-8 gap-4 text-white rounded-lg py-2 text-2xl">
              <DownloadIconSVG className="w-15 h-15" />
              <p className="text-center w-full">Install Now</p>
            </button>
          </div>

          <div className="mb-6">
            <h3 className="font-medium text-xl mb-4">Support Details</h3>
            <div dangerouslySetInnerHTML={{ __html: detail?.support_detail }} />
          </div>
          <div className="mb-6">
            <h3 className="font-medium text-xl mb-2">Price</h3>
            <p className="text-xl font-light">
              Rp.{" "}
              {detail?.price?.toLocaleString("id-ID", {
                maximumFractionDigits: 2,
              })}{" "}
              /Month
            </p>
          </div>
          <div>
            <h3 className="font-medium text-xl mb-2">Screenshoots</h3>
            <div className="grid grid-cols-12 gap-4">
              {detail?.screenshoots?.map((item: any, i: number) => (
                <div key={i} className="col-span-6 bg-slate-100 rounded-md">
                  <img src={item.url} alt={item.name} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailStoreApps;
