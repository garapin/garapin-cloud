import React from "react";
import { Carousel } from "@mantine/carousel";
import Image from "next/image";
import { DownloadIconSVG } from "@/app/assets/icons/DownloadIcon";
import { createStyles } from "@mantine/core";

const Banner = () => {
  const { classes } = useStyles();
  return (
    <Carousel
      mx="auto"
      withIndicators
      loop
      withControls={false}
      styles={{
        indicator: {
          transition: "width 250ms ease",
          backgroundColor: "white",
        },
      }}
      className={classes.carousel}
    >
      {[1, 2, 3].map((item) => (
        <Carousel.Slide>
          <div
            className={`bg-[#344289] rounded-[24px] flex gap-6 items-center text-white py-4 px-6`}
          >
            <Image
              alt="garapin-cloud"
              src="/images/inventory-system.png"
              className="w-[400px]"
              width={400}
              height={400}
            />
            <div className="flex flex-col justify-between h-full">
              <h2 className="text-3xl mb-2">INVENTORY SYSTEM</h2>
              <p className="text-xl font-light pr-4 mb-14">
                Butuh Inventory system untuk kontrol stok kamu di market-place
                seperti Tokopedia, Shopee dan Lazada? Cari Aplikasi Inventory
                Kamu di Marketplace Kami, Dan mulai kontrol inventory Kamu.
              </p>
              <div className="flex items-center justify-end pr-4">
                <button className="flex items-center gap-2 bg-[#223CFF] hover:bg-[#223CFF]/80 px-4 py-2 rounded-md">
                  <DownloadIconSVG className="w-6 h-6" />
                  <span>Install Now</span>
                </button>
              </div>
            </div>
          </div>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default Banner;

const useStyles = createStyles((theme) => ({
  carousel: {
    "& .mantine-Carousel-indicators": {
        bottom: '-2rem',

        button: {
            backgroundColor: '#D9D9D9',
            height: '8px',
            width: '8px',

            "&[data-active='true']": {
                backgroundColor: '#344289',
                width: '40px'
            }
        }
    }
  },
}));
