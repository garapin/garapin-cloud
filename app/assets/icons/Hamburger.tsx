import React from "react";

export const HamburgerSVG: React.FC<React.SVGProps<SVGSVGElement>> = (
  props?: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      width="60"
      height="49"
      viewBox="0 0 60 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 0.397217H60V8.49351H0V0.397217ZM0 20.638H60V28.7343H0V20.638ZM0 40.8787H60V48.975H0V40.8787Z"
        fill="#223CFF"
      />
    </svg>
  );
};
