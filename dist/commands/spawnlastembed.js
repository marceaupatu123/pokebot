"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('spawn')
        .setDescription('Wow'),
    async execute(interaction) {
        const button = new discord_js_1.ButtonBuilder()
            .setCustomId('report')
            .setLabel('Porter plainte')
            .setStyle(discord_js_1.ButtonStyle.Danger)
            .setEmoji('1103373570194812928');
        const row = new discord_js_1.ActionRowBuilder()
            .addComponents(button);
        await interaction.channel.send({ content: 'Ouvrez un ticket pour toute **plainte à l\'encontre d\'un joueur** <:NAN:1103277577948364944>', components: [row] });
    }
};
