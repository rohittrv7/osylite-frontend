import { useEffect } from "react";
import { socket } from "@/lib/socket";

export const useSocket = () => {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.on("connect_error", (err) => {
      console.error("Socket Connection Error:", err.message);
    });

    socket.on("connect", () => {
      console.log("Socket Connected:", socket.id);
    });

    return () => {
      // ❌ disconnect yahan mat karo
      // ChatPage unmount hone pe bhi
      // socket alive rehna chahiye
    };
  }, []);

  return socket;
};
