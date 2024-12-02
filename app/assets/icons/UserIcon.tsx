import React from "react";

export const UserIconSVG: React.FC<React.SVGProps<SVGSVGElement>> = (
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
        d="M24.9997 25.0002C29.6038 25.0002 33.333 21.271 33.333 16.6668C33.333 12.0627 29.6038 8.3335 24.9997 8.3335C20.3955 8.3335 16.6663 12.0627 16.6663 16.6668C16.6663 21.271 20.3955 25.0002 24.9997 25.0002ZM24.9997 29.1668C19.4372 29.1668 8.33301 31.9585 8.33301 37.5002V41.6668H41.6663V37.5002C41.6663 31.9585 30.5622 29.1668 24.9997 29.1668Z"
        fill="white"
      />
    </svg>
  );
};
