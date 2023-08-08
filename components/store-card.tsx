"use client";

import { DownloadIconSVG } from "@/app/assets/icons/DownloadIcon";
import firebase_app from "@/firebase/firebaseApp";
import { Button } from "@mantine/core";
import axios from "axios";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { IoMdStar } from "react-icons/io";
import { toast } from "react-toastify";

const StoreCard = ({ data, setData }: any) => {
  const router = useRouter();
  const [installing, setInstalling] = useState({
    status: false,
    id: "",
  });
  const auth = getAuth(firebase_app);
  const [user] = useAuthState(auth);

  const handleInstall = async () => {
    try {
      setInstalling({
        status: true,
        id: data._id,
      });

      const res = await axios.post(`/api/application/install`, {
        app_id: data._id,
        user_id: user?.uid,
      });

      if (res) {
        toast.success("Application installed successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setData((prev: any) => {
          return prev.map((item: any) => {
            if (item._id === data._id) {
              return {
                ...item,
                installed: true,
              };
            }
            return item;
          });
        }
        );
      }
    } catch (error: any) {
      toast.error(error?.response?.data || "Application install failed!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setInstalling({
        status: false,
        id: "",
      });
    }
  };

  return (
    <div className="col-span-3 bg-white p-4 rounded-2xl">
      <Image
        alt="apps"
        src={data?.screenshoots[0]?.url}
        className="w-full mb-2 rounded-2xl h-52 object-contain"
        width={400}
        height={400}
      />
      <div className="content">
        <p className={`mb-1 text-[#344289]`}>{data.installed ? "Installed" : "Not Installed"}</p>
        <p className="text-xl mb-2 h-14 line-clamp-2 cursor-pointer" onClick={() => router.push(`/store/${data.slug}`)}>{data.title}</p>
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
            })}<span className="text-slate-600"> / month</span>
          </span>
          {/* on 24-Mei-2023 */}
        </p>

        <div className="action mt-2">
          <Button
            leftIcon={<DownloadIconSVG className="w-6 h-6 text-white" />}
            className="flex items-center gap-2 bg-[#223CFF] hover:bg-[#223CFF]/80 px-4 rounded-md text-white font-normal text-base"
            onClick={handleInstall}
            loading={installing.status && installing.id === data._id}
            disabled={installing.status && installing.id === data._id}
          >
            {
              installing.status && installing.id === data._id ? "Installing..." : "Install Now"
            }
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
