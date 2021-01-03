## CommandManager
Written by @PapiOphidian, this module serves as a Command manager and holder for Amanda. The original source has been modified to allow for usage cases outside of Amanda and also for adaptability if the future requires it to change.

# Usage
There are no typings for the Command#process method by default. If you are using TypeScript or VSCode's CheckJS, you may run into issues with it yelling at you unless you type things properly. Previous iterations were similar to:

```ts
interface Command<T extends Array<any>> {
	usage: string;
	description: string;
	aliases: Array<string>;
	category: string;
	examples?: Array<string>;
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
import Discord from "discord.js";
import CommandManager from "@amanda/commandmanager";

const commands: new CommandManager<[Discord.Message, string]>();
```
