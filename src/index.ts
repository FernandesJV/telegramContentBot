import { Telegraf } from 'telegraf'

const main = () => {
    if(process.env.BOT_TOKEN === undefined) {
        throw new Error('Bot token not defined in enviroment');
    }
}

main();