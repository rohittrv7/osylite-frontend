import { io, Socket } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:3000";

export const socket: Socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ["websocket"],
  autoConnect: false,
});
