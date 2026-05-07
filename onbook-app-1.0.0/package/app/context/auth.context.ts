import { createContext } from "react-router";

export const authContext = createContext<{ token: string } | null>(null);
