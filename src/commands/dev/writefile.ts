import { join } from 'path';
import Command from '../../handler/command';
import fs from 'fs';

export default new Command({
    name: 'writefile',
    // aliases: [],
    category: 'dev',
    description: 'writes text to a text file',
    info: '',
    cooldown: 0,
    minArgs: 0,
    maxArgs: Infinity,
    syntax: '',
    guildOnly: false,
    devOnly: true,
    test: true,
    nsfw: false,
    noDisable: false,
    userPerms: [],
    botPerms: [],
    fileLocation: join(__dirname, 'writefile'),
    execute: async ({ message, args, client }) => {

    }
});