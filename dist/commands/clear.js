"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('clear')
        .setDescription('Supprime un nombre spécifique de messages')
        .addIntegerOption(option => option.setName('montant')
        .setDescription('Le nombre de messages')
        .setRequired(true)),
    async execute(interaction) {
        if (!(interaction instanceof discord_js_1.ChatInputCommandInteraction))
            return;
        const amount = interaction.options.getInteger('montant');
        const channel = interaction.channel;
        if (!(channel instanceof discord_js_1.BaseGuildTextChannel))
            return;
        const messages = await channel.bulkDelete(amount);
        await interaction.reply({ content: `Supression de ${messages.size} messages!`, ephemeral: true });
    }
};
