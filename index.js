// @ts-check
const Discord = require("discord.js");

/** @template {Array<any>} Params */
class CommandManager {
	constructor() {
		/**
		 * A cache of all Commands assigned to the manager keyed by the first alias in the Command
		 *
		 * @type {Discord.Collection<string, Command<Params>>}
		 */
		this.cache = new Discord.Collection()
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
			if (this.cache.get(i.aliases[0])) this.cache.delete(i.aliases[0])
			this.cache.set(i.aliases[0], i)
			this.categories.forEach(c => {
				if (c.includes(i.aliases[0])) c.splice(c.indexOf(i.aliases[0]), 1)
			})
			const cat = this.categories.get(i.category)
			if (!cat) this.categories.set(i.category, [i.aliases[0]])
			else if (!cat.includes(i.aliases[0])) cat.push(i.aliases[0])
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

module.exports = CommandManager;

/**
 * @template {Array<any>} Params
 * @typedef {Object} Command
 * @property {string} usage
 * @property {string} description
 * @property {Array<string>} aliases
 * @property {string} category
 * @property {Array<string>} [examples]
 * @property {number} [order]
 * @property {(...args: Params) => any} process
 */
