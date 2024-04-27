'use client';

import Error from "next/error";
import { useEffect } from "react";

export default function ErrorPage(
  { error, reset }
  : {
    error: Error & { digest?: string };
    reset: () => void
  }
) {

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex flex-1 justify-center items-center flex-col">
      <h2>Something went wrong!</h2>
      <button
        onClick={() => reset()}
      >
        Try again
      </button>
    </main>
  )

}