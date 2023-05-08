import {
  AuditLogEvent,
  EmbedBuilder,
  Events,
  TextChannel,
  type GuildMember,
} from "discord.js";
import { footer } from "../messages.json";

module.exports = {
  name: Events.GuildMemberRemove,
  once: false,
  async execute(member: GuildMember) {
    const fetchedKickLogs = await member.guild.fetchAuditLogs({
      limit: 1,
      type: AuditLogEvent.MemberKick,
    });
    const fetchedBanLogs = await member.guild.fetchAuditLogs({
      limit: 1,
      type: AuditLogEvent.MemberBanAdd,
    });
    const kickLog = fetchedKickLogs.entries.first();
    const banLog = fetchedBanLogs.entries.first();
    const logChannel = member.guild.channels.cache.get(process.env.salonLogId!);
    if (!(logChannel instanceof TextChannel)) return;
    const avatarURL = member.displayAvatarURL();
    if (!(typeof banLog === "undefined" || member.joinedAt === null)) {
      if (banLog?.createdAt < member.joinedAt) return;
      if (!(logChannel instanceof TextChannel)) return;
      const embed = new EmbedBuilder()
        .setDescription(
          `L'utilisateur ${member.toString()} à été banni par ${
            banLog.executor?.toString() ?? "N/A"
          } pour la raison suivante : \`\`\`${banLog.reason ?? "N/A"} \`\`\``
        )
        .setThumbnail(avatarURL)
        .setColor("Red")
        .setFooter(footer);
      await logChannel.send({ embeds: [embed] });
    }
    if (!(typeof kickLog === "undefined" || member.joinedAt === null)) {
      if (kickLog?.createdAt < member.joinedAt) return;
      const embed = new EmbedBuilder()
        .setDescription(
          `L'utilisateur ${member.toString()} à été expulsé par ${
            kickLog.executor?.toString() ?? "N/A"
          } pour la raison suivante : \`\`\`${kickLog.reason ?? "N/A"} \`\`\``
        )
        .setThumbnail(avatarURL)
        .setColor("Orange")
        .setFooter(footer);
      await logChannel.send({ embeds: [embed] });
    }
    if (!(typeof kickLog === "undefined" || member.joinedAt === null)) {
      if (kickLog?.createdAt < member.joinedAt) return;
      const embed = new EmbedBuilder()
        .setDescription(
          `L'utilisateur ${member.toString()} à été expulsé par ${
            kickLog.executor?.toString() ?? "N/A"
          } pour la raison suivante : \`\`\`${kickLog.reason ?? "N/A"} \`\`\``
        )
        .setThumbnail(avatarURL)
        .setColor("Orange")
        .setFooter(footer);
      await logChannel.send({ embeds: [embed] });
    }
  },
};
