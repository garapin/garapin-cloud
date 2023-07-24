import React from "react";

export const PublishIconSVG: React.FC<React.SVGProps<SVGSVGElement>> = (
  props?: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      width="70"
      height="52"
      viewBox="0 0 70 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M56.4375 19.8867C54.4542 8.92961 45.6167 0.703857 35 0.703857C26.5708 0.703857 19.25 5.91244 15.6042 13.5348C6.825 14.5511 0 22.6498 0 32.4635C0 42.976 7.84583 51.5193 17.5 51.5193H55.4167C63.4667 51.5193 70 44.4052 70 35.6395C70 27.2549 64.0208 20.4584 56.4375 19.8867ZM40.8333 29.2876V41.9914H29.1667V29.2876H20.4167L35 13.4077L49.5833 29.2876H40.8333Z"
        fill="#223CFF"
      />
    </svg>
  );
};
