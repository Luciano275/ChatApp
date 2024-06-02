import InitialMessage from "@/components/ui/messenger/InitialMessage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Messenger'
}

export default async function MessengerPage() {
  return (
    <>
      <InitialMessage />
    </>
  )
}