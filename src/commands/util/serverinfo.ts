import { MessageEmbed } from 'discord.js';
import humanizeDuration from 'humanize-duration';
import { join } from 'path';
import Command from '../../handler/command';

export default new Command({
	name: 'serverinfo',
	aliases: ['si'],
	category: 'utility',
	description: 'Displays information about the server.',
	info: '',
	cooldown: 0,
	minArgs: 0,
	maxArgs: Infinity,
	syntax: '',
	guildOnly: true,
	devOnly: false,
	test: false,
	nsfw: false,
	noDisable: false,
	userPerms: ['SEND_MESSAGES'],
	botPerms: ['EMBED_LINKS', 'SEND_MESSAGES'],
	fileLocation: join(__dirname, 'serverinfo'),
	execute: async ({ message }) => {
		const { guild } = message;
		const allMembers = await guild.members.fetch();
		const allChannels = await guild.channels.fetch();
		const emotes = await guild.emojis.fetch();
		const infoEmbed = new MessageEmbed()
			.setTitle(`${guild.name}`)
			.setThumbnail(guild.iconURL())
			.setColor('RANDOM')
			.addFields([
				{
					name: `Members`,
					value: `Total: ${allMembers.size} \nHumans: ${
						allMembers.filter((member) => !member.user.bot).size
					} \nBots: ${allMembers.filter((member) => member.user.bot).size}`,
					inline: true,
				},
				{
					name: `Channels`,
					value: `Total (text/voice): ${
						allChannels.filter(
							(channel) => channel.type == 'voice' || channel.type == 'text'
						).size
					} \nText Channels: ${
						allChannels.filter((channel) => channel.isText()).size
					} \nVoice Channels: ${
						allChannels.filter((channel) => channel.type == 'voice').size
					}`,
					inline: true,
				},
				{
					name: `Misc`,
					value: `Owner: <@${guild.ownerID}> \nServer ID: ${
						guild.id
					} \nTotal emotes: ${emotes.size} \nCreated: ${humanizeDuration(
						Date.now().valueOf() - guild.createdAt.valueOf(),
						{ largest: 2, delimiter: ' and ' }
					)} ago.`,
					inline: false,
				},
			]);

		return message.reply({ embeds: [infoEmbed] });
	},
});
