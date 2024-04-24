'use client'

import { useContext, createContext, useState } from "react";

interface IVerifyEmailContext {
  isVerified: boolean | null;
  setIsVerified: (data: boolean | null) => void
}

const VerifyEmailContext = createContext<IVerifyEmailContext>({
  isVerified: null,
  setIsVerified: (data: boolean | null) => {}
})

export const useVerifyEmail = () => useContext(VerifyEmailContext);

export default function VerifyEmailProvider ({children}: {children: React.ReactNode}){
  const [isVerified, setIsVerified] = useState<null | boolean>(null);

  const handleIsVerified = (verify: boolean | null) => setIsVerified(verify);

  return (
    <VerifyEmailContext.Provider
      value={{
        isVerified,
        setIsVerified: handleIsVerified
      }}
    >
      {children}
    </VerifyEmailContext.Provider>
  )
}