'use client';

import BackButton from "@/components/BackButton";
import Container from "@/components/ui/initial/Container";
import Main from "@/components/ui/initial/Main";
import MainImages from "@/components/ui/initial/MainImages";
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
    <Main>
      <MainImages type="server" />
      <Container>
        <h1 className="text-3xl font-bold text-blue-400 text-center py-3 px-2">
          Something went wrong
        </h1>
        <button className="w-fit bg-gray-800 text-white py-2 px-5 rounded-full hover:bg-gray-700 mx-auto">
          Try Again
        </button>
      </Container>
    </Main>
  )

}