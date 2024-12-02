'use client'
import { HamburgerSVG } from "@/app/assets/icons/Hamburger";
import { PublishIconSVG } from "@/app/assets/icons/PublishIcon";
import Link from "next/link";
import React from "react";
import { Avatar, Menu } from "@mantine/core";
import { MdOutlineLogout } from "react-icons/md";
import { getAuth } from "firebase/auth";
import firebase_app from "@/firebase/firebaseApp";
import { usePathname, useRouter } from "next/navigation";

const Navbar = ({ user, sidebarOpen, setSidebarOpen } : { 
  user: any,
  sidebarOpen: boolean,
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
 }) => {
  const auth = getAuth(firebase_app);
  const pathname = usePathname()
  const router = useRouter()

  const getInitialName = (name: string) => {
    const splitName = name.split(" ");
    const initialName = splitName.length > 1 ? splitName[0].charAt(0) + splitName[1].charAt(0) : splitName[0].charAt(0);
    return initialName;
  };

  const logout = () => {
    auth.signOut();
  };

  const getPathName = () => {
    if(pathname.startsWith('/home')) {
      return 'Home'
    } else if(pathname.startsWith('/billing')) {
      return 'Billing'
    } else if(pathname.startsWith('/store')) {
      return 'Store'
    } else if(pathname.startsWith('/publish')) {
      return 'Publish App'
    } else {
      return 'Home'
    }
  }
  return (
    <div className="shadow-sm w-full py-1 px-4 flex items-center justify-between bg-white">
      <div className="flex items-center gap-4">
        <HamburgerSVG className="w-6 h-6 cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)} />
        <Link href="/" className="uppercase">{getPathName()}</Link>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center justify-center cursor-pointer" onClick={() => router.push('/publish')}>
          <PublishIconSVG className="w-9 h-9" />
          <p>Publish App</p>
        </div>

        <Menu shadow="md" width={200} position="bottom-end">
          <Menu.Target>
            <Avatar
              color="blue"
              radius="xl"
              src={user?.photoURL}
              className="cursor-pointer"
              size="md"
            >
              {getInitialName(user?.displayName ?? "User")}
            </Avatar>
          </Menu.Target>

          <Menu.Dropdown >
            <Menu.Item icon={<MdOutlineLogout className="text-red-500" size={14} />} onClick={logout}>
              <span className="text-red-500">Logout</span>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
