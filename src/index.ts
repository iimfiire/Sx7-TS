import { fireClient } from './handler/index';
import { Client, Intents } from 'discord.js';
import { config } from 'dotenv';
import colors from 'colors';
config();

const client = new Client({
	intents: Intents.ALL,
});

client.on('ready', () => {
	new fireClient(client, {
		cmdPath: 'commands',
		eventPath: 'events',
		featurePath: 'features',
		defaultPrefix: ['-'],
		developers: ['341994639395520526'],
		mongoURI: process.env.mongoURI,
		testServers: ['799284445785751614'],
	});
	console.log(`[INIT]`.green + ` Logged in as ${client.user.username}`);
	if (!client.application?.owner) client.application.fetch();
});

client.login(process.env.token);
