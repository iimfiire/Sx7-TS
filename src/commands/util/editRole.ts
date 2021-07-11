import {
	ColorResolvable,
	PermissionString,
	Role,
} from 'discord.js';
import { join } from 'path';
import Command from '../../handler/command';
import { properCase } from '../../handler/utils';

const allPerms = [
	'CREATE_INSTANT_INVITE',
	'KICK_MEMBERS',
	'BAN_MEMBERS',
	'ADMINISTRATOR',
	'MANAGE_CHANNELS',
	'MANAGE_GUILD',
	'ADD_REACTIONS',
	'VIEW_AUDIT_LOG',
	'PRIORITY_SPEAKER',
	'STREAM',
	'VIEW_CHANNEL',
	'SEND_MESSAGES',
	'SEND_TTS_MESSAGES',
	'MANAGE_MESSAGES',
	'EMBED_LINKS',
	'ATTACH_FILES',
	'READ_MESSAGE_HISTORY',
	'MENTION_EVERYONE',
	'USE_EXTERNAL_EMOJIS',
	'VIEW_GUILD_INSIGHTS',
	'CONNECT',
	'SPEAK',
	'MUTE_MEMBERS',
	'DEAFEN_MEMBERS',
	'MOVE_MEMBERS',
	'USE_VAD',
	'CHANGE_NICKNAME',
	'MANAGE_NICKNAMES',
	'MANAGE_ROLES',
	'MANAGE_WEBHOOKS',
	'MANAGE_EMOJIS',
	'USE_APPLICATION_COMMANDS',
	'REQUEST_TO_SPEAK',
	'MANAGE_THREADS',
	'USE_PUBLIC_THREADS',
	'USE_PRIVATE_THREADS',
];

export default new Command({
	name: 'editrole',
	aliases: ['roleedit', 'erole'],
	category: 'utility',
	description:
		'Allows you to modify a role color, permissions, name, and hoisting.',
	info: '',
	cooldown: 5000,
	minArgs: 3,
	maxArgs: Infinity,
	syntax:
		'<@role/role id> <color/name/permissions/hoisted> <options>\n\nExamples: \n -editrole 827399491115941888 color #FF0000\n-editrole 827399491115941888 name "new name"\n-editrole 827399491115941888 permissions allow "Manage Messages"\n-editrole 827399491115941888 hoisted true',
	guildOnly: true,
	devOnly: false,
	test: true,
	nsfw: false,
	noDisable: false,
	userPerms: ['MANAGE_ROLES', 'SEND_MESSAGES'],
	botPerms: ['MANAGE_ROLES', 'SEND_MESSAGES', 'EMBED_LINKS'],
	fileLocation: join(__dirname, 'editRole'),
	execute: async ({ message, args, client, prefix }) => {
		const colorOptions = ['color', 'col', 'hex', 'rgb'];
		const nameOptions = ['name', 'title'];
		const permissionsOptions = ['perms', 'permissions', 'perm'];
		const hoistedOptions = ['hoist', 'hoisted', 'separate'];

		let role: Role;

		try {
			role = await message.guild.roles.fetch(
				message.mentions.roles.first()
					? message.mentions.roles.first().id
					: `${BigInt(args[0])}`
			);
		} catch {
			message.reply({
				embeds: [
					client.error({ message, data: `An invalid role ID was provided.` }),
				],
				allowedMentions: { repliedUser: false },
			});
		}

		if (!role)
			return message.reply({
				embeds: [
					client.error({
						message,
						data: `I could not find that role. Make sure that you either mentioned a role or provided a valid role ID.`,
					}),
				],
				allowedMentions: { repliedUser: false },
			});

		if (role.position >= message.guild.me.roles.highest.position)
			return message.reply({
				embeds: [
					client.error({
						message,
						data: `**${role}** has a higher or equal position than my highest role, and I cannot edit it.`,
					}),
				],
				allowedMentions: { repliedUser: false },
			});

		if (colorOptions.includes(args[1])) {
			const oldColor = role.hexColor;
			let color;
			try {
				JSON.parse(args[2]) ? (color = JSON.parse(args[2])) : undefined;
			} catch {
				color = args[2];
			}
			console.log(color);
			await role.setColor(color as ColorResolvable).catch(() => {
				return message.reply({
					embeds: [
						client.error({
							message,
							data: `An invalid color was provided. You may pass in a Hexadecimal color (#FF0000), RGB value ("[255, 255, 255]", or *some* color names (red, yellow, blue etc...).)`,
						}),
					],
					allowedMentions: { repliedUser: false },
				});
			});
			return message.reply({
				embeds: [
					client.success({
						message,
						data: `Changed the color of ${role} from **${oldColor}** to **${role.hexColor}**`,
					}),
				],
				allowedMentions: { repliedUser: false },
			});
		}
		if (nameOptions.includes(args[1])) {
			const oldName = role.name;
			const name = args[2];
			await role.edit({ name: name }).catch(() => {
				return message.reply({
					embeds: [
						client.error({
							message,
							data: `There was an error setting the name of ${role}. This is commonly caused by a name that is too long, or uses special characters.`,
						}),
					],
					allowedMentions: { repliedUser: false },
				});
			});
			return message.reply({
				embeds: [
					client.success({
						message,
						data: `Changed the name of ${role} from **${oldName}** to **${role.name}**`,
					}),
				],
				allowedMentions: { repliedUser: false },
			});
		}
		if (permissionsOptions.includes(args[1])) {
			if (role.position >= message.member.roles.highest.position)
				return message.reply({
					embeds: [
						client.error({
							message,
							data: `You cannot edit a role above or equal to your highest role.`,
						}),
					],
				});
			const allowDeny =
				args[2] == 'allow' ? 'true' : args[2] == 'deny' ? 'false' : undefined;
			const toChange = args[3];
			if (!toChange)
				return message.reply({
					embeds: [
						client.error({
							message,
							data: `No permission to grant or deny was provided. Example of expected usage: ${prefix}editrole 1234567890 allow "Manage Messages"`,
						}),
					],
					allowedMentions: { repliedUser: false },
				});

			if (!allowDeny)
				return message.reply({
					embeds: [
						client.error({
							message,
							data: `An invalid option was provided for "allow/deny". Example of expected usage: ${prefix}editrole 1234567890 allow "Manage Messages"`,
						}),
					],
					allowedMentions: { repliedUser: false },
				});
			if (!allPerms.includes(toChange.toUpperCase().split(' ').join('_')))
				return message.reply({
					embeds: [
						client.error({
							message,
							data: `An invalid permission was provided. For a list of all valid permissions reference [**this**](https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS) link. (Only one permission can be set at a time.)`,
						}),
					],
					allowedMentions: { repliedUser: false },
				});

			const memberPerms = message.member.permissions.toArray();

			if (
				!memberPerms.includes(
					toChange.toUpperCase().split(' ').join('_') as PermissionString
				)
			)
				return message.reply({
					embeds: [
						client.error({
							message,
							data: `You cannot grant a role a permission that you do not have.`,
						}),
					],
					allowedMentions: { repliedUser: false },
				});

			if (
				!role.permissions
					.toArray()
					.includes(
						toChange.toUpperCase().split(' ').join('_') as PermissionString
					) &&
				allowDeny == 'false'
			)
				return message.reply({
					embeds: [
						client.error({
							message,
							data: `${role} does not have the permission ${properCase(
								toChange.replace('_', ' ')
							)}`,
						}),
					],
					allowedMentions: { repliedUser: false },
				});
			if (
				role.permissions
					.toArray()
					.includes(
						toChange.toUpperCase().split(' ').join('_') as PermissionString
					) &&
				allowDeny == 'true'
			)
				return message.reply({
					embeds: [
						client.error({
							message,
							data: `${role} already has the permission ${properCase(
								toChange.replace('_', ' ')
							)}`,
						}),
					],
					allowedMentions: { repliedUser: false },
				});
			if (allowDeny == 'true') {
				await role
					.edit({
						permissions: [
							...role.permissions.toArray(),
							toChange.toUpperCase().split(' ').join('_') as PermissionString,
						],
					})
					.catch(() => {
						return message.reply({
							embeds: [
								client.error({
									message,
									data: `There was an error setting the permissions of ${role}. Ensure that I have the permissions that you are trying to grant.`,
								}),
							],
							allowedMentions: { repliedUser: false },
						});
					});
			}
			if (allowDeny == 'false') {
				const rolePerms = role.permissions.toArray();
				rolePerms.splice(
					rolePerms.indexOf(
						toChange.toUpperCase().split(' ').join('_') as PermissionString
					),
					1
				);

				await role.edit({ permissions: rolePerms }).catch(() => {
					return message.reply({
						embeds: [
							client.error({
								message,
								data: `There was an error setting the permissions of ${role}. Ensure that I have the permissions that you are trying to grant.`,
							}),
						],
						allowedMentions: { repliedUser: false },
					});
				});
			}
			return message.reply({
				embeds: [
					client.success({
						message,
						data: `Changed the permissions of ${role} to **${allowDeny
							.replace('true', 'allow')
							.replace('false', 'deny')}** the permission **${properCase(
							toChange.replace('_', ' ')
						)}**.`,
					}),
				],
				allowedMentions: { repliedUser: false },
			});
		}

		if (hoistedOptions.includes(args[1])) {
			const truefalse =
				args[2] == 'true' ? 'true' : args[2] == 'false' ? 'false' : undefined;
			const oldHoist = role.hoist;
			if (!truefalse)
				return message.reply({
					embeds: [
						client.error({
							message,
							data: `An invalid option was provided for "true/false". Example of expected usage: ${prefix}editrole 1234567890 hoisted true`,
						}),
					],
					allowedMentions: { repliedUser: false },
				});
			await role.edit({ hoist: JSON.parse(truefalse) }).catch(() => {
				return message.reply({
					embeds: [
						client.error({
							message,
							data: `There was an error setting the hoist of ${role}.`,
						}),
					],
					allowedMentions: { repliedUser: false },
				});
			});
			return message.reply({
				embeds: [
					client.error({
						message,
						data: `Changed the hoist option of ${role} from **${oldHoist}** to ${truefalse}`,
					}),
				],
				allowedMentions: { repliedUser: false },
			});
		}

		return message.reply({
			embeds: [
				client.error({
					message,
					data: `An invalid option was provided. Refer to the command syntax shown in ${prefix}help editrole`,
				}),
			],
			allowedMentions: { repliedUser: false },
		});
	},
});
