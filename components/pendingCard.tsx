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

const PendingCard = ({ data, setData }: any) => {
  const router = useRouter();
  const [installing, setInstalling] = useState({
    status: false,
    id: "",
  });
  const auth = getAuth(firebase_app);
  const [user] = useAuthState(auth);

  const handlePay = async () => {
    // open new tab
    window.open(data?.invoice_url, "_blank");
  };

  return (
    <div className="col-span-3 bg-white p-4 rounded-2xl">
      <Image
        alt="apps"
        src={data?.app?.screenshoots[0]?.url}
        className="w-full mb-2 rounded-2xl h-52 object-contain"
        width={400}
        height={400}
      />
      <div className="content">
        <p className="mb-1 text-amber-500">Payment Pending</p>
        <p className="text-xl mb-2 h-14 line-clamp-2 cursor-pointer">
          {data?.app?.title}
        </p>
        <Button
          leftIcon={<BillingIconSVG className="w-6 h-6 text-white" />}
          className="flex items-center gap-2 bg-[#223CFF] hover:bg-[#223CFF]/80 px-4 rounded-md text-white font-normal text-base"
          onClick={handlePay}
          loading={installing.status && installing.id === data._id}
          disabled={installing.status && installing.id === data._id}
        >
          Pay Now
        </Button>
      </div>
    </div>
  );
};

export default PendingCard;
