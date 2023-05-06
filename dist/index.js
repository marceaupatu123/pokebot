"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_1 = require("dotenv");
const fs = tslib_1.__importStar(require("fs"));
const discord_js_1 = require("discord.js");
const path = require('path');
(0, dotenv_1.config)();
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.GuildMembers
    ]
});
client.commands = new discord_js_1.Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.ts'));
commandFiles.forEach((file) => {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if (Object.prototype.hasOwnProperty.call(command, 'data') &&
        Object.prototype.hasOwnProperty.call(command, 'execute')) {
        client.commands.set(command.data.name, command);
    }
    else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
});
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith('.ts'));
eventFiles.forEach((file) => {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    try {
        if (Object.prototype.hasOwnProperty.call(event, 'once') && event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        }
        else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
    catch (error) {
        console.error(error);
    }
});
client.on(discord_js_1.Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand() &&
        !interaction.isUserContextMenuCommand()) {
        return;
    }
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }
    try {
        await command.execute(interaction);
    }
    catch (error) {
        console.error(error);
        await interaction.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true
        });
    }
});
client.login(process.env.botToken);
