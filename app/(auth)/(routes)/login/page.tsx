import Image from "next/image";
import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-6 relative">
        <Image
          width={800}
          height={800}
          src="/images/login-img.png"
          alt="garapin-cloud"
          className="w-full h-screen opacity-60 object-cover"
        />
        <div className="absolute top-0 left-0 h-screen w-full bg-indigo-500/20 flex items-center justify-center">
          <Image
            width={800}
            height={300}
            src="/images/logo.png"
            alt="garapin-cloud"
            className="max-w-lg"
          />
        </div>
      </div>
      <div className="col-span-6">
        <div className="max-w-xl mx-auto flex flex-col h-screen">
          <div className="flex-1 flex flex-col items-center justify-center h-full space-y-10">
            <h2 className="text-4xl mb-4">/START HERE</h2>
            <Link href="/" className="w-60 shadow-md flex items-center gap-4 p-6 cursor-pointer bg-white hover:bg-white/80">
              <Image
                width={28}
                height={28}
                src="/images/google.png"
                alt="google"
              />
              <span>Google</span>
            </Link>
            <Link href='/' className="w-60 shadow-md flex items-center gap-4 p-6 cursor-pointer bg-white hover:bg-white/80">
              <Image
                width={28}
                height={28}
                src="/images/facebook.png"
                alt="facebook"
              />
              <span>Facebook</span>
            </Link>
          </div>
          <div className="flex items-center gap-2 pb-16 justify-center">
            <Image
              width={28}
              height={28}
              src="/images/google.png"
              alt="google"
            />
            <span>
              Punya email tapi tidak punya google account? klik disini.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
