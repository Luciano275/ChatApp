'use client'

import { createContext, useState, useContext } from "react";

interface IGlobalErrorContext {
  message: string | null;
  state: 'error' | 'success' | null;
  setMessage: (msg: string | null, state: 'error' | 'success' | null) => void;
}

const GlobalErrorContext = createContext<IGlobalErrorContext>({
  message: null,
  state: null,
  setMessage: (msg: string | null, state: 'error' | 'success' | null) => {}
})

export const useGlobalMessage = () => useContext(GlobalErrorContext);

export default function GlobalMessageProvider({children}: {children: React.ReactNode}) {
  const [message, setMessage] = useState<string | null>(null);
  const [state, setState] = useState<'error' | 'success' | null>(null);
  
  const handleSetMessage = (msg: string | null, state: 'error' | 'success' | null) => {
    setMessage(msg);
    setState(state);
  };

  return (
    <GlobalErrorContext.Provider
      value={{
        message,
        state,
        setMessage: handleSetMessage
      }}
    >
      {children}
    </GlobalErrorContext.Provider>
  )
}