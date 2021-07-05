import { Role } from 'discord.js';
import allowedRoles from '../handler/database/models/allowedRoles';
import disabledCommands from '../handler/database/models/disabledCommands';
import prefixes from '../handler/database/models/prefixes';
import Event from '../handler/events';

interface allowed {
	command: string;
	allowed: Role[];
}

export default new Event('guildCreate', (client, guild) => {
	// only to be used for initializing guild settings on guild join

	const prefixDoc = new prefixes({
		gID: guild.id,
		prefixes: client.defaultPrefix,
	});

	client.databaseCache.insertDoc('prefixes', prefixDoc);

	const objArr: Array<allowed> = [];

	client.commands.map((command) => {
		let obj = {
			command: command.name,
			allowed: [],
		};

		objArr.push(obj);
	});

	const allowedRolesDoc = new allowedRoles({
		gID: guild.id,
		allowed: objArr,
	});

	client.databaseCache.insertDoc('allowedRoles', allowedRolesDoc);

	const disabledDoc = new disabledCommands({
		gID: guild.id,
		disabled: [],
	});

	client.databaseCache.insertDoc('disabledCommands', disabledDoc);
});
