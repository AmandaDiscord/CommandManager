import Discord = require("discord.js");

declare class CommandStore extends Discord.Collection<string, Command> {
	constructor();

	public categories: Map<string, Array<string>>;

	public assign(properties: { [name: string]: Command; }): void;
}
export = CommandStore;

interface Command {
	usage: string;
	description: string;
	aliases: Array<string>;
	category: string;
	process(message: Discord.Message, arguments: string, ...extras: Array<any>): any;
}
