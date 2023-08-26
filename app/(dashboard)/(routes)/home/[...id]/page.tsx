"use client";

import { DownloadIconSVG } from "@/app/assets/icons/DownloadIcon";
import { TrashSVG } from "@/app/assets/icons/TrashIcon";
import firebase_app from "@/firebase/firebaseApp";
import { Button, LoadingOverlay, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaPlay } from "react-icons/fa";
import { toast } from "react-toastify";

const DetailStoreApps = () => {
  const pathname = usePathname();
  const slug = pathname.split("/")[2];
  const [busy, setBusy] = useState(false);
  const [detail, setDetail] = useState<any>(null);
  const [installing, setInstalling] = useState(false);
  const auth = getAuth(firebase_app);
  const [user] = useAuthState(auth);
  const [opened, { open, close }] = useDisclosure(false);

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

  const handleInstall = async () => {
    try {
      setInstalling(true);

      const data = await axios.post(`/api/application/install`, {
        app_id: detail._id,
        user_id: user?.uid,
      });

      if (data) {
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
        getAppDetail();
      }
    } catch (error: any) {
      toast.error(error?.response?.data || "Application install failed", {
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
      setInstalling(false);
    }
  };

  const handleUninstall = async () => {
    try {
      setBusy(true);
      const res = await axios.delete(`/api/application/install`, {
        params: {
          app_id: detail._id,
          user_id: user?.uid,
          install_app_name: detail?.install_app_name,
        },
      });

      if (res) {
        toast.success("Delete application successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        getAppDetail();
        close();
      }
    } catch (error) {
      toast.error("Delete application failed!", {
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

  const handleLaunch = async () => {
    window.open(`/home/${slug}`, "_blank");
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Confirmation" centered>
        <p>
          Are you sure want to delete this application? You can install it
          again!
        </p>
        <div className="mt-4 flex gap-4 justify-end">
          <Button
            onClick={close}
            className="bg-slate-500 text-white"
            variant="filled"
            color="gray"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUninstall}
            className="bg-red-600 text-white"
            variant="filled"
            color="red"
          >
            Confirm
          </Button>
        </div>
      </Modal>
      {/* <Button compact className="mb-2 bg-blue-500" onClick={handleLaunch}>
        Open in New Tab
      </Button> */}
      <div className="bg-white p-4 rounded-md min-h-[calc(88vh)]">
        <LoadingOverlay visible={busy} overlayBlur={2} />
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
                <p className="text-slate-500 mb-2">{detail?.user?.name}</p>
                {/* <p className="mb-2">Version 2.0.3</p> */}
                <div className="bg-slate-500 w-fit px-2 py-1 mb-2 rounded-sm font-medium text-white">
                  {detail?.category}
                </div>
                <p className="text-base">
                  {detail?.installed_count ?? 0}x installed
                </p>
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Description</h2>
              <div dangerouslySetInnerHTML={{ __html: detail?.description }} />
            </div>
          </div>
          <div className="col-span-4">
            <div className="max-w-xs mx-auto mb-10 relative">
              <div className="max-w-xs mx-auto mb-10">
                <Button
                  leftIcon={<FaPlay className="w-10 h-10" />}
                  className="w-full mb-6 bg-green-500 hover:bg-green-500/80 flex items-center h-16 justify-start px-8 gap-4 text-white rounded-lg py-2 text-2xl font-normal"
                  loading={installing}
                  styles={{
                    inner: {
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                    },
                    label: {
                      flex: 1,
                    },
                  }}
                  loaderPosition="center"
                >
                  <p className="text-center w-full">Launch</p>
                </Button>
                {/* <Button
                leftIcon={<DownloadIconSVG className="w-10 h-10" />}
                className="w-full mb-6 bg-[#223CFF] hover:bg-[#223CFF]/80 flex items-center h-16 justify-start px-8 gap-4 text-white rounded-lg py-2 text-2xl font-normal"
                loading={installing}
                styles={{
                  inner: {
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                  },
                  label: {
                    flex: 1,
                  },
                }}
                loaderPosition="center"
                onClick={handleInstall}
              >
                <p className="text-center w-full">Install</p>
              </Button> */}
                <Button
                  leftIcon={<TrashSVG className="w-10 h-10" />}
                  className="w-full mb-6 bg-red-600 hover:bg-red-600/80 flex items-center h-16 justify-start px-8 gap-4 text-white rounded-lg py-2 text-2xl font-normal"
                  loading={installing}
                  styles={{
                    inner: {
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                    },
                    label: {
                      flex: 1,
                    },
                  }}
                  disabled={!detail?.installed}
                  loaderPosition="center"
                  // onClick={handleUninstall}
                  onClick={open}
                >
                  <p className="text-center w-full">Delete</p>
                </Button>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium text-xl mb-4">Support Details</h3>
              <div
                dangerouslySetInnerHTML={{ __html: detail?.support_detail }}
              />
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
    </>
  );
};

export default DetailStoreApps;
