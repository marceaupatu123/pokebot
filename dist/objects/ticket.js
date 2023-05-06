"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const discord_js_1 = require("discord.js");
(0, dotenv_1.config)();
class Ticket {
    member;
    type;
    id;
    static guild;
    static ticketChannel;
    constructor(member, type, thread, id) {
        this.member = member;
        this.type = type;
        this.id = id;
    }
    static async create(client, member, type) {
        this.guild = client.guilds.cache.get(process.env.localGuildId);
        const ticketChannelId = type === 'report' ? process.env.salonPlainteId : process.env.salonSupportId;
        this.ticketChannel = this.guild.channels.cache.get(ticketChannelId);
        const id = Math.random().toString(36).substr(2, 5);
        const thread = await this.ticketChannel.threads.create({
            name: `ticket-${id}`,
            autoArchiveDuration: discord_js_1.ThreadAutoArchiveDuration.OneDay,
            type: discord_js_1.ChannelType.PrivateThread,
            invitable: false,
            reason: `Ticket ouvert par ${member.toString()}`
        });
        await thread.members.add(member, 'Créateur du ticket');
        return new Ticket(member, type, thread, id);
    }
}
exports.default = Ticket;
