"use client";
import { DownloadIconSVG } from "@/app/assets/icons/DownloadIcon";
import Image from "next/image";
import { IoMdStar } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import axios from "axios";
import Banner from "@/components/banner";
import { useState } from "react";
import { storage } from "@/firebase/firebaseApp";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const getData = async () => {
  const data = await axios.get("/api/restaurant");

  console.log(data);
};

const postData = async () => {
  const payload = {
    title: "Inventory App2",
    logo: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    version: "1.0.0",
    category: "inventory",
    description:
      "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.  lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.  lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.  lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.  lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. ",
    price: 100000,
    source:
      "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    support_detail: "Testing",
    status: "active",
    user_id: "1",
    screenshoots: [
      {
        id: 1,
        url: "dw",
      },
    ],
    software_included: [],
    base_image: "MySQL 8.0 & PHP 7.4",
  };
  const data = await axios.post("/api/restaurant", payload);

  console.log(data);
};

export default function Home() {
  const [image, setImage] = useState(null);

  const uploadImage = async (e: any) => {
    setImage(e.target.files[0]);

    const storageRef: any = ref(storage, `images/${e.target.files[0].name}`);

    uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
      console.log("Uploaded a blob or file!", snapshot);

      getDownloadURL(storageRef).then((url) => {
        console.log("url", url);
      });
    });
  };

  const uploadMultipleImage = async (e: any) => {
    const files = e.target.files;
    const promises = [];

    for (let i = 0; i < files.length; i++) {
      const storageRef: any = ref(storage, `images/${files[i].name}`);
      promises.push(
        uploadBytes(storageRef, files[i]).then((snapshot) => {
          console.log("Uploaded a blob or file!", snapshot);
          getDownloadURL(storageRef).then((url) => {
            console.log("url", url);
          });
        })
      );
    }

    Promise.all(promises).then((snapshots) => {
      console.log("All files uploaded");
    });
  };
  return (
    <main className="space-y-10">
      <section className="pb-4">
        <Banner />
      </section>
      <section>
        <h2 className="text-2xl mb-4">Installed Apps</h2>
        <div className="grid grid-cols-12 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div className="col-span-3 bg-white p-4 rounded-2xl">
              <Image
                alt="apps"
                src="/images/apps-img.png"
                className="w-full mb-2"
                width={400}
                height={400}
              />
              <div className="content">
                <p className="mb-1">Installed</p>
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
                <p>Next Billing</p>
                <p className="text-slate-500 text-sm">
                  <span className="text-blue-500">Rp. 125.000 </span>
                  on 24-Mei-2023
                </p>

                <div className="action mt-2">
                  <button
                    className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded-md text-white"
                    onClick={() =>
                      window.open("/home/237623286d6tdbtwuds", "_blank")
                    }
                  >
                    <FaPlay className="w-6 h-6 text-white" />
                    <span>Launch</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
