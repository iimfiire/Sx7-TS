import { join } from 'path';
import Command from '../../handler/command';
import base from '../../../apis/MDN/Base.js';
import { MessageEmbed } from 'discord.js';

export default new Command({
	name: 'mdn',
	aliases: ['mozilla'],
	category: 'utility',
	description: 'Fetches a query from mozilla documentation.',
	info: '',
	cooldown: 5000,
	minArgs: 1,
	maxArgs: Infinity,
	syntax: '<query>',
	guildOnly: false,
	devOnly: false,
	test: true,
	nsfw: false,
	noDisable: false,
	userPerms: ['SEND_MESSAGES'],
	botPerms: ['EMBED_LINKS', 'SEND_MESSAGES'],
	fileLocation: join(__dirname, 'mdn'),
	execute: async ({ message, args, client }) => {
		const mdn = new base().mdn;

		mdn
			.fetch(args.join(' '), {
				limit: 1,
				sort: 'relevance',
				locale: 'en-US',
				page: 1,
			})
			.then((res) => {
				const data = res.cache.last();
				return message.reply({
					embeds: [
						new MessageEmbed()
							.setTitle(`[${data.title}](${data.url})` + `.`)
							.setDescription(data.summary),
					],
				});
			})
			.catch(() => {
				return message.reply({
					embeds: [client.error({ message, data: `No documentation found.` })],
				});
			});
	},
});