'use client';

import { useContext, createContext, useState } from "react";

interface ILoadingContext {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

const LoadingContext = createContext<ILoadingContext>({
    isLoading: false,
    setIsLoading: (isLoading: boolean) => {}
})

export const useLoading = () => useContext(LoadingContext);

export default function LoadingProvider({children}: {children: React.ReactNode}) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <LoadingContext.Provider
            value={{
                isLoading,
                setIsLoading
            }}
        >
            {children}
        </LoadingContext.Provider>
    )
}