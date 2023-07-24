import { HamburgerSVG } from "@/app/assets/icons/Hamburger";
import { PublishIconSVG } from "@/app/assets/icons/PublishIcon";
import { UserIconSVG } from "@/app/assets/icons/UserIcon";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="shadow-sm w-full py-1 px-4 flex items-center justify-between bg-white">
      <div className="flex items-center gap-4">
        <HamburgerSVG className="w-6 h-6" />
        <Link href="/">HOME</Link>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center justify-center">
            <PublishIconSVG className="w-9 h-9" />
            <p>Publish App</p>
        </div>
        <div className="bg-[#000B5B] p-2 rounded-full cursor-pointer">
            <UserIconSVG className="w-9 h-9" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
