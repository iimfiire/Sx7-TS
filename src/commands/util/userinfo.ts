import { MessageEmbed } from 'discord.js';
import { join } from 'path';
import Command from '../../handler/command';
import humanizeDuration from 'humanize-duration';

export default new Command({
	name: 'userinfo',
	aliases: ['ui'],
	category: 'utility',
	description: 'Displays information about a user.',
	info: '',
	cooldown: 0,
	minArgs: 0,
	maxArgs: Infinity,
	syntax: '[@user/user-id]',
	guildOnly: true,
	devOnly: false,
	test: false,
	nsfw: false,
	noDisable: false,
	userPerms: ['SEND_MESSAGES'],
	botPerms: ['EMBED_LINKS', 'SEND_MESSAGES'],
	fileLocation: join(__dirname, 'userinfo'),
	execute: async ({ message, args }) => {
		const info = args[0] ?
		    await message.guild.members
					.fetch(
						message.mentions.users.first() ?
		                    message.mentions.users.first().id :
		                        args[0].match(/^[A-Za-z]+$/) ?
		                            message.author.id :
		                                `${BigInt(args[0])}`
					)
			                                : message.member;

		const infoEmbed = new MessageEmbed()
			.setTitle(`${info.user.username}`)
			.setThumbnail(info.user.displayAvatarURL())
			.addFields([
				{
					name: `Account info`,
					value: 
                    `Joined Discord: ${humanizeDuration(
						Date.now().valueOf() - info.user.createdAt.valueOf(),
						{ largest: 2, delimiter: ' and ' }
					)} ago
                    Joined ${message.guild.name}: ${humanizeDuration(
						Date.now().valueOf() - info.joinedAt.valueOf(),
						{ largest: 2, delimiter: ' and ' }
					)} ago
                    ID: ${info.id}
                    `,
				    inline: false
                },
                {
                    name: `Member Details`,
                    value: `
                    Total Roles: ${info.roles.cache.filter(role => !role.managed).size}
                    Highest Role: ${info.roles.highest}
                    Admin: ${info.permissions.toArray().includes("ADMINISTRATOR")}
                    `,
                    inline: true
                },
                {
                    name: `Stats`,
                    value: `
                    Boosting: ${info.premiumSince == null ? 'No' : `Yes, for ${humanizeDuration(Date.now().valueOf() - info.premiumSince.valueOf(), {largest: 2, delimiter: ' and '})}`}
                    Status: ${info.presence.status}
                    `,
                    inline: true
                }
			])
            .setColor(info.displayColor);

		return message.reply({ embeds: [infoEmbed] });
	},
});
