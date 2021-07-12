import { join } from 'path';
import Command from '../../handler/command';

export default new Command({
    name: 'info',
    aliases: ['botinfo'],
    category: 'utility',
    description: 'Displays information about the bot.',
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
    botPerms: ['SEND_MESSAGES', 'EMBED_LINKS'],
    fileLocation: join(__dirname, 'info'),
    execute: ({ message, args, client }) => {
        if(args)
            return message.reply({embeds: [client.success({message, data: `this is a placeholder`})]})
    }
});