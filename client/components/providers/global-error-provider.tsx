'use client'

import { createContext, useState, useContext } from "react";

interface IGlobalErrorContext {
  error: string | null;
  setError: (error: string | null) => void;
}

const GlobalErrorContext = createContext<IGlobalErrorContext>({
  error: null,
  setError: (error: string | null) => {}
})

export const useGlobalError = () => useContext(GlobalErrorContext);

export default function GlobalErrorProvider({children}: {children: React.ReactNode}) {
  const [error, setError] = useState<string | null>(null);
  
  const handleSetError = (error: string | null) => setError(error);

  return (
    <GlobalErrorContext.Provider
      value={{
        error,
        setError: handleSetError
      }}
    >
      {children}
    </GlobalErrorContext.Provider>
  )
}