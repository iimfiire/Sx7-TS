import { MessageEmbed } from 'discord.js';
import Feature from '../handler/features';

export default new Feature((client) => {
	client.user.setActivity('ts go brr');

	const onlineEmbed = new MessageEmbed()
	.setTitle('Sx-7 Online')
	.setDescription(':green_circle: Online and registering commands!')
	.setTimestamp();

	client.channels.fetch('850152902395166771').then(channel => {
		if(channel && channel.isText()) {
			const interval = setInterval(() => {
				if(client.initialized) {
					client.user.setStatus('online')
					 channel.send({embeds: [onlineEmbed]})
					 clearInterval(interval)
				}
			}, 10000)
		}
	});

});
