import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import SocketProvider from "@/components/providers/socket-provider";
import VerifyEmailProvider from "@/components/providers/verify-email-provider";

export const runtime = 'edge';

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s - Chat App',
    default: 'Chat App'
  },
  description: "Chat app with NextJS and NodeJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SocketProvider socketUrl={process.env.SOCKET_URL!}>
          <VerifyEmailProvider>
            {children}
          </VerifyEmailProvider>
        </SocketProvider>
      </body>
    </html>
  );
}
