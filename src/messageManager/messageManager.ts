import { botContext } from "../interfaces/botContext";
import { RegisteredMessage } from "../interfaces/registeredMessage";
import { mongoService } from "../services/MongoService";

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
    const originalMessage = context.text ?? '';
    const upperCaseMessage = originalMessage.toUpperCase();
    if (!this.registeredMessages.has(upperCaseMessage)) {
        const linkRegex = /^https/;
        if(originalMessage.match(linkRegex)) {
            mongoService.recordContentFromContext(context);
        }
      return;
    }
    const messageFunction = this.registeredMessages.get(upperCaseMessage);
    if(messageFunction !== undefined) {
        messageFunction(context);
    }
  }
}