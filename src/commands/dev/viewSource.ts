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
	syntax: '<"path goes here">',
	guildOnly: false,
	devOnly: true,
	test: true,
	nsfw: false,
	noDisable: false,
	userPerms: [],
	botPerms: [],
	fileLocation: join(__dirname, 'viewSource'),
	execute: ({ message, args, client, util }) => {
		const path = join(require.main.path, '../', ...args[0].split(' '));
		const content = readFileSync(path, 'utf-8');
		const split = util.splitMessage(content, { maxLength: 1900 });

		split.forEach((block) => {
			console.log(block.length);
			message.reply({
				content: `\`\`\`ts
                ${block}
                \`\`\``,
				allowedMentions: { repliedUser: false },
			});
		});
	},
});
