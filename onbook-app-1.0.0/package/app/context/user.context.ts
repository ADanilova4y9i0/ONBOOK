import { createContext } from "react-router";

export const userContext = createContext<{
  id: string;
  login: string;
  avatar: string | null;
  isAdmin: boolean;
} | null>(null);
