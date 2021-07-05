import { Client, Collection, MessageEmbed, Message, TextChannel } from 'discord.js';
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

class fireClient extends Client {
	commands: Collection<string, Command>;
	aliases: Collection<string, string>;
	initialized: boolean;
	defaultPrefix: string[];
	developers: string[];
	testServers: string[];
	cooldowns: Cooldowns;
	databaseCache: Cache;
	success: ({ message, data }: success) => MessageEmbed;
	error: ({ message, data }: error) => MessageEmbed;
	getChannel: (channel) => TextChannel;
}

export default fireClient;
