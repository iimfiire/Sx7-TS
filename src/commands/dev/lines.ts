import Command from '../../handler/command';
import { join } from 'path';
import fs from 'fs';

export default new Command({
	name: 'lines',
	category: 'dev',
	description: 'returns the amount of lines in a file.',
	info: '',
	cooldown: 0,
	minArgs: 0,
	maxArgs: Infinity,
	syntax: '<file location>',
	guildOnly: false,
	devOnly: true,
	test: false,
	nsfw: false,
	noDisable: true,
	userPerms: [],
	botPerms: [],
	fileLocation: join(__dirname, 'lines'),
	execute: async ({ message, args, client }) => {
        let lines: number = 0;
        let characters: number = 0;

        const readLines = (path: string) => {
            const folders = fs.readdirSync(path);
            for (const folder  of folders) {
                if(fs.lstatSync(join(path, folder)).isDirectory()) {
                    readLines(join(path, folder));
                } else {
					if(folder.endsWith('.map'))
					    continue;
                    const file = fs.readFileSync(join(path, folder), 'utf-8');

                    lines += file.split('\n').length;
                    characters += file.length;
                }
            }
        }

		await readLines(join(require.main.path, '../', 'src'))
		await readLines(join(require.main.path, '../', 'apis'))

        return message.reply(`Lines: ${lines}\nCharacters: ${characters}`)

	},
});
