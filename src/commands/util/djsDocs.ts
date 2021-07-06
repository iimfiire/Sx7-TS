import Command from '../../handler/command';
import axios from 'axios';
import { MessageEmbed } from 'discord.js';

export default new Command({
    name: 'docs',
    aliases: ['djs'],
    description: 'Fetches information from the discord.js framework documentation.',
    info: '',
    cooldown: 5000,
    botPerms: ['EMBED_LINKS', 'SEND_MESSAGES'],
    userPerms: ['SEND_MESSAGES'],
    category: 'utility',
    devOnly: false,
    guildOnly: false,
    maxArgs: Infinity,
    minArgs: 1,
    noDisable: false,
    nsfw: false,
    syntax: `<query>`,
    test: false,
    execute: ({message, args, client}) => {
        const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(args.join(" "))}`;
        axios.get(uri).then(res => {
            if(res.data && res.data.color)
                return message.reply({embeds: [new MessageEmbed(res.data)], allowedMentions: { repliedUser: false }})
        }).catch(err => {
            const channel = client.getChannel('850152902395166771')
            if(channel && channel.isText())
                channel.send({embeds: [client.error({message, data: `Error running docs command: ${err}`})]})
            return message.reply({embeds: [client.error({message, data: 'There was an error fetching the data from the documentation. Try again later.'})], allowedMentions: { repliedUser: false }})
        })

    }
})