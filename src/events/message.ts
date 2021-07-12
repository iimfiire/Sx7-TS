import humanizeDuration from 'humanize-duration';
import Event from '../handler/events';
import { checkPerms, properCase } from '../handler/utils';
import { Util } from 'discord.js';
import prefixesDoc from '../handler/database/models/prefixes';

export default new Event('messageCreate', (client, message) => {
	if (!client.initialized) return;
	if(message.guild && !client.databaseCache.getDoc('prefixes', message.guild.id)) {
		client.databaseCache.insertDoc('prefixes', new prefixesDoc({
			gID: message.guild.id,
			prefixes: client.defaultPrefix
		}))
	}
	const prefixes = message.guild
		? client.databaseCache.getDoc('prefixes', message.guild.id).prefixes
		: client.defaultPrefix;

	for (const p of prefixes) {
		if (!message.content.startsWith(p)) continue;

		const args = [];
		const regex = new RegExp('"[^"]+"|[\\S]+', 'g');
		message.content
			.trim()
			.slice(p.length)
			.match(regex)
			.forEach((element) => {
				if (!element) return;
				return args.push(element.replace(/"/g, ''));
			});
		const commandName = args.shift();
		const command =
			client.commands.get(commandName) ||
			client.commands.get(client.aliases.get(commandName));
		if (!command) return;

		if(client.databaseCache.getDoc('disabledCommands', message.guild.id)) {
			const doc = client.databaseCache.getDoc('disabledCommands', message.guild.id);
			let disabled = false;
			doc.disabled.forEach((cmd) => {
				if(cmd.command == command.name) {
					if(cmd.global) {
						disabled = true
					} 
					if(cmd.channels.length > 0) {
						if(cmd.channels.includes(message.channel.id))
							disabled = true
					}
					if(cmd.roles.length > 0) {
						cmd.roles.forEach((roleID) => {
							if(message.member.roles.cache.has(`${BigInt(roleID)}`)) {
								disabled = true
							}
						})
					}
				}
			})
			if(disabled)
				return message.reply('command disabled')
		}

		if (
			message.content.includes('--dev') &&
			client.developers.includes(message.author.id)
		) {
			return command.execute({ message, args, client, prefix: p, util: Util });
		}

		if (command.guildOnly && !message.guild)
			return message.channel.send({
				embeds: [
					client.error({
						message,
						data: 'This command can only be used within a server.',
					}),
				],
			});

		if (command.test && !client.testServers.includes(message.guild.id))
			return message.channel.send({
				embeds: [
					client.error({
						message,
						data: 'This command can only be used in testing servers.',
					}),
				],
			});

		if (command.nsfw && message.channel.type == 'text' && !message.channel.nsfw)
			return message.channel.send({
				embeds: [
					client.error({
						message,
						data: 'This command can only be used in a channel marked as nsfw.',
					}),
				],
			});

		if (command.devOnly && !client.developers.includes(message.author.id))
			return message.channel.send({
				embeds: [
					client.error({
						message,
						data: `Only developers can use this command!`,
					}),
				],
			});

		if (command.minArgs && args.length < command.minArgs)
			return message.channel.send({
				embeds: [
					client.error({
						message,
						data: `${properCase(commandName)} requires ${
							command.minArgs
						} arguments. \nThe proper syntax for this command is ${`${p}${commandName} ${command.syntax}.`}`,
					}),
				],
			});

		if (command.maxArgs && args.length > command.maxArgs)
			return message.channel.send({
				embeds: [
					client.error({
						message,
						data: `${properCase(commandName)} only takes in ${
							command.maxArgs
						} arguments. \nThe proper syntax for this command is ${`${p}${commandName} ${command.syntax}`}`,
					}),
				],
			});

		if (
			command.botPerms &&
			checkPerms(message.guild.me, command.botPerms).length > 0
		)
			return message.channel.send({
				embeds: [
					client.error({
						message,
						data: `I am missing the following permissions to run this command: \`${properCase(
							checkPerms(message.guild.me, command.botPerms).missing.join(', ')
						)}\``,
					}),
				],
			});

		if (
			command.userPerms &&
			checkPerms(message.member, command.userPerms).length > 0
		)
			return message.channel.send({
				embeds: [
					client.error({
						message,
						data: `You are missing the following permissions to run this command: \`${properCase(
							checkPerms(message.member, command.userPerms).missing.join(', ')
						)}\``,
					}),
				],
			});

		if (
			command.cooldown &&
			command.cooldown > 0 &&
			client.cooldowns.isOnCooldown(message.author, command.name)
		)
			return message.channel.send({
				embeds: [
					client.error({
						message,
						data: `You are currently on cooldown.\nYou can use this command again in ${humanizeDuration(
							client.cooldowns.getCooldown(message.author, command.name),
							{ delimiter: ' and ', largest: 2, maxDecimalPoints: 0 }
						)}`,
					}),
				],
			});
		else if (command.cooldown && command.cooldown > 0)
			client.cooldowns.setCooldown(
				message.author,
				command.name,
				new Date(Date.now() + command.cooldown)
			);

		return command.execute({ message, args, client, prefix: p, util: Util });
	}
});
