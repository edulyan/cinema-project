import axios from "axios";

const VOTE_PORT = "http://localhost:3033/vote";

export const VoteService = {
  async makeVote(dto: { movieId: string }) {
    const { data } = await axios.post<any>(`${VOTE_PORT}/makeVote`, dto, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });

    return data;
  },
};
