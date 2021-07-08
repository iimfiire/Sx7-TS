import Command from '../../handler/command';

export default new Command({
	name: 'lock',
	aliases: ['l'],
	category: 'moderation',
	description: 'Locks a text-channel, preventing users from sending messages.',
	info: '',
	cooldown: 2000,
	minArgs: 0,
	maxArgs: Infinity,
	syntax: '[channel mention or id]',
	guildOnly: true,
	devOnly: false,
	test: false,
	nsfw: false,
	noDisable: false,
	userPerms: ['MANAGE_MESSAGES'],
	botPerms: ['MANAGE_CHANNELS', 'SEND_MESSAGES', 'EMBED_LINKS'],
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

		if (!channel.isText() || channel.type !== 'text')
			return message.reply({
				embeds: [
					client.error({
						message,
						data: `The provided channel must be a text-channel.`,
					}),
				],
				allowedMentions: { repliedUser: false },
			});

		if (!channel) {
			message.reply({
				embeds: [
					client.error({
						message,
						data: `Channel not found. You can mention a channel or use a channel id as the first argument when running this command.`,
					}),
				],
				allowedMentions: { repliedUser: false },
			});
			client.cooldowns.setCooldown(message.author, 'lock', new Date(0));
			return;
		} else {
			if (channel.type == 'text' && channel.isText()) {
				await channel.permissionOverwrites.create(
					message.guild.roles.everyone.id,
					{ SEND_MESSAGES: false }
				);
				return message.reply({
					embeds: [
						client.success({ message, data: `Locked **${channel.name}**.` }),
					],
					allowedMentions: { repliedUser: false },
				});
			}
		}
	},
});
