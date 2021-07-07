import { join } from 'path';
import Command from './command';
import Event from './events';
import fireClient from './fireClient';
import { readdirSync, lstatSync } from 'fs';
import colors from 'colors';

export const Commands = (commandsDir: string, client: fireClient) => {
	const folders = readdirSync(join(require.main.path, commandsDir));
	for (const folder of folders) {
		if (lstatSync(join(require.main.path, commandsDir, folder)).isDirectory())
			Commands(`${join(commandsDir, folder)}`, client);
		else {
			if (join(require.main.path, commandsDir, folder).endsWith('.map'))
				continue;
			const command: Command = require(join(
				require.main.path,
				commandsDir,
				folder
			)).default;
			if (!(command instanceof Command)) {
				console.log(
					`[ERROR] `.red +
						`Command registered at ${join(
							require.main.path,
							commandsDir,
							folder
						)} is invalid`.white
				);
				continue;
			}
			client.commands.set(command.name, command);
			if (command.aliases && command.aliases.length > 0) {
				for (const alias of command.aliases) {
					if (client.aliases.get(alias)) {
						console.log(
							`[ERROR]`.red +
								` ${alias} is a repeated alias (${command.name})`.white
						);
						continue;
					}
					client.aliases.set(alias, command.name);
				}
			}
		}
	}
	return client;
};

interface EventsReturn {
	totalEvents: number;
	allEvents: Array<string>;
}

export const Events = (eventsDir: string, client: fireClient): EventsReturn => {
	let totalEvents: number = 0;
	let allEvents: Array<string> = [];

	const files = readdirSync(join(require.main.path, eventsDir));
	for (const file of files) {
		if (file.endsWith('.map')) continue;
		if (lstatSync(join(require.main.path, eventsDir, file)).isDirectory())
			totalEvents += Events(
				`${join(require.main.path, eventsDir)}`,
				client
			).totalEvents;
		else {
			const event: Event<any> = require(join(
				require.main.path,
				eventsDir,
				file
			)).default;
			if(!(event instanceof Event)) {
			  console.log(`[ERROR]`.red + ` Event file at ${join(require.main.path, eventsDir, file)} is invalid.`.white);
			  continue
			};
			allEvents.push(event.name);
			totalEvents += 1;
			client.on(event.name, event.execute.bind(null, client));
		}
	}
	return {
		totalEvents: totalEvents,
		allEvents,
	};
};
