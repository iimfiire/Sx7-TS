import Event from '../handler/events';
import { MessageButton, MessageActionRow } from 'discord.js';

export default new Event('interaction', async (client, interaction) => {
	if (interaction.isButton()) {
		if (interaction.customID == 'ping-primary') {
			interaction.update('you clicked the useless button');
		}
		if (interaction.customID == 'ping-delete') {
			if (interaction.message.type == 'DEFAULT') {
				interaction.update('deleting');
				interaction.message.delete();
			}
		}
	}

	if (!interaction.isCommand()) return;

	if (interaction.commandName == 'ping') {
		const buttons = new MessageActionRow().addComponents(
			new MessageButton()
				.setLabel('useless button smh')
				.setStyle('PRIMARY')
				.setCustomID(`ping-primary`),
			new MessageButton()
				.setLabel('delete message')
				.setStyle('DANGER')
				.setCustomID('ping-delete')
		);

		interaction.reply({ content: 'pong!', components: [buttons] });
	}
});
