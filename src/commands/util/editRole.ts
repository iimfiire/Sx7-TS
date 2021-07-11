import { join } from 'path';
import Command from '../../handler/command';

export default new Command({
    name: 'editrole',
    aliases: ['roleedit', 'erole'],
    category: 'utility',
    description: 'Allows you to modify a role color, permissions, name, and hoisting.',
    info: '',
    cooldown: 5000,
    minArgs: 3,
    maxArgs: Infinity,
    syntax: '<role> <color/name/permissions/hoisted> <options>\n\nExamples: \n -editrole 827399491115941888 color #FF0000\n-editrole 827399491115941888 name 827399491115941888 "new name"\n-editrole 827399491115941888 permissions allow "Manage Messages"\n-editrole 827399491115941888 hoisted true',
    guildOnly: true,
    devOnly: false,
    test: true,
    nsfw: false,
    noDisable: false,
    userPerms: ['MANAGE_ROLES', 'SEND_MESSAGES'],
    botPerms: ['MANAGE_ROLES', 'SEND_MESSAGES', 'EMBED_LINKS'],
    fileLocation: join(__dirname, 'editRole'),
    execute: ({ message, args, client, prefix }) => {
        const colorOptions = ['color', 'col', 'hex', 'rgb'];
        const nameOptions = ['name', 'title'];
        const permissionsOptions = ['perms', 'permissions', 'perm'];
        const hoistedOptions = ['hoist', 'hoisted', 'separate'];

        if(colorOptions.includes(args[0])) {

        }
        if(nameOptions.includes(args[0])) {

        }
        if(permissionsOptions.includes(args[0])) {
        
        }
        if(hoistedOptions.includes(args[0])) {

        }

        return message.reply({embeds: [client.error({message, data: `An invalid option was provided. Refer to the command syntax shown in ${prefix}help editrole`})], allowedMentions: {repliedUser: false}})

    }
});