"use client";

import { DownloadIconSVG } from "@/app/assets/icons/DownloadIcon";
import firebase_app from "@/firebase/firebaseApp";
import { Button, Group, Input, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
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
  const [openInstall, { open: setOpenInstall, close: closeOpenInstall }] =
    useDisclosure(false);

  const [appName, setAppName] = useState("");

  // const handleInstall = async () => {
  //   try {
  //     setInstalling({
  //       status: true,
  //       id: data._id,
  //     });

  //     const res = await axios.post(`/api/application/install`, {
  //       app_id: data._id,
  //       user_id: user?.uid,
  //     });

  //     if (res) {
  //       toast.success("Application installed successfully!", {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //       });
  //       setData((prev: any) => {
  //         return prev.map((item: any) => {
  //           if (item._id === data._id) {
  //             return {
  //               ...item,
  //               installed: true,
  //             };
  //           }
  //           return item;
  //         });
  //       }
  //       );
  //     }
  //   } catch (error: any) {
  //     toast.error(error?.response?.data || "Application install failed!", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //   } finally {
  //     setInstalling({
  //       status: false,
  //       id: "",
  //     });
  //   }
  // };

  const handleInstall = async () => {
    try {
      setInstalling({
        status: true,
        id: data._id,
      });

      const res = await axios.post(`/api/payment/billing`, {
        app_id: data._id,
        user_id: user?.uid,
        amount: data.price,
        app_name: data.title,
        app_category: data.category,
        app_slug: data.slug,
        install_app_name: appName,
      });

      window.open(res.data.link, "_blank");
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
      closeOpenInstall();
    }
  };

  return (
    <div className="col-span-3 bg-white p-4 rounded-2xl">
      <Modal
        opened={openInstall}
        onClose={closeOpenInstall}
        title={`Install ${data.title}`}
      >
        <Input.Wrapper
          id="input-demo"
          withAsterisk
          label="Application Name"
          className="mb-6"
        >
          <Input
            placeholder="Add application name"
            value={appName}
            onChange={(e) => {
              setAppName(e.currentTarget.value);
            }}
          />
        </Input.Wrapper>
        <Group position="right">
          <Button
            onClick={() => {
              if (!appName) {
                toast.error("Nama aplikasi tidak boleh kosong!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              } else {
                handleInstall();
              }
            }}
            className="flex items-center gap-2 bg-[#223CFF] hover:bg-[#223CFF]/80 px-4 rounded-md text-white font-normal text-base"
            loading={installing.status && installing.id === data._id}
          >
            Install Now
          </Button>
        </Group>
      </Modal>
      <div className="relative">
        <Image
          alt="apps"
          src={
            data.screenshoots.find((item: any) => item.isCover)?.url ??
            data.screenshoots[0].url
          }
          className="w-full mb-2 rounded-2xl h-52 object-contain"
          width={400}
          height={400}
        />
        <Image
          alt="logo"
          src={data.logo.url}
          className="rounded-2xl h-6 w-6 object-cover right-4 bottom-4 absolute"
          width={80}
          height={80}
        />
      </div>
      <div className="content">
        <p className={`mb-1 text-[#344289]`}>
          {data.installed ? "Installed" : "Not Installed"}
        </p>
        <p
          className="text-xl mb-2 h-14 line-clamp-2 cursor-pointer"
          onClick={() => router.push(`/store/${data.slug}`)}
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
        <p>Price</p>
        <p className="text-slate-500 text-sm">
          <span className="text-blue-500">
            Rp.{" "}
            {data.price.toLocaleString("id-ID", {
              maximumFractionDigits: 2,
            })}
            <span className="text-slate-600"> / month</span>
          </span>
          {/* on 24-Mei-2023 */}
        </p>

        <div className="action mt-2">
          <Button
            leftIcon={<DownloadIconSVG className="w-6 h-6 text-white" />}
            className="flex items-center gap-2 bg-[#223CFF] hover:bg-[#223CFF]/80 px-4 rounded-md text-white font-normal text-base"
            onClick={setOpenInstall}
            loading={installing.status && installing.id === data._id}
            disabled={installing.status && installing.id === data._id}
          >
            {installing.status && installing.id === data._id
              ? "Installing..."
              : "Install Now"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
