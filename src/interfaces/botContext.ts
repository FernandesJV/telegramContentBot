import { Context, NarrowedContext } from "telegraf";
import { Message, Update } from "telegraf/types";

export type botContext = NarrowedContext<Context<Update>, Update.MessageUpdate<Message>>;