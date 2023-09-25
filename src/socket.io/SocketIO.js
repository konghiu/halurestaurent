import socketIO from "socket.io-client";
import { url } from "../components/service/APIService";
export const socket = socketIO.connect(url);
