import { join } from 'path';
import Command from '../../handler/command';

export default new Command({
    name: 'autoresponse',
    aliases: ['ar'],
    category: 'utility',
    description: 'Creates an automatic response that that bot will respond/react with when detected in any new messages.',
    info: '',
    cooldown: 0,
    minArgs: 0,
    maxArgs: Infinity,
    syntax: '<add/remove> <string "or phrase"> <reaction/response> <reaction/response to respond with>',
    guildOnly: true,
    devOnly: false,
    test: true,
    nsfw: false,
    noDisable: false,
    userPerms: ['MANAGE_GUILD'],
    botPerms: ['SEND_MESSAGES', 'ADD_REACTIONS', 'EMBED_LINKS'],
    fileLocation: join(__dirname, 'autoresponse'),
    execute: ({ message, args, client }) => {
        if(args)
        return message.reply({embeds: [client.success({message, data: `this is a placeholder`})]})
    }
});