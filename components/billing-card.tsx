"use client";

import { BillingIconSVG } from "@/app/assets/icons/BillingIcon";
import firebase_app from "@/firebase/firebaseApp";
import { Button } from "@mantine/core";
import axios from "axios";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

const BillingCard = ({ data, setData }: any) => {
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

      const res = await axios.post(`/api/payment/repayment`, {
        app_id: data._id,
        user_id: user?.uid,
        amount: data.price,
        app_name: data.title,
        app_category: data.category,
        app_slug: data.slug,
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
    }
  };

  const getStatus = (status: string) => {
    switch (status) {
      case "Active":
        return <p className="mb-1 text-green-500">ACTIVE</p>;
      case "Inactive":
        return (
          <p className="mb-1 text-red-500">
            STOP - Delete on{" "}
            {new Date(
              new Date(data.next_billing_date).setMonth(
                new Date(data.next_billing_date).getMonth() + 1
              )
            ).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        );
      case "Deleted":
        return (
          <p className="mb-1 text-red-500">
            Deleted on{" "}
            {new Date(
              new Date(data.next_billing_date).setMonth(
                new Date(data.next_billing_date).getMonth() + 1
              )
            ).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        );
      default:
        return "Due";
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
        {getStatus(data.app_status)}
        <p
          className="text-xl mb-2 h-14 line-clamp-2 cursor-pointer"
          onClick={() => router.push(`/store/${data.slug}`)}
        >
          {data.title}
        </p>
        {data.app_status !== "Deleted" && (
          <>
            <p>Next Billing</p>
            <p className="text-slate-500 text-sm">
              <span className="text-blue-500">
                Rp.{" "}
                {data.price.toLocaleString("id-ID", {
                  maximumFractionDigits: 2,
                })}
                {data.app_status === "Active" && (
                  <span className="text-slate-600">
                    {" "}
                    on{" "}
                    {new Date(data.next_billing_date).toLocaleDateString(
                      "id-ID",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </span>
                )}
              </span>
            </p>
            <div className="action mt-2">
              {(data.app_status === "Active" ||
                data.app_status === "Inactive") && (
                <Button
                  leftIcon={<BillingIconSVG className="w-6 h-6 text-white" />}
                  className="flex items-center gap-2 bg-[#223CFF] hover:bg-[#223CFF]/80 px-4 rounded-md text-white font-normal text-base"
                  onClick={handleInstall}
                  loading={installing.status && installing.id === data._id}
                  disabled={installing.status && installing.id === data._id}
                >
                  Pay Now
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BillingCard;
