import { botContext } from "../interfaces/botContext";
import { RegisteredMessage } from "../interfaces/registeredMessage";

export class MessageManager {
  private static instance: MessageManager;

  static manager() {
    if (!this.instance) {
      this.instance = new MessageManager();
    }
    return this.instance;
  }

  registeredMessages: RegisteredMessage = new Map<
    string,
    (ctx: botContext) => void
  >();

  public registerMessage(
    message: string,
    messageFunction: (ctx: botContext) => void
  ): void {
    this.registeredMessages.set(message.toUpperCase(), messageFunction);
  }

  public executeMessageFunction(context: botContext): void {
    const message = context.text?.toUpperCase() ?? '';
    if (!this.registeredMessages.has(message)) {
      return;
    }
    const messageFunction = this.registeredMessages.get(message);
    if(messageFunction !== undefined) {
        messageFunction(context);
    }
  }
}