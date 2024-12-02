import React from "react";

export const BillingIconSVG: React.FC<React.SVGProps<SVGSVGElement>> = (
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
        d="M41.6666 8.33337H8.33329C6.02079 8.33337 4.18746 10.1875 4.18746 12.5L4.16663 37.5C4.16663 39.8125 6.02079 41.6667 8.33329 41.6667H41.6666C43.9791 41.6667 45.8333 39.8125 45.8333 37.5V12.5C45.8333 10.1875 43.9791 8.33337 41.6666 8.33337ZM39.5833 37.5H10.4166C9.27079 37.5 8.33329 36.5625 8.33329 35.4167V25H41.6666V35.4167C41.6666 36.5625 40.7291 37.5 39.5833 37.5ZM41.6666 16.6667H8.33329V12.5H41.6666V16.6667Z"
        fill="white"
      />
    </svg>
  );
};
