import { join } from 'path';
import Command from '../../handler/command';
import disabledCommands from '../../handler/database/models/disabledCommands';
import { properCase } from '../../handler/utils';

export default new Command({
	name: 'disable',
	// aliases: [],
	category: 'utility',
	description:
		'Disables a command from being used for a role, channel, or entire server.',
	info: '',
	cooldown: 0,
	minArgs: 1,
	maxArgs: 2,
	syntax: '<command> [channel/role]',
	guildOnly: true,
	devOnly: false,
	test: true,
	nsfw: false,
	noDisable: true,
	userPerms: ['MANAGE_GUILD'],
	botPerms: ['SEND_MESSAGES', 'EMBED_LINKS'],
	fileLocation: join(__dirname, 'disableCommand'),
	execute: async ({ message, args, client }) => {
		const command =
			client.commands.get(args[0]) ||
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

		if (command.noDisable) return message.reply('command cant be disabled');

		if (!client.databaseCache.getDoc('disabledCommands', message.guild.id)) {
			client.databaseCache.insertDoc(
				'disabledCommands',
				new disabledCommands({
					gID: message.guild.id,
					disabled: [],
				})
			);
		}

		let disabledDoc = client.databaseCache.getDoc(
			'disabledCommands',
			message.guild.id
		);

		let alreadyDisabled = false;

		disabledDoc.disabled.forEach((disabledCommand) => {
			if (disabledCommand.command == command.name && disabledCommand.global)
				alreadyDisabled = true;
		});

		if (alreadyDisabled)
			return message.reply({
				embeds: [
					client.error({
						message,
						data: `${properCase(command.name)} is already disabled in ${
							message.guild.name
						}.`,
					}),
				],
			});

		let disableObj = {
			command: command.name,
			global: false,
			channels: [],
			roles: [],
			enabledChannels: [],
			enabledRoles: [],
		};

		let str: string;

		if (!args[1]) {
			disableObj.global = true;
			str = `Successfully disabled ${properCase(command.name)} globally.`;
		}

		if (args[1]) {
			if (args[1].match(/^[A-Za-z]+$/)) {
				disableObj.global = true;
				str = `Successfully disabled ${properCase(command.name)} globally.`;
			} else {
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
									data: `You did not mention a channel or role. Commands can be disabled globally, for channels, or roles.`,
								}),
							],
						});
					}
				}
				if (message.mentions.channels.first()) {
					if (!message.mentions.channels.first().isText()) {
						return message.reply({
							embeds: [
								client.error({
									message,
									data: `You can only disable commands in a channel that is a text channel.`,
								}),
							],
						});
					}
					const channel = await message.guild.channels.fetch(
						message.mentions.channels.first().id
					);
					alreadyDisabled = false;
					await disabledDoc.disabled.forEach((doc) => {
						if (doc.channels.includes(channel.id)) alreadyDisabled = true;
					});
					if (alreadyDisabled)
						return message.reply({
							embeds: [
								client.error({
									message,
									data: `${properCase(
										command.name
									)} is already disabled in ${channel}`,
								}),
							],
						});
					str = `Successfully disabled ${command.name} in ${channel}.`;
					disableObj.channels = [...disableObj.channels, channel.id];
				} else if (message.mentions.roles.first()) {
					const role = await message.guild.roles.fetch(
						message.mentions.roles.first().id
					);
					alreadyDisabled = false;
					await disabledDoc.disabled.forEach((doc) => {
						if (doc.roles.includes(role.id)) alreadyDisabled = true;
					});
					if (alreadyDisabled)
						return message.reply({
							embeds: [
								client.error({
									message,
									data: `${properCase(
										command.name
									)} is already disabled for ${role}`,
								}),
							],
						});
					str = `Successfully disabled ${command.name} for ${role}.`;
					disableObj.roles = [...disableObj.roles, role.id];
				} else {
					const chan = await message.guild.channels.fetch(`${BigInt(args[1])}`);
					if (!chan) {
						const roletemp = await message.guild.roles.fetch(
							`${BigInt(args[1])}`
						);
						if (!roletemp) {
							return message.reply({
								embeds: [
									client.error({
										message,
										data: `You provided an invalid role or channel ID. Make sure that it is a valid role or channel ID.`,
									}),
								],
							});
						} else {
							const role = await message.guild.roles.fetch(
								`${BigInt(args[1])}`
							);
							alreadyDisabled = false;
							await disabledDoc.disabled.forEach((doc) => {
								if (doc.roles.includes(role.id)) alreadyDisabled = true;
							});
							if (alreadyDisabled)
								return message.reply({
									embeds: [
										client.error({
											message,
											data: `${properCase(
												command.name
											)} is already disabled for ${role}`,
										}),
									],
								});
							str = `Successfully disabled ${command.name} for ${role}`;
							disableObj.roles = [...disableObj.roles, role.id];
						}
					} else {
						const channel = await message.guild.channels.fetch(
							`${BigInt(args[1])}`
						);
						alreadyDisabled = false;
						await disabledDoc.disabled.forEach((doc) => {
							if (doc.channels.includes(channel.id)) alreadyDisabled = true;
						});
						if (alreadyDisabled)
							return message.reply({
								embeds: [
									client.error({
										message,
										data: `${properCase(
											command.name
										)} is already disabled in ${channel}`,
									}),
								],
							});
						if (!channel.isText()) {
							return message.reply({
								embeds: [
									client.error({
										message,
										data: `You can only disable commands in a channel that is a text channel.`,
									}),
								],
							});
						}
						str = `Successfully disabled ${command.name} in ${channel}`;
						disableObj.channels = [...disableObj.channels, channel.id];
					}
				}
				if (!str)
					return message.reply({
						embeds: [
							client.error({
								message,
								data: `You provided an invalid role or channel ID. Make sure that it is a valid role or channel ID.`,
							}),
						],
					});
			}
		}
		disabledDoc.disabled.push(disableObj);
		// message.reply(JSON.stringify(disabledDoc))
		console.log(str);
		client.databaseCache.updateDoc('disabledCommands', disabledDoc);
		return message.reply({ embeds: [client.success({ message, data: str })] });
	},
});
