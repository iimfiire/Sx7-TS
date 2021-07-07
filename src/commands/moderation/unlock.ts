import Command from '../../handler/command';

export default new Command({
    name: 'unlock',
    aliases: ['ul'],
    category: 'moderation',
    description: 'Allows users to send messages to a channel by updating permission overwrites for everyone to allow sending messages.',
    info: '',
    cooldown: 2000,
    minArgs: 0,
    maxArgs: Infinity,
    syntax: '',
    guildOnly: false,
    devOnly: false,
    test: true,
    nsfw: false,
    noDisable: false,
    userPerms: [],
    botPerms: [],
    execute: ({ message, args, client }) => {

    }
});