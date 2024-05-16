'use client';

import React from "react"
import { usePathname } from "next/navigation";

export const HOME_PATH = '/messenger'

export const ContainerMessages = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const pathname = usePathname();

  return (
    <div
      className={`${
        HOME_PATH !== pathname ? "flex" : "hidden md:flex"
      } rounded-xl grow bg-gray-950 ${className && className}`}
    >
      {children}
    </div>
  );
};

export const ContainerUsers = (
    {children, className}
    : {
        children: React.ReactNode
        className?: string;
    }
) => {

    const pathname = usePathname();

    return (
        <div className={`${HOME_PATH !== pathname ? 'hidden md:flex' : 'flex'} rounded-xl flex-col min-w-[260px] w-full md:max-w-[350px] animate-fade-in ${className && className}`}>
            {children}
        </div>
    )
}