import { AuditLogEvent, EmbedBuilder, Events, TextChannel, type GuildMember } from 'discord.js'
import { footer } from '../messages.json'

module.exports = {
  name: Events.GuildMemberRemove,
  once: false,
  async execute (member: GuildMember) {
    const fetchedLogs = await member.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.MemberKick })
    const kickLog = fetchedLogs.entries.first()
    if (typeof kickLog === 'undefined' || member.joinedAt === null) return
    if (kickLog?.createdAt < member.joinedAt) return
    const logChannel = member.guild.channels.cache.get(process.env.salonLogId!)
    if (!(logChannel instanceof TextChannel)) return
    const avatarURL = member.displayAvatarURL()
    const embed = new EmbedBuilder()
      .setDescription(`L'utilisateur ${member.toString()} à été expulsé par ${kickLog.executor?.toString() ?? 'N/A'} pour la raison suivante : \`\`\`${kickLog.reason ?? 'N/A'} \`\`\``)
      .setThumbnail(avatarURL)
      .setColor('Blue')
      .setFooter(footer)
    await logChannel.send({ embeds: [embed] })
  }
}
