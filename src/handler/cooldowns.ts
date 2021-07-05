import { Collection, User } from 'discord.js';
import fireClient from './fireClient';
import cooldowns from './database/models/cooldowns';

interface cooldowns {
	uID: string;
	cmdName: string;
	cooldown: Date;
}

export default class Cooldowns {
	_client: fireClient;
	_cooldowns: Collection<string, Collection<string, Date>> = new Collection();

	constructor(dbCooldowns: any, client: fireClient) {
		this._init(dbCooldowns);
		this._client = client;
	}

	_init(dbCooldowns: any): void {
		for (const cooldown of dbCooldowns) {
			this._cooldowns.set(
				cooldown.uID,
				new Collection<string, Date>().set(cooldown.cmdName, cooldown.cooldown)
			);
		}
	}

	setCooldown(user: User, command: string, cooldown: Date): void {
		if (this._cooldowns.get(user.id) == undefined)
			this._cooldowns.set(
				user.id,
				new Collection<string, Date>().set(command, cooldown)
			);
		if (Math.ceil(cooldown.valueOf() - Date.now()) / 1000 / 60 >= 5)
			this._client.databaseCache.insertDoc(
				'cooldowns',
				new cooldowns({
					uID: user.id,
					cmdName: command,
					cooldown: cooldown,
				})
			);
		else this._cooldowns.get(user.id).set(command, cooldown);
	}

	getCooldown(user: User, command: string): undefined | number {
		if (
			this._cooldowns.get(user.id) == undefined &&
			this._client.databaseCache.getDoc('cooldowns', user.id) == undefined
		)
			return undefined;
		if (this._cooldowns.get(user.id).get(command) == undefined)
			return undefined;
		return new Date(
			Date.now().valueOf() - this._cooldowns.get(user.id).get(command).valueOf()
		).valueOf();
	}

	isOnCooldown(user: User, command: string): boolean {
		if (this._cooldowns.get(user.id) == undefined) return false;
		if (this._cooldowns.get(user.id).get(command) == undefined) return false;
		else {
			const date = this._cooldowns.get(user.id).get(command);
			return date.valueOf() > Date.now();
		}
	}
}
