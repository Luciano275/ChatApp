"use client";

import { useGlobalMessage } from "./providers/global-message-provider";

export default function GlobalMessage() {
  const { message, setMessage, state } = useGlobalMessage();

  if (message) {
    return (
      <div
        className={`fixed flex items-center bottom-4 right-4 ${state === 'error' ? 'bg-red-600' : 'bg-green-600'} bg-opacity-80 text-white rounded-lg w-fit max-w-[300px] p-2`}
        onClick={() => setMessage(null, null)}
        style={{
          zIndex: 9999,
        }}
      >
        <p>Something went wrong</p>
      </div>
    );
  }
}
