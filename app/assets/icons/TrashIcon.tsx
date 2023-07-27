import React from "react";

export const TrashSVG: React.FC<React.SVGProps<SVGSVGElement>> = (
  props?: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      width="47"
      height="60"
      viewBox="0 0 47 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.33333 53.3333C3.33333 57 6.33333 60 10 60H36.6667C40.3333 60 43.3333 57 43.3333 53.3333V13.3333H3.33333V53.3333ZM11.5333 29.6L16.2333 24.9L23.3333 31.9667L30.4 24.9L35.1 29.6L28.0333 36.6667L35.1 43.7333L30.4 48.4333L23.3333 41.3667L16.2667 48.4333L11.5667 43.7333L18.6333 36.6667L11.5333 29.6ZM35 3.33333L31.6667 0H15L11.6667 3.33333H0V10H46.6667V3.33333H35Z"
        fill="white"
      />
    </svg>
  );
};
