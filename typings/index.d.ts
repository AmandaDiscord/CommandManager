import { Collection } from "@discordjs/collection";

declare class CommandManager<Params extends Array<any>> {
	public static readonly default: typeof CommandManager;

	public constructor();

	/**
	 * A cache of all Commands assigned to the manager keyed by the first alias in the Command
	 */
	public cache: Collection<string, Command<Params>>
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

interface Command<Params extends Array<any>> {
	name: string;
	options?: Array<import("discord-typings").ApplicationCommandOption>;
	description: string;
	category: string;
	examples?: Array<string>;
	order?: number;
	process(...args: Params): any;
}
