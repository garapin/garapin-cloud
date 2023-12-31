"use client";

import firebase_app from "@/firebase/firebaseApp";
import { LoadingOverlay, Switch, useMantineTheme } from "@mantine/core";
import axios from "axios";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { IoMdStar } from "react-icons/io";
import { toast } from "react-toastify";

const PublishCard = ({ data }: { data: any }) => {
  const [checked, setChecked] = useState(data.status === "Published");
  const theme = useMantineTheme();
  const auth = getAuth(firebase_app);
  const [user] = useAuthState(auth);
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const handleToggleStatus = async () => {
    const payload = {
      status: !checked ? "Published" : "Unpublished",
      app_id: data._id,
      user_id: user?.uid,
    };

    try {
      setBusy(true);
      const data = await axios.post(
        `/api/application/publish/${user?.uid}/toggle-status`,
        payload
      );

      if (data) {
        toast.success("Change status success!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setChecked(!checked);
      }
    } catch (error) {
      toast.error("Change status failed!", {
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
      setBusy(false);
    }
  };

  return (
    <div className="col-span-3 bg-white p-4 rounded-2xl relative">
      <LoadingOverlay visible={busy} overlayBlur={2} />
      <div className="relative">
        <Image
          alt="apps"
          src={
            data.screenshoots.find((item: any) => item.isCover)?.url ??
            data.screenshoots[0].url
          }
          className="w-full mb-2 rounded-2xl h-52 object-cover"
          width={400}
          height={400}
        />
        <Image
          alt="logo"
          src={data.logo.url}
          className="rounded-2xl h-6 w-6 object-cover left-4 bottom-4 absolute"
          width={80}
          height={80}
        />
      </div>
      <div className="content">
        <p
          className="text-xl mb-2 h-14 line-clamp-2 cursor-pointer"
          onClick={() => {
            router.push(`/publish/${data.slug}`);
          }}
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
        <p className="text-sm">{data.installed_count ?? 0}x installed</p>
        <p>Pricing</p>
        <p className="text-slate-500 text-sm">
          <span className="text-blue-500">
            Rp.{" "}
            {data.price.toLocaleString("id-ID", {
              maximumFractionDigits: 2,
            })}{" "}
          </span>
        </p>

        <div className="action mt-2">
          <Switch
            checked={checked}
            onChange={handleToggleStatus}
            color="violet"
            size="md"
            className="cursor-pointer"
            label={
              checked ? (
                <span className="text-green-500">PUBLISHED</span>
              ) : (
                <span>UNPUBLISHED</span>
              )
            }
            thumbIcon={
              checked ? (
                <AiOutlineCheck
                  size="0.8rem"
                  color="#000"
                  stroke={3}
                  className="cursor-pointer"
                />
              ) : (
                <AiOutlineClose
                  size="0.8rem"
                  color={theme.colors.red[theme.fn.primaryShade()]}
                  stroke={3}
                  className="cursor-pointer"
                />
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PublishCard;
