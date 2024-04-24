import { botContext } from "../interfaces/botContext"
import { MessageManager } from "../messageManager/messageManager";

const pingPongFunction = (ctx: botContext) => {
    console.log('pong!');
    ctx.reply('pong');
}


export const registerMessages = () => {
    MessageManager.manager().registerMessage('ping', pingPongFunction);
}