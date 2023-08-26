"use client";

import { DownloadIconSVG } from "@/app/assets/icons/DownloadIcon";
import firebase_app from "@/firebase/firebaseApp";
import { Button, Group, Input, LoadingOverlay, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

const DetailStoreApps = () => {
  const pathname = usePathname();
  const search = useSearchParams();
  const slug = pathname.split("/")[2];
  const [busy, setBusy] = useState(false);
  const [detail, setDetail] = useState<any>(null);
  const [installing, setInstalling] = useState(false);
  const auth = getAuth(firebase_app);
  const [user] = useAuthState(auth);
  const [opened, { open, close }] = useDisclosure(false);
  const [imgOpen, setImgOpen] = useState("");
  const [openInstall, { open: setOpenInstall, close: closeOpenInstall }] =
    useDisclosure(false);

  const [appName, setAppName] = useState("");

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

  React.useEffect(() => {
    if (search.get("status") === "success") {
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
    }

    if (search.get("status") === "failed") {
      toast.error("Application install failed!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [search]);

  const handleInstall = async () => {
    try {
      setInstalling(true);

      const res = await axios.post(`/api/payment/billing`, {
        app_id: detail._id,
        user_id: user?.uid,
        amount: detail.price,
        app_name: detail.title,
        app_category: detail.category,
        app_slug: detail.slug,
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
      setInstalling(false);
      closeOpenInstall();
    }
  };

  return (
    <div className="bg-white p-4 rounded-md min-h-[calc(88vh)]">
      <LoadingOverlay visible={busy} overlayBlur={2} />
      <Modal
        opened={opened}
        onClose={() => {
          setImgOpen("");
          close();
        }}
        withCloseButton={false}
        className="p-0"
        centered
      >
        <img src={imgOpen} alt="image" />
      </Modal>
      <Modal
        opened={openInstall}
        onClose={closeOpenInstall}
        title={`Install ${detail?.title}`}
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
            loading={installing}
          >
            Install Now
          </Button>
        </Group>
      </Modal>
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
              <div className="bg-slate-500 mb-2 w-fit px-2 py-1 rounded-sm font-medium text-white">
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
            <Button
              leftIcon={<DownloadIconSVG className="w-10 h-10" />}
              className="w-full mb-6 bg-[#223CFF] hover:bg-[#223CFF]/80 flex items-center h-16 justify-start px-8 gap-4 text-white rounded-lg py-2 text-2xl font-normal"
              loading={installing}
              // disabled={installing || detail?.installed}
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
              onClick={setOpenInstall}
            >
              <p className="text-center w-full">
                {/* {detail?.installed ? "Installed" : "Install Now"} */}
                Install Now
              </p>
            </Button>
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
            <h3 className="font-medium text-xl mb-2">Screenshots</h3>
            <div className="grid grid-cols-12 gap-4">
              {detail?.screenshoots?.map((item: any, i: number) => (
                <div key={i} className="col-span-6 bg-slate-100 rounded-md">
                  <img
                    src={item.url}
                    alt={item.name}
                    onClick={() => {
                      setImgOpen(item.url);
                      open();
                    }}
                  />
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
