import fireClient from './fireClient';
import { ClientEvents } from 'discord.js';

export default class Event<K extends keyof ClientEvents = any> {
	name: K;
	execute: (client: fireClient, ...args: ClientEvents[K]) => void;

	constructor(
		name: K,
		execute: (client: fireClient, ...args: ClientEvents[K]) => void
	) {
		this.name = name;
		this.execute = execute;
	}
}
