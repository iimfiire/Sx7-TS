import { MessageEmbed } from 'discord.js';
import Command from '../../handler/command';
import { properCase } from '../../handler/utils';
import { join } from 'path';

export default new Command({
	name: 'help',
	// aliases: [],
	category: 'utility',
	description:
		'Offers information about all commands available to the user running the command',
	info: '',
	// cooldown: 10000,
	minArgs: 0,
	maxArgs: Infinity,
	syntax: '[command]',
	guildOnly: true,
	devOnly: false,
	test: false,
	nsfw: false,
	noDisable: false,
	userPerms: ['SEND_MESSAGES'],
	botPerms: ['EMBED_LINKS'],
	fileLocation: join(__dirname, 'help.js'),
	execute: ({ message, args, client, prefix }) => {
		const helpEmbed = new MessageEmbed().setTimestamp();

		if (!args[0]) {
			helpEmbed.setTitle('Sx-7 Help Menu');
			helpEmbed.setFooter(
				`Run ${prefix}help [command] for more information on a specific command.`
			);

			const categories: string[] = [];

			client.commands.forEach((cmd) => {
				if(!client.developers.includes(message.author.id)) {
					if(!categories.includes(cmd.category) && cmd.category !== 'dev') categories.push(cmd.category)
				} else {
				if (!categories.includes(cmd.category)) categories.push(cmd.category);
				}
			});

			categories.forEach((category) => {
				const categoryCommands = client.commands.filter(
					(cmd) => cmd.category == category
				);

				helpEmbed.addField(
					properCase(category),
					categoryCommands.map((cmd) => cmd.name).join(', ')
				);
			});

			message.channel.send({ embeds: [helpEmbed] });
		}

		if (args[0]) {
			if (
				!client.commands.get(args[0].toLowerCase()) &&
				!client.commands.get(client.aliases.get(args[0].toLowerCase()))
			) {
				return message.reply({
					embeds: [
						client.error({
							message,
							data: `Command not found. Make sure you spelled it correctly or that it exists.`,
						}),
					],
				});
			} else {
				const command =
					client.commands.get(args[0].toLowerCase()) ||
					client.commands.get(client.aliases.get(args[0]).toLowerCase());
				helpEmbed.setTitle(`${properCase(command.name)} Help Menu`);
				helpEmbed.setDescription(`${command.description}`);
				helpEmbed.addFields([
					{
						name: 'Usage',
						value: `${prefix}${command.name} ${command.syntax}`,
						inline: true,
					},
					{
						name: 'Aliases',
						value:
							command.aliases && command.aliases.length > 0
								? '• ' + command.aliases.join('\n• ')
								: 'None',
						inline: true,
					},
					{ name: 'Category', value: command.category, inline: true },
				]);

				return message.reply({
					embeds: [helpEmbed],
					allowedMentions: { repliedUser: false },
				});
			}
		}
	},
});
