'use client';

import { FaX } from "react-icons/fa6";
import { useGlobalError } from "./providers/global-error-provider"

export default function GlobalError() {

  const { error, setError } = useGlobalError()

  if (error) {
    return (
      <div className="fixed flex items-center bottom-4 right-4 bg-red-600 bg-opacity-80 text-white rounded-lg w-fit max-w-[300px] p-2" style={{
        zIndex: 9999
      }}>
        <p className="grow">Something went wrong</p>
        <span className="px-2 text-neutral-400 hover:text-white cursor-pointer" onClick={() => setError(null)}>
          <FaX size={12} />
        </span>
      </div>
    )
  }
}