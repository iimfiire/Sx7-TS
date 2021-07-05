import { Collection, MessageEmbed, Message } from 'discord.js';
import fireClient2 from './fireClient';
import { Commands, Events } from './register';
import Command from './command';
import database from './database/database';
import cooldowns from './database/models/cooldowns';
import prefixes from './database/models/prefixes';
import disabledCommands from './database/models/disabledCommands';
import allowedRoles from './database/models/allowedRoles';
import fights from './database/models/fights';
import featureHandler from './featureHandler';
import Cooldowns from './cooldowns';
import Cache from './cache';
import colors from 'colors';

interface cldwns {
	uID: string;
	cmdName: string;
	cooldown: Date;
}

interface clientOptions {
	cmdPath: string;
	eventPath: string;
	featurePath: string;
	testServers: string[];
	developers: string[];
	defaultPrefix: string[];
	mongoURI: string;
}

export class fireClient {
	_client: fireClient2;
	_cmdPath: string;
	_eventPath: string;
	_featurePath: string;
	_testServers: string[];
	_developers: string[];
	_defaultPrefix: string[];
	_mongoURI: string;

	constructor(client, options: clientOptions) {
		this._client = client;
		this._cmdPath = options.cmdPath;
		this._eventPath = options.eventPath;
		this._featurePath = options.featurePath;
		this._testServers = options.testServers;
		this._developers = options.testServers;
		this._defaultPrefix = options.defaultPrefix;
		this._mongoURI = options.mongoURI;

		this._client.commands = new Collection<string, Command>();
		this._client.aliases = new Collection<string, string>();
		this._client.defaultPrefix = options.defaultPrefix;
		this._client.developers = options.developers;

		this._client.getChannel = ({
			client,
			channel,
		}: {
			client: fireClient2;
			channel: any | string;
		}) => {
			return client.channels.cache.get(channel);
		};

		this._client.success = ({
			message,
			data,
		}: {
			message: Message;
			data: string;
		}): MessageEmbed => {
			const embed = new MessageEmbed()
				.setColor('#2FDD2C')
				.setDescription(`${data}`)
				.setTitle('Success!')
				.setAuthor('', message.author.displayAvatarURL())
				.setTimestamp();
			return embed;
		};

		this._client.error = ({
			message,
			data,
		}: {
			message: Message;
			data: string;
		}): MessageEmbed => {
			const embed = new MessageEmbed()
				.setColor('#FF0000')
				.setDescription(`${data}`)
				.setTitle('Error!')
				.setAuthor('', message.author.displayAvatarURL())
				.setTimestamp();
			return embed;
		};

		this._init();
	}

	async _init() {
		await database(this._mongoURI);
		await this._commands();
		await this._events();
		new featureHandler(this._client, this._featurePath);
		this._client.cooldowns = new Cooldowns(
			await cooldowns.find(),
			this._client
		);
		this._client.databaseCache = new Cache({
			models: {
				cooldowns: {
					model: cooldowns,
					getBy: 'uID',
				},
				disabledCommands: {
					model: disabledCommands,
					getBy: 'gID',
				},
				prefixes: {
					model: prefixes,
					getBy: 'gID',
				},
				allowedRoles: {
					model: allowedRoles,
					getBy: 'giD',
				},
				fights: {
					model: fights,
					getBy: 'uID',
				},
			},
			updateSpeed: 30000,
		});
	}

	_commands() {
		Commands(this._cmdPath, this._client);
		console.log(
			colors.cyan(`[INFO]`) +
				colors.white(` ${this._client.commands.size} commands loaded.`)
		);
	}

	_events() {
		const res = Events(this._eventPath, this._client);
		console.log(`[INFO]`.cyan + ` Loaded ${res.totalEvents} events.`.white);
		console.log(
			`[INFO]`.cyan + ` All client events: ${res.allEvents.join(', ')}`.white
		);
	}

	get defaultPrefix() {
		return this._defaultPrefix;
	}

	get testServers() {
		return this._testServers;
	}
}
