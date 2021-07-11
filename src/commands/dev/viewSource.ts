import { readFileSync } from 'fs';
import { join } from 'path';
import Command from '../../handler/command';

export default new Command({
	name: 'viewsource',
	// aliases: [],
	category: 'dev',
	description: 'views the source code of a file',
	info: '',
	cooldown: 0,
	minArgs: 0,
	maxArgs: Infinity,
	syntax: '<"directory goes here">',
	guildOnly: false,
	devOnly: true,
	test: true,
	nsfw: false,
	noDisable: false,
	userPerms: [],
	botPerms: [],
	fileLocation: join(__dirname, 'viewSource'),
	execute: ({ message, args, client, util }) => {
		let content;
		let path;
		try {
		path = join(require.main.path, '../', ...args[0].split(' '));
		content = readFileSync(path, 'utf-8');
		} catch {
			return message.reply('path not found');
		}
		const split = util.splitMessage(content, { maxLength: 1900 });

		split.forEach((block) => {
			message.reply({
				content: `\`\`\`ts
                ${block}
                \`\`\``,
				allowedMentions: { repliedUser: false },
			});
		});
	},
});
