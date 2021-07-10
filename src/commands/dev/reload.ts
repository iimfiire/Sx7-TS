import Command from '../../handler/command';
import { join } from 'path';

export default new Command({
	name: 'reload',
	// aliases: [],
	category: 'dev',
	description:
		'Reloads a command, changes in the file will be represented after the relaod.',
	info: '',
	cooldown: 0,
	minArgs: 1,
	maxArgs: Infinity,
	syntax: '<file location>',
	guildOnly: false,
	devOnly: true,
	test: false,
	nsfw: false,
	noDisable: false,
	userPerms: [],
	botPerms: [],
	fileLocation: join(__dirname, 'reload.js'),
	execute: ({ message, args, client }) => {
		try {
			const cmd = client.commands.get(args[0]);
			delete require.cache[require.resolve(`${cmd.fileLocation}`)];
			const props = require(`${cmd.fileLocation}`);
			client.commands.set(props.default.name, props.default);
			return message.reply(`reloaded ${props.default.name}`);
		} catch (err) {
			return message.reply(`error\n\n${err}`);
		}
	},
});
