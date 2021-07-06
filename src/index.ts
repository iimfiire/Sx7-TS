import { fireClient } from './handler/index';
import { Client, Intents, MessageEmbed } from 'discord.js';
import { config } from 'dotenv';
import colors from 'colors';
config();

const client = new Client({
	intents: Intents.ALL,
});

if(!process.argv0 || process.argv[2] !== '-safe') {

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

	process.on('warning', (warning) => {
		client.channels.fetch('850152902395166771').then(channel => {
			if(channel.isText()) {
				channel.send({embeds: [new MessageEmbed().setTitle('Process warning detecting.').setDescription(`\`\`\`${warning}\`\`\` Received at: \n ${new Date()}`).setColor('#FF0000')]})
			}
		})
	})
} 

if(process.argv[2] == '-safe') {
	client.on('ready', () => {
		console.log(`Client loaded in safe mode. Only specific commands are available.`)
		client.channels.fetch('850152902395166771').then(channel => {
			if(channel.isText()) {
				channel.send({embeds: [new MessageEmbed().setTitle('Sx-7 Online').setDescription(':red_circle: Bot is online but will only respond to <@341994639395520526> with specific commands.')]})
			}
		})
	}) 
	client.on('messageCreate', (message) => {
		if(message.content.startsWith('-eval') && message.author.id == '341994639395520526') {
			const args = message.content.trim().slice(6).split(/ +/g)
			try {
				eval(args.join(" "))
			} catch(err) {
				message.channel.send(err + '.')
			}
		}
	})
}

client.login(process.env.token);
