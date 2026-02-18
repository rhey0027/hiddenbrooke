"use client";

import { useState } from "react";

export default function VideoAai() {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className="bg-linear-to-br from-orange-700 to-violet-500 text-white px-4 py-2 rounded-full flex items-center justify-center mx-auto mt-8 cursor-pointer shadow-lg hover:scale-105 transition-all duration-300"
      >
        Ai Tour Guide
      </button>
      {show && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 rounded-lg bg-opacity-75">
          <div className="bg-transparent p-2 rounded lg relative">
            <button
              onClick={() => setShow(false)}
              className="absolute bg-red-400  -top-3 text-black w-7 h-7 rounded-full cursor-pointer"
            >
              X
            </button>
            <video
              src="/video/resort.mp4"
              autoPlay
              controls
              className="w-70 "
            ></video>
          </div>
        </div>
      )}
    </>
  );
}
