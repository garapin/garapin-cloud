import React from "react";

export const ArrowRightSVG: React.FC<React.SVGProps<SVGSVGElement>> = (
  props?: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.80005 6.86659L22.9334 19.9999L9.80005 33.1333L13.3334 36.6666L30 19.9999L13.3334 3.33325L9.80005 6.86659Z"
        fill="white"
      />
    </svg>
  );
};
