import { Client, Collection, MessageEmbed, Message, Channel } from 'discord.js';
import Cache from './cache';
import Command from './command';
import Cooldowns from './cooldowns';

interface success {
	message: Message;
	data: string;
}

interface error {
	message: Message;
	data: string;
}

interface getChannel {
	client: fireClient;
	channel: string;
}

class fireClient extends Client {
	commands: Collection<string, Command>;
	aliases: Collection<string, string>;
	defaultPrefix: string[];
	developers: string[];
	testServers: string[];
	cooldowns: Cooldowns;
	databaseCache: Cache;
	success: ({ message, data }: success) => MessageEmbed;
	error: ({ message, data }: error) => MessageEmbed;
	getChannel: (channel) => Channel;
}

export default fireClient;
