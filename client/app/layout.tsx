import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import SocketProvider from "@/components/providers/socket-provider";
import GlobalErrorProvider from "@/components/providers/global-error-provider";
import GlobalError from "@/components/GlobalError";

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
        <GlobalErrorProvider>
          <GlobalError />
          <SocketProvider socketUrl={process.env.SOCKET_URL!}>
            {children}
          </SocketProvider>
        </GlobalErrorProvider>
      </body>
    </html>
  );
}
