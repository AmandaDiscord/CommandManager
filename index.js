// @ts-check

const { Collection } = require("@discordjs/collection")

/** @template {Array<any>} Params */
class CommandManager {
	constructor() {
		/**
		 * A cache of all Commands assigned to the manager keyed by the first alias in the Command
		 *
		 * @type {Collection<string, Command<Params>>}
		 */
		this.cache = new Collection()
		/**
		 * An auto managed Map keyed by category names with an Array of command's first aliases
		 *
		 * @type {Map<string, Array<string>>}
		 */
		this.categories = new Map()
	}
	/**
	 * A method to assign Commands to the manager
	 *
	 * @param {Array<Command<Params>>} properties
	 */
	assign(properties) {
		properties.forEach(i => {
			if (this.cache.get(i.name)) this.cache.delete(i.name)
			this.cache.set(i.name, i)
			this.categories.forEach(c => {
				if (c.includes(i.name)) c.splice(c.indexOf(i.name), 1)
			})
			const cat = this.categories.get(i.category)
			if (!cat) this.categories.set(i.category, [i.name])
			else if (!cat.includes(i.name)) cat.push(i.name)
		})
	}
	/**
	 * A method to remove Commands from the manager
	 *
	 * @param {Array<string>} commands
	 */
	remove(commands) {
		for (const command of commands) {
			if (this.cache.get(command)) {
				this.cache.delete(command)
				this.categories.forEach(c => {
					if (c.includes(command)) c.splice(c.indexOf(command), 1)
				})
			}
		}
	}
}
CommandManager.default = CommandManager

module.exports = CommandManager;

/**
 * @template {Array<any>} Params
 * @typedef {Object} Command
 * @property {string} name
 * @property {Array<import("discord-typings").ApplicationCommandOption>} [options]
 * @property {string} description
 * @property {string} category
 * @property {Array<string>} [examples]
 * @property {number} [order]
 * @property {(...args: Params) => any} process
 */
