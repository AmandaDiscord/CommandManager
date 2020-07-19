import Discord = require("discord.js");

declare class CommandManager<Params extends Array<any>> {
	constructor();

	/**
	 * A cache of all Commands assigned to the manager keyed by the first alias in the Command
	 */
	public cache: Discord.Collection<string, Command<Params>>
	/**
	 * An auto managed Map keyed by category names with an Array of command's first aliases
	 */
	public categories: Map<string, Array<string>>;

	/**
	 * A method to assign Commands to the manager
	 */
	public assign(properties: Array<Command<Params>>): void;
	/**
	 * A method to remove Commands from the manager
	 */
	public remove(commands: Array<string>): void;
}
export = CommandManager;

interface Command<T extends Array<any>> {
	usage: string;
	description: string;
	aliases: Array<string>;
	category: string;
	example?: string;
	order?: number;
	process(...T): any;
}
