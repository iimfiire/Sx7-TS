import fireClient from './fireClient';
import { Message, PermissionResolvable } from 'discord.js';

interface execute {
	message: Message;
	args: string[];
	client: fireClient;
	prefix: string;
	util: any
}

interface cmdOptions {
	name: string;
	aliases?: string[];
	category: string;
	description: string;
	info: string;
	cooldown?: number;
	minArgs: number;
	maxArgs: number;
	syntax: string;
	guildOnly: boolean;
	devOnly: boolean;
	test: boolean;
	nsfw: boolean;
	noDisable: boolean;
	userPerms: PermissionResolvable[];
	botPerms: PermissionResolvable[];
	fileLocation: string;
	execute: ({ message, args, client, prefix, util }: execute) => any;
}

export default class Command {
	name: string;
	aliases?: string[];
	category: string;
	description: string;
	info: string;
	cooldown?: number;
	minArgs: number;
	maxArgs: number;
	syntax: string;
	guildOnly: boolean;
	devOnly: boolean;
	test: boolean;
	nsfw: boolean;
	noDisable: boolean;
	userPerms: PermissionResolvable[];
	botPerms: PermissionResolvable[];
	fileLocation: string
	execute: ({ message, args, client, prefix, util, }: execute) => any | Promise<any>;

	constructor({
		name,
		aliases,
		category,
		description,
		info,
		cooldown,
		minArgs,
		maxArgs,
		syntax,
		guildOnly,
		devOnly,
		test,
		nsfw,
		noDisable,
		userPerms,
		botPerms,
		fileLocation,
		execute,
	}: cmdOptions) {
		if (!aliases) aliases = [];
		if (!userPerms) userPerms = [];
		if (!botPerms) botPerms = [];
		if (!cooldown) cooldown = 0

		this.name = name;
		this.aliases = aliases;
		this.category = category;
		this.description = description;
		this.info = info;
		this.cooldown = cooldown;
		this.minArgs = minArgs;
		this.maxArgs = maxArgs;
		this.syntax = syntax;
		this.guildOnly = guildOnly;
		this.devOnly = devOnly;
		this.test = test;
		this.nsfw = nsfw;
		this.noDisable = noDisable;
		this.userPerms = userPerms;
		this.botPerms = botPerms;
		this.fileLocation = fileLocation;
		this.execute = execute;
	}
}
