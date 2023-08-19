import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaPlay } from "react-icons/fa";
import { IoMdStar } from "react-icons/io";

const LaunchCard = ({ data }: any) => {
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
        <p className="mb-1">Installed</p>
        <p
          className="text-xl mb-2 h-14 line-clamp-2 cursor-pointer"
          onClick={() => router.push(`/home/${data.slug}`)}
        >
          {data.title}
        </p>
        {/* <div className="rating flex gap-2 mb-1">
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
        </div> */}
        <p>Next Billing</p>
        <p className="text-slate-500 text-sm">
          <span className="text-blue-500">
            Rp.{" "}
            {data.price.toLocaleString("id-ID", {
              maximumFractionDigits: 2,
            })}{" "}
          </span>
          on{" "}
          {new Date(data.next_billing_date).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>

        <div className="action mt-2">
          <button
            className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded-md text-white"
            onClick={() => router.push(`/home/${data.slug}`)}
          >
            <FaPlay className="w-6 h-6 text-white" />
            <span>Launch</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LaunchCard;
