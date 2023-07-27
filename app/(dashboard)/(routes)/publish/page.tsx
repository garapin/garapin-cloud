"use client";
import Image from "next/image";
import { IoMdStar } from "react-icons/io";
import { FaPlay, FaPlus } from "react-icons/fa";
import { Switch, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

export default function Publish() {
  return (
    <main className="space-y-10">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl">My Application</h2>
          <button className="bg-blue-600 hover:bg-blue-600/80 flex items-center gap-2 text-white px-4 py-2 rounded-md">
            <FaPlus className="w-6 h-6" />
            <span>Add New</span>
          </button>
        </div>
        <div className="grid grid-cols-12 gap-4">
          {[1, 2, 3, 4].map((item) => {
            const [checked, setChecked] = useState(false);
            const theme = useMantineTheme();
            return (
              <div className="col-span-3 bg-white p-4 rounded-2xl">
                <Image
                  alt="apps"
                  src="/images/apps-img.png"
                  className="w-full mb-2"
                  width={400}
                  height={400}
                />
                <div className="content">
                  <p className="text-xl mb-2">Inventory System</p>
                  <div className="rating flex gap-2 mb-1">
                    <span className="text-sm text-yellow-400">4.3</span>
                    <div className="flex items-center gap-1">
                      <IoMdStar className="text-yellow-400" />
                      <IoMdStar className="text-yellow-400" />
                      <IoMdStar className="text-yellow-400" />
                      <IoMdStar className="text-yellow-400" />
                      <IoMdStar className="text-yellow-400" />
                    </div>
                    <span className="text-slate-500 text-sm">(16,325)</span>
                  </div>
                  <p>Pricing</p>
                  <p className="text-slate-500 text-sm">
                    <span className="text-blue-500">Rp. 125.000 </span>
                  </p>
  
                  <div className="action mt-2">
                    <Switch
                      checked={checked}
                      onChange={(event) =>
                        setChecked(event.currentTarget.checked)
                      }
                      color="violet"
                      size="md"
                      label={checked ? <span className="text-green-500">PUBLISHED</span> : <span>UNPUBLISHED</span>}
                      thumbIcon={
                        checked ? (
                          <AiOutlineCheck
                            size="0.8rem"
                            color='#000'
                            stroke={3}
                          />
                        ) : (
                          <AiOutlineClose
                            size="0.8rem"
                            color={theme.colors.red[theme.fn.primaryShade()]}
                            stroke={3}
                          />
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  );
}
