import fireClient from "./fireClient";
import { Interaction, Util } from "discord.js";

type choices = {
    name: string;
    value: string;
}

interface args {
    argName: string;
    type: "SUB_COMMAND" | "SUB_COMMAND_GROUP" | "STRING" | "INTEGER" | "NUMBER" | "BOOLEAN" | "USER" | "CHANNEL" | "ROLE" | "MENTIONABLE";
    argDesc: string;
    required: boolean;
    choices?: choices[];
}

interface commandOptions {
    name: string;
    description: string;
    cooldown: number;
    minArgs: number;
    args?: args[];
    fileLocation: string;
    execute: ({interaction, client, util}: {interaction: Interaction, client: fireClient, util: Util}) => any;
}

export default class SlashCommand {
    name: string;
    description: string;
    cooldown: number;
    minArgs: number;
    args: args[];
    fileLocation: string;
    execute: ({interaction, client, util}: {interaction: Interaction, client: fireClient, util: Util}) => any;

    constructor({
        name,
        description,
        cooldown,
        minArgs,
        args,
        fileLocation,
        execute
    }: commandOptions) {
        if(!cooldown) cooldown = 0;
        if(!minArgs) minArgs = 0;
        if(!args) args = null;

        this.name = name;
        this.description = description;
        this.cooldown = cooldown;
        this.minArgs = minArgs;
        this.args = args;
        this.fileLocation = fileLocation;
        this.execute = execute;
    }
}