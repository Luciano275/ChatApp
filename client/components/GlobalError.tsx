"use client";

import { useGlobalError } from "./providers/global-error-provider";

export default function GlobalError() {
  const { error, setError } = useGlobalError();

  if (error) {
    return (
      <div
        className="fixed flex items-center bottom-4 right-4 bg-red-600 bg-opacity-80 text-white rounded-lg w-fit max-w-[300px] p-2"
        onClick={() => setError(null)}
        style={{
          zIndex: 9999,
        }}
      >
        <p>Something went wrong</p>
      </div>
    );
  }
}
