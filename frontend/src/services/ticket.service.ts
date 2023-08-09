import axios from "axios";
import { IBuyTicketReq, ITicket } from "@/models/ticket";

const TICKET_PORT = "http://localhost:3033/ticket";

export const TicketService = {
  async butTicket(dto: IBuyTicketReq) {
    const { data } = await axios.post<ITicket>(`${TICKET_PORT}`, dto, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });

    return data;
  },
};
