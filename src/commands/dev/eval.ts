import Command from '../../handler/command';

export default new Command({
	name: 'eval',
	category: 'dev',
	description: 'evalutes a segment of code',
	info: '',
	cooldown: 0,
	minArgs: 1,
	maxArgs: Infinity,
	syntax: '<code>',
	guildOnly: false,
	devOnly: true,
	test: false,
	nsfw: false,
	noDisable: true,
	userPerms: ['SEND_MESSAGES'],
	botPerms: ['ADMINISTRATOR'],
	execute: ({ message, args, client }) => {
		try {
			eval(args.join(' '));
		} catch (err) {
			return message.channel.send({
				embeds: [
					client.error({
						message,
						data: `${err}.`,
					}),
				],
			});
		}
	},
});
