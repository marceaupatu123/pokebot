"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    name: discord_js_1.Events.ClientReady,
    once: true,
    async execute(client) {
        if (client.user === null)
            return;
        client.user.setStatus('idle');
        client.user.setActivity('Démarrage du Bot', {
            type: discord_js_1.ActivityType.Streaming
        });
        console.log(`Ready! Logged in as ${client.user.tag}`);
        client.user.setStatus('online');
        client.user.setActivity('le pikachu de Dominus', {
            type: discord_js_1.ActivityType.Watching
        });
    }
};
