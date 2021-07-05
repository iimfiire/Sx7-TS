import Command from '../handler/command';
import { MessageButton } from 'discord.js';

export default new Command({
	name: 'test2',
	// aliases: [],
	category: 'test',
	description: 'yes',
	info: 'none',
	// cooldown,
	minArgs: 0,
	maxArgs: 1,
	syntax: 't',
	guildOnly: true,
	devOnly: true,
	test: true,
	nsfw: false,
	noDisable: true,
	userPerms: ['ADD_REACTIONS'],
	botPerms: ['ADD_REACTIONS'],
	execute: ({ message, args, client }) => {
		if (client.application?.owner.id == message.author.id) {
			message.guild.commands
				.create({
					name: 'ping',
					description: 'pong',
				})
				.then((command) => {
					console.log(command);
				})
				.catch((err) => {
					console.log('err ' + err);
				});
		} else return message.channel.send('no');
	},
});
