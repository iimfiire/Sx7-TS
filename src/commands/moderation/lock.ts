import Command from '../../handler/command';

export default new Command({
    name: 'lock',
    // aliases: [],
    category: 'moderation',
    description: 'Prevents users from typing in a channel by updating permission overwrites for the "everyone" role.',
    info: '',
    cooldown: 2000,
    minArgs: 0,
    maxArgs: Infinity,
    syntax: '[channel mention or id]',
    guildOnly: true,
    devOnly: false,
    test: true,
    nsfw: false,
    noDisable: false,
    userPerms: ['MANAGE_MESSAGES'],
    botPerms: ['MANAGE_CHANNELS', 'SEND_MESSAGES', 'EMBED_LINKS'],
    execute: async ({ message, args, client }) => {
        
        const channel = args[0] ? await message.guild.channels.fetch(message.mentions.channels.first() ? message.mentions.channels.first().id : typeof BigInt(args[0]) == 'bigint' ? `${BigInt(args[0])}` : message.channel.id) || undefined : message.channel;

        if(!channel) {
            message.reply({embeds: [client.error({message, data: `Channel not found. You can mention a channel or use a channel id as the first argument when running this command.`})]});
            client.cooldowns.setCooldown(message.author, 'lock', new Date(0));
            return;
        };
    }
});