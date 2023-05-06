"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const ticket_1 = tslib_1.__importDefault(require("../objects/ticket"));
module.exports = {
    name: discord_js_1.Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        if (!(interaction instanceof discord_js_1.ButtonInteraction))
            return;
        const customId = interaction.customId;
        if (!(customId === 'support' || customId === 'report'))
            return;
        await ticket_1.default.create(interaction.client, interaction.member, customId);
    }
};
