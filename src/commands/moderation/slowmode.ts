import Command from '../../handler/command';
import ms from 'ms'

export default new Command({
    name: 'slowmode',
    aliases: ['sm'],
    category: 'moderation',
    description: 'Sets the slowmode in a channel.',
    info: '',
    cooldown: 2500,
    minArgs: 1,
    maxArgs: Infinity,
    syntax: '[channel/time] [time]',
    guildOnly: true,
    devOnly: false,
    test: true,
    nsfw: false,
    noDisable: false,
    userPerms: ['MANAGE_MESSAGES'],
    botPerms: ['MANAGE_CHANNELS', 'SEND_MESSAGES', 'EMBED_LINKS'],
    execute: async ({ message, args, client }) => {
        const channel = args[1]
        ? await message.guild.channels.fetch(
                message.mentions.channels.first()
                    ? message.mentions.channels.first().id
                    : !isNaN(parseInt(args[0]))
                    ? `${BigInt(args[0])}`
                    : message.channel.id
          )
        : message.channel;
        const time = args[1] ? ms(args[1]) : ms(args[0])
        if(isNaN(time)) return;

        if(channel.type == 'text') {
            channel.setRateLimitPerUser(time / 1000)
            message.reply('set slowmode')
        } else return;
    }
});