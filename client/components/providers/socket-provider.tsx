'use client';

import { useContext, createContext, useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";

interface ISocketContext {
  socket: null | Socket;
  isConnected: null | boolean;
}

const SocketContext = createContext<ISocketContext>({
  socket: null,
  isConnected: null
})

export const useSocket = () => useContext(SocketContext);

export default function SocketProvider({children, socketUrl}: {children: React.ReactNode; socketUrl: string}) {
  const [ socket, setSocket ] = useState<Socket | null>(null);
  const [ isConnected, setIsConnected ] = useState<boolean | null>(null);

  useEffect(() => {
    const socketInstance = io(socketUrl, {addTrailingSlash: false});

    socketInstance.on('connect', () => {
      setIsConnected(true)
    });
    socketInstance.on('discconnect', () => {
      setIsConnected(false)
    });

    setSocket(socket);

    return () => {
      socketInstance.disconnect();
    }
  }, []);

  return (
    <SocketContext.Provider value={{
      socket,
      isConnected
    }}>
      {children}
    </SocketContext.Provider>
  )
}