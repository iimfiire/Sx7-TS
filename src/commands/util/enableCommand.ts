import { Role } from 'discord.js';
import { join } from 'path';
import Command from '../../handler/command';
import { properCase } from '../../handler/utils';

export default new Command({
	name: 'enable',
	// aliases: [],
	category: 'utility',
	description:
		'Allows you to enable a previously disabled command for certain channels, roles, or globally.',
	info: '',
	cooldown: 0,
	minArgs: 1,
	maxArgs: Infinity,
	syntax:
		'<command> [channel/role/remove] [channel/role] \n\nEX:\n -enable help remove @role \n -enable help',
	guildOnly: true,
	devOnly: false,
	test: true,
	nsfw: false,
	noDisable: true,
	userPerms: ['MANAGE_GUILD'],
	botPerms: ['SEND_MESSAGES', 'EMBED_LINKS'],
	fileLocation: join(__dirname, 'enableCommand'),
	execute: async ({ message, args, client }) => {
		const command =
			client.commands.get(args[0]) ??
			client.commands.get(client.aliases.get(args[0]));
		if (!command)
			return message.reply({
				embeds: [
					client.error({
						message,
						data: `An invalid command was provided. Check that you spelled it correctly or used a valid command.`,
					}),
				],
			});

		if (!client.databaseCache.getDoc('disabledCommands', message.guild.id)) {
			return message.reply({
				embeds: [
					client.error({
						message,
						data: `There doesn't seem to be any disabled commands in this server.`,
					}),
				],
			});
		}

		const disabled = client.databaseCache.getDoc(
			'disabledCommands',
			message.guild.id
		);
		const disabledDoc = disabled.disabled;

		let disabledCommands = disabledDoc.map((cmd) => cmd.command);
		if (!disabledCommands.includes(command.name))
			return message.reply({
				embeds: [
					client.error({
						message,
						data: `${properCase(command.name)} is not disabled in any context.`,
					}),
				],
			});
		if (args[1] == 'remove') {
			let charregex = /^[A-Za-z]+$/;
			if (charregex.test(args[2])) {
				for (let i = 0; i < disabledDoc.length; i++) {
					if (disabledDoc[i].command == command.name) {
						message
							.reply(
								`Are you sure you want to remove ALL enable options for ${message.guild.name}? (y/n)`
							)
							.then((m) => {
								message.channel
									.awaitMessages({
										filter: (msg) => msg.author.id == message.author.id,
										time: 10000,
										max: 1,
										errors: ['time'],
									})
									.then((collected) => {
										if (collected.first().content.toLowerCase() == 'y') {
											disabledDoc[i].enabledChannels = [];
											disabledDoc[i].enabledRoles = [];
											client.databaseCache.updateDoc(
												'disabledCommands',
												disabled
											);
											return message.reply({
												embeds: [
													client.success({
														message,
														data: `Successfully removed all enable options for ${properCase(
															command.name
														)} from ${message.guild.name}.`,
													}),
												],
											});
										} else {
											return message.reply({
												embeds: [
													client.error({
														message,
														data: `Cancelled removal of enable options.`,
													}),
												],
											});
										}
									})
									.catch(() => {
										return message.reply({
											embeds: [
												client.error({
													message,
													data: `Cancelled removal of enable options.`,
												}),
											],
										});
									});
							});
						break;
					}
				}
			} else {
				if (!(await message.guild.roles.fetch(`${BigInt(args[2])}`))) {
					if (!(await message.guild.channels.fetch(`${BigInt(args[2])}`))) {
						return message.reply({
							embeds: [
								client.error({
									message,
									data: `An invalid role or channel was provided. Please note that at this time, you can only use a role or channel ID, but this may be changed in the future.`,
								}),
							],
						});
					} else {
						const channel = await message.guild.channels.fetch(
							`${BigInt(args[2])}`
						);
						let notenabled = true;
						await disabledDoc.forEach((doc) => {
							if (doc.command == command.name) {
								if (doc.enabledChannels.includes(channel.id))
									notenabled = false;
							}
						});
						if (notenabled) {
							return message.reply({
								embeds: [
									client.error({
										message,
										data: `${properCase(
											command.name
										)} is not enabled in ${channel}`,
									}),
								],
							});
						} else {
							await disabledDoc.forEach((doc) => {
								if (doc.command == command.name) {
									doc.enabledChannels.splice(
										doc.enabledChannels.indexOf(channel.id),
										1
									);
								}
							});
							client.databaseCache.updateDoc('disabledCommands', disabled);
							return message.reply({
								embeds: [
									client.success({
										message,
										data: `Removed ${channel} from the list of enabled channels for ${properCase(
											command.name
										)}`,
									}),
								],
							});
						}
					}
				} else {
					const role = await message.guild.roles.fetch(`${BigInt(args[2])}`);
					let notenabled = true;
					await disabledDoc.forEach(doc => {
						if(doc.command == command.name) {
							if(doc.enabledRoles.includes(role.id)) notenabled = false;
						}
					})
					if (notenabled) {
						return message.reply({
							embeds: [
								client.error({
									message,
									data: `${properCase(
										command.name
									)} is not enabled for ${role}`,
								}),
							],
						});
					} else {
						await disabledDoc.forEach(doc => {
							if(doc.command == command.name) {
								doc.enabledRoles.splice(doc.enabledRoles.indexOf(role.id, 1))
							}
						})
						client.databaseCache.updateDoc('disabledCommands', disabled);
						return message.reply({embeds: [client.success({message, data: `Removed ${role} from the list of enabled roles for ${properCase(command.name)}`})]})
					}
				}
			}
		} else {
			if (!args[1]) {
				for (let i = 0; i < disabledDoc.length; i++) {
					if (disabledDoc[i].command == command.name) {
						disabledDoc.splice(i, 1);
					} else continue;
				}
				client.databaseCache.updateDoc('disabledCommands', disabled);
				return message.reply({
					embeds: [
						client.success({
							message,
							data: `Successfully enabled ${command.name} in ${message.guild.name}`,
						}),
					],
				});
			} else if (!args[1].match(/^[A-Za-z]+$/)) {
				if (
					message.mentions.channels.first() ||
					message.mentions.crosspostedChannels.first() ||
					message.mentions.members.first() ||
					message.mentions.roles.first() ||
					message.mentions.users.first()
				) {
					if (
						!(
							message.mentions.channels.first() ||
							message.mentions.roles.first()
						)
					) {
						return message.reply({
							embeds: [
								client.error({
									message,
									data: `You did not mention a channel or role. Commands can be enabled globally, for channels, or roles.`,
								}),
							],
						});
					}
					if (message.mentions.channels.first()) {
						if (!message.mentions.channels.first().isText())
							return message.reply({
								embeds: [
									client.error({
										message,
										data: `You can only enable commands in a channel that is a text channel.`,
									}),
								],
							});
						const channel = await message.guild.channels.fetch(
							message.mentions.channels.first().id
						);
						for (let i = 0; i < disabledDoc.length; i++) {
							if (disabledDoc[i].command == command.name) {
								if (disabledDoc[i].enabledChannels.includes(channel.id))
									return message.reply({
										embeds: [
											client.error({
												message,
												data: `${properCase(
													command.name
												)} is already enabled in ${channel}.`,
											}),
										],
									});
								disabledDoc[i].enabledChannels.push(channel.id);
								client.databaseCache.updateDoc('disabledCommands', disabled);
								return message.reply({
									embeds: [
										client.success({
											message,
											data: `Enabled ${properCase(command.name)} in ${channel}`,
										}),
									],
								});
							}
						}
					} else if (message.mentions.roles.first()) {
						const role = await message.guild.roles.fetch(
							message.mentions.roles.first().id
						);
						for (let i = 0; i < disabledDoc.length; i++) {
							if (disabledDoc[i].command == command.name) {
								if (disabledDoc[i].enabledRoles.includes(role.id))
									return message.reply({
										embeds: [
											client.error({
												message,
												data: `${properCase(
													command.name
												)} is already enabled for ${role}.`,
											}),
										],
									});
								disabledDoc[i].enabledRoles.push(role.id);
								client.databaseCache.updateDoc('disabledCommands', disabled);
								return message.reply({
									embeds: [
										client.success({
											message,
											data: `Enabled ${properCase(command.name)} for ${role}.`,
										}),
									],
								});
							}
						}
					}
				}
			} else {
				for (let i = 0; i < disabledDoc.length; i++) {
					if (disabledDoc[i].command == command.name) {
						disabledDoc.splice(i, 1);
					} else continue;
				}
				client.databaseCache.updateDoc('disabledCommands', disabled);
				return message.reply({
					embeds: [
						client.success({
							message,
							data: `Successfully enabled ${command.name} in ${message.guild.name}`,
						}),
					],
				});
			}
		}
	},
});
