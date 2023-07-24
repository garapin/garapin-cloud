'use client'
import { ArrowRightSVG } from "@/app/assets/icons/ArrowRight";
import { BillingIconSVG } from "@/app/assets/icons/BillingIcon";
import { HomeIconSVG } from "@/app/assets/icons/HomeIcon";
import { StoreIconSVG } from "@/app/assets/icons/StoreIcon";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const routes = [
    {
      name: "Home",
      path: "/",
      icon: HomeIconSVG,
    },
    {
      name: "Store",
      path: "/store",
      icon: StoreIconSVG,
    },
    {
      name: "Billing",
      path: "/billing",
      icon: BillingIconSVG,
    },
  ];
  return (
    <div>
      <div className="bg-indigo-500 p-5 mb-4">
        <Image
          alt="garapin-cloud"
          src="/images/logo.png"
          width={200}
          height={200}
        />
      </div>
      <div className="p-4">
        <ul className="space-y-4">
          {routes.map((route, index) => (
            <li className="flex items-center" key={index}>
              <Link
                href={route.path}
                className="flex items-center justify-between flex-1 text-white hover:text-white p-4 hover:bg-blue-900/20 rounded-md"
              >
                <div className="flex items-center gap-4">
                  <route.icon className="w-6 h-6" />
                  <span>{route.name}</span>
                </div>
                {pathname === route.path && (
                  <ArrowRightSVG className="w-6 h-6" />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
