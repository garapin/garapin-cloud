import { DownloadIconSVG } from "@/app/assets/icons/DownloadIcon";
import { Button } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { IoMdStar } from "react-icons/io";

const StoreCard = ({ data }: any) => {
  const router = useRouter();
  return (
    <div className="col-span-3 bg-white p-4 rounded-2xl">
      <Image
        alt="apps"
        src={data?.screenshoots[0]?.url}
        className="w-full mb-2 rounded-2xl h-52 object-cover"
        width={400}
        height={400}
      />
      <div className="content">
        <p className={`mb-1 text-[#344289]`}>{data.installed ? "Installed" : "Not Installed"}</p>
        <p className="text-xl mb-2 h-14 line-clamp-2">{data.title}</p>
        <div className="rating flex gap-2 mb-1">
          <span className="text-sm text-yellow-400">{data.reviews}</span>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <IoMdStar
                key={i}
                className={`${
                  i + 1 <= data.reviews ? "text-yellow-400" : "text-slate-500"
                }`}
              />
            ))}
          </div>
          <span className="text-slate-500 text-sm">({data.reviews_count})</span>
        </div>
        <p>Price</p>
        <p className="text-slate-500 text-sm">
          <span className="text-blue-500">
            Rp.{" "}
            {data.price.toLocaleString("id-ID", {
              maximumFractionDigits: 2,
            })}{" "}
          </span>
          {/* on 24-Mei-2023 */}
        </p>

        <div className="action mt-2">
          <Button
            leftIcon={<DownloadIconSVG className="w-6 h-6 text-white" />}
            className="flex items-center gap-2 bg-[#223CFF] hover:bg-[#223CFF]/80 px-4 rounded-md text-white font-normal text-base"
            onClick={() => router.push(`/store/${data.slug}`)}
            disabled={data.installed}
          >
            {
              data.installed ? "Installed" : "Install Now"
            }
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
