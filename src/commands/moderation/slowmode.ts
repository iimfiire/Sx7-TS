import Command from '../../handler/command';
import ms from 'ms';
import { join } from 'path';

export default new Command({
	name: 'slowmode',
	aliases: ['sm'],
	category: 'moderation',
	description: 'Sets the slowmode in a channel.',
	info: '',
	cooldown: 2500,
	minArgs: 0,
	maxArgs: Infinity,
	syntax: '[channel/time] [time]',
	guildOnly: true,
	devOnly: false,
	test: true,
	nsfw: false,
	noDisable: false,
	userPerms: ['MANAGE_MESSAGES'],
	botPerms: ['MANAGE_CHANNELS', 'SEND_MESSAGES', 'EMBED_LINKS'],
	fileLocation:  join(__dirname, 'slowmode.js'),
	execute: async ({ message, args, client, prefix }) => {
		const channel = args[1]
			? await message.guild.channels.fetch(
					message.mentions.channels.first()
						? message.mentions.channels.first().id
						: !isNaN(parseInt(args[0]))
						? `${BigInt(args[0])}`
						: message.channel.id
			  )
			: message.channel;

		const time = args[1] ? 
			ms(args[1]) : 
				args[0] ? 
					isNaN(parseInt(args[0])) ? 
						ms(args[0]) : 
							parseInt(args[0]) * 1000 : 
								0;

		if (isNaN(time))
			return message.reply({
				embeds: [
					client.error({
						message,
						data: `An invalid time was provided. A valid time should look like \`${prefix}slowmode 2s\``,
					}),
				],
				allowedMentions: { repliedUser: false },
			});

		if (channel.type == 'text') {
			channel.setRateLimitPerUser(time / 1000);
			if (time == 0)
				return message.reply({
					embeds: [
						client.success({
							message,
							data: `Removed the slowmode from **${channel.name}**.`,
						}),
					],
					allowedMentions: { repliedUser: false },
				});
			return message.reply({
				embeds: [
					client.success({
						message,
						data: `Set the slowmode in **${channel.name}** to **${ms(time)}**.`,
					}),
				],
				allowedMentions: { repliedUser: false },
			});
		} else
			return message.reply({
				embeds: [
					client.error({
						message,
						data: `A slowmode cannot be set in **${channel}**.`,
					}),
				],
				allowedMentions: { repliedUser: false },
			});
	},
});
