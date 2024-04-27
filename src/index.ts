import { Telegraf } from 'telegraf';
import { MessageManager } from './messageManager/messageManager';
import { registerMessages } from './messages/messages';

const main = () => {
    const BOT_TOKEN = process.env.BOT_TOKEN;
    if(BOT_TOKEN === undefined) {
        throw new Error('Bot token not defined in enviroment');
    }

    const bot = new Telegraf(BOT_TOKEN);

    bot.on('message', (ctx) => {
        MessageManager.manager().executeMessageFunction(ctx);
    })
    registerMessages();

    bot.launch();
}

main();
