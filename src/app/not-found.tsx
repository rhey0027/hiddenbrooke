"use client";

import Image from "next/image";
import Link from "next/link";

const Notfound = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-300 to-violet-800">
      <span className="flex items-center justify-center pt-15">
        <Image
          src="/logo/brooke.png"
          width={100}
          height={70}
          alt="logo"
        ></Image>
      </span>
      <div className="flex flex-col items-center justify-center">
        <code className="font-semibold text-red-800 text-2xl px-2 text-center mb-4 mt-10 animate-pulse">
          Page is under development...
        </code>
        <p className="font-medium text-lg">Sorry for the inconvenience</p>
        <div className="p-4 flex flex-col items-center justify-center">
          <h1 className="capitalize text-sm font-bold">
            why not try our simple memory booster game!
          </h1>
          <span className="text-lg font-light capitalize mt-4">
            MAISIP version 2
          </span>{" "}
          <p>Click the image to start playing...</p>
          <div className="mt-2 cursor-pointer">
            <Link href="https:maisip-v3.vercel.app">
              <Image
                src="/logo/phonegame.png"
                width={100}
                height={300}
                alt="phone logo game"
                className="object-contain"
              ></Image>
            </Link>
            {/* <Link href="https://maisip-v3.vercel.app">
            https://maisip-v3.vercel.app
          </Link> */}
          </div>
        </div>
        <p className="p-3 font-medium mt-5 text-center">
          Click Home Button para bumalik sa Homepage. Gracias.
        </p>
      </div>
      <div className="flex items-center justify-center mt-5">
        <Link href="/">
          <button className="bg-linear-to-r from bg-sky-300 to-blue-500 px-8 py-2 shadow-md rounded-full text-gray-200 cursor-pointer hover:scale-105 transition-all ease-in-out">
            Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Notfound;
