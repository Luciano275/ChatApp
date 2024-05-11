'use client';

import { useLoading } from "./providers/loading-provider";

export default function Loading() {
    const { isLoading } = useLoading()

    if (isLoading) {
        return (
            <div
              className="fixed top-0 left-0 w-full max-w-full min-h-dvh max-h-dvh flex justify-center items-center bg-black bg-opacity-50"
              style={{
                zIndex: 9999,
              }}
            >
              <span
                className="block w-[50px] h-[50px] border-4 border-blue-500 rounded-full border-t-white animate-spin-clockwise"
                style={{
                  animationIterationCount: "infinite",
                  animationTimingFunction: "ease-in-out",
                  animationDuration: "1s",
                }}
              ></span>
            </div>
          );
    }
}