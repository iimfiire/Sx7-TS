import { TextChannel } from 'discord.js';
import Command from '../../handler/command';

export default new Command({
	name: 'unlock',
	aliases: ['ul'],
	category: 'moderation',
	description: 'Unlocks a previously locked text-channel.',
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
	botPerms: ['SEND_MESSAGES', 'MANAGE_CHANNELS', 'EMBED_LINKS'],
	execute: async ({ message, args, client }) => {
		const channel = args[0]
			? await message.guild.channels.fetch(
					message.mentions.channels.first()
						? message.mentions.channels.first().id
						: !isNaN(parseInt(args[0]))
						? `${BigInt(args[0])}`
						: message.channel.id
			  )
			: message.channel;

		const isLocked = (channel: TextChannel) => {
			if (channel.type == 'text') {
				const perms = channel.permissionsFor(message.guild.roles.everyone);
				return !perms.has('SEND_MESSAGES');
			}
			return false;
		};

		if (channel.isText() && channel.type == 'text') {
			if (isLocked(channel)) {
				await channel.permissionOverwrites.edit(
					message.guild.roles.everyone.id,
					{ SEND_MESSAGES: null }
				);
				return message.reply({
					embeds: [
						client.success({ message, data: `Unlocked **${channel.name}**` }),
					],
				});
			} else {
				return message.reply({
					embeds: [
						client.error({
							message,
							data: `**${channel.name}** is not locked.`,
						}),
					],
					allowedMentions: { repliedUser: false },
				});
			}
		} else
			return message.reply({
				embeds: [
					client.error({ message, data: `**${channel}** is not locked.` }),
				],
				allowedMentions: { repliedUser: false },
			});
	},
});
