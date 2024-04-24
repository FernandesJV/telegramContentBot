import { botContext } from "./botContext";

export type RegisteredMessage = Map<string, (ctx: botContext) => void>;