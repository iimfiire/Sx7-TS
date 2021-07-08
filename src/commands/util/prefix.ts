import { MessageEmbed } from 'discord.js';
import Command from '../../handler/command';

export default new Command({
	name: 'prefix',
	aliases: ['p'],
	category: 'utility',
	description:
		'Allows users to view, add, or remove prefixes that the bot will respond to.',
	info: '',
	cooldown: 2500,
	minArgs: 0,
	maxArgs: Infinity,
	syntax: '[+/-] [prefix]',
	guildOnly: true,
	devOnly: false,
	test: true,
	nsfw: false,
	noDisable: true,
	userPerms: ['MANAGE_GUILD'],
	botPerms: ['SEND_MESSAGES', 'EMBED_LINKS'],
	execute: ({ message, args, client, prefix }) => {
		const addOptions = ['+', 'add', 'create', 'new'];
		const removeOptions = ['-', 'remove', 'delete', 'del', 'rem'];
		const option = args[1]
			? addOptions.includes(args[0])
				? 'add'
				: removeOptions.includes(args[0])
				? 'remove'
				: undefined
			: undefined;
		let prefixDoc = client.databaseCache.getDoc('prefixes', message.guild.id);
		if (option) {
			if (option == 'add') {
				if (prefixDoc.prefixes.includes(args[1]))
					return message.reply({
						embeds: [
							client.error({
								message,
								data: `**${args[1]}** is already a prefix in **${message.guild.name}**`,
							}),
						],
						allowedMentions: { repliedUser: false },
					});
				if (prefixDoc.prefixes.length + 1 > 10)
					return message.reply({
						embeds: [
							client.error({
								message,
								data: `Each guild can have a maximum of **10** prefixes. To add another prefix, you must first remove one.`,
							}),
						],
						allowedMentions: { repliedUser: false },
					});
				prefixDoc.prefixes.push(args[1]);
				client.databaseCache.updateDoc('prefixes', prefixDoc);
				return message.reply({
					embeds: [
						client.success({
							message,
							data: `**${args[1]}** added to the  prefixes in **${message.guild.name}**`,
						}),
					],
					allowedMentions: { repliedUser: false },
				});
			} else {
				if (prefixDoc.prefixes.length - 1 < 1)
					return message.reply({
						embeds: [
							client.error({
								message,
								data: `Each guild must have at least **1** prefix. Add another prefix before removing this one.`,
							}),
						],
						allowedMentions: { repliedUser: false },
					});
				if (
					prefixDoc.prefixes.filter((prefix) => prefix == args[1]).length == 0
				)
					return message.reply({
						embeds: [
							client.error({
								message,
								data: `That doesn't seem to be a prefix in **${message.guild.name}**. Make sure you typed it correctly.`,
							}),
						],
						allowedMentions: { repliedUser: false },
					});

				prefixDoc.prefixes.splice(prefixDoc.prefixes.indexOf(args[1]), 1);
				client.databaseCache.updateDoc('prefixes', prefixDoc);
				return message.reply({
					embeds: [
						client.success({
							message,
							data: `**${args[1]}** removed from prefixes in **${message.guild.name}**`,
						}),
					],
					allowedMentions: { repliedUser: false },
				});
			}
		} else {
			return message.reply({
				embeds: [
					new MessageEmbed()
						.setDescription(
							`Prefix(es) in **${
								message.guild.name
							}**: \n\`${prefixDoc.prefixes.join('\n')}\``
						)
						.setFooter(
							`Run ${prefix}prefix [+/-] [prefix] to add or remove prefixes.`
						),
				],
				allowedMentions: { repliedUser: false },
			});
		}
	},
});
