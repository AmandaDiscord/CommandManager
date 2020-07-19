## CommandManager
Written by @PapiOphidian, this module serves as a Command manager and holder for Amanda. The original source has been modified to allow for usage cases outside of Amanda and also for adaptability if the future requires it to change.

This module depends on Discord.js because it makes use of Discord.js' Collection class which is arguably better than the built in Map class. CommandManager can be used with any Discord API wrapper, however.

# Usage
There are no typings for the Command#process method by default. If you are using VSCode's intellisense for TS or VSCode's CheckJS, you may run into issues with it yelling at you unless you type things properly. Previous versions were typed like:

```ts
interface Command<T extends Array<any>> {
	usage: string;
	description: string;
	aliases: Array<string>;
	category: string;
	example?: string;
	order?: number;
	process(message: Discord.Message, args: string, extras: ...T): any;
}
```

The message, args and extras in the process method params were removed in favor for just a ...T which is a destructured Array of whatever you want it to be. If you want the old style of how things worked, you'd have to do:

```js
const Discord = require("discord.js")
const CommandManager = require("@amanda/commandmanager");

/** @type {CommandManager<[Discord.Message, string]>} */
const commands = new CommandManager();
```

Then append any other extras you want into the Array. The process is similar for TS

```ts
import Discord = require("discord.js");
import CommandManager = require("@amanda/commandmanager");

const commands: new CommandManager<[Discord.Message, string]>();
```
