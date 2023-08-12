import React, { useEffect } from "react";
import { Carousel } from "@mantine/carousel";
import Image from "next/image";
import { createStyles } from "@mantine/core";
import axios from "axios";

const Banner = () => {
  const { classes } = useStyles();
  const [banners, setBanners] = React.useState([]);
  const handleGetBanners = async () => {
    const res = await axios.get("/api/banner");
    setBanners(res.data.data);
  };

  useEffect(() => {
    handleGetBanners();
  }, []);

  if (banners.length === 0) {
    return null;
  }
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
      {banners.map((banner: { image: string; url: string }, i) => (
        <Carousel.Slide key={i}>
          <Image
            alt="garapin-cloud"
            src={banner.image}
            className="w-full rounded-[24px] cursor-pointer"
            width={1000}
            height={250}
            onClick={() => window.open(banner.url, "_blank")}
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default Banner;

const useStyles = createStyles((theme) => ({
  carousel: {
    "& .mantine-Carousel-indicators": {
      bottom: "-2rem",

      button: {
        backgroundColor: "#D9D9D9",
        height: "8px",
        width: "8px",

        "&[data-active='true']": {
          backgroundColor: "#344289",
          width: "40px",
        },
      },
    },
  },
}));
