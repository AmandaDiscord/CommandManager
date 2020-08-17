import Discord = require("discord.js");

declare class CommandManager {
	constructor();

	/**
	 * A cache of all Commands assigned to the manager keyed by the first alias in the Command
	 */
	public cache: Discord.Collection<string, Command>
	/**
	 * An auto managed Map keyed by category names with an Array of command's first aliases
	 */
	public categories: Map<string, Array<string>>;

	/**
	 * A method to assign Commands to the manager
	 */
	public assign(properties: Array<Command>): void;
	/**
	 * A method to remove Commands from the manager
	 */
	public remove(commands: Array<string>): void;
}
export = CommandManager;

interface Command {
	usage: string;
	description: string;
	aliases: Array<string>;
	category: string;
	example?: string;
	order?: number;
	process(...args: Array<any>): any;
}
