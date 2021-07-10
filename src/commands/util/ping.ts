import Command from '../../handler/command';
import { join } from 'path';

export default new Command({
    name: 'ping',
    // aliases: [],
    category: 'utility',
    description: 'Generates a ping which represents the latency between the command being run and it being registered with the bot.',
    info: '',
    cooldown: 0,
    minArgs: 0,
    maxArgs: Infinity,
    syntax: '',
    guildOnly: false,
    devOnly: false,
    test: false,
    nsfw: false,
    noDisable: false,
    userPerms: ['SEND_MESSAGES'],
    botPerms: ['SEND_MESSAGES'],
    fileLocation: join(__dirname, 'ping.js'),
    execute: ({ message, client }) => {
        return message.reply({content: `🏓 in ${client.ws.ping}ms.`}).catch(() => {
            return;
        });
    }
});