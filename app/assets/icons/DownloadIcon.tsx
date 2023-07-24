import React from "react";

export const DownloadIconSVG: React.FC<React.SVGProps<SVGSVGElement>> = (
  props?: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M40.3125 20.9166C38.8958 13.7291 32.5833 8.33325 25 8.33325C18.9792 8.33325 13.75 11.7499 11.1458 16.7499C4.875 17.4166 0 22.7291 0 29.1666C0 36.0624 5.60417 41.6666 12.5 41.6666H39.5833C45.3333 41.6666 50 36.9999 50 31.2499C50 25.7499 45.7292 21.2916 40.3125 20.9166ZM35.4167 27.0833L25 37.4999L14.5833 27.0833H20.8333V18.7499H29.1667V27.0833H35.4167Z"
        fill="white"
      />
    </svg>
  );
};
