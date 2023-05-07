import { AuditLogEvent, Events, TextChannel, type GuildMember, EmbedBuilder } from 'discord.js'
import { footer } from '../messages.json'
module.exports = {
  name: Events.GuildMemberUpdate,
  once: false,
  async execute (oldMember: GuildMember, newMember: GuildMember) {
    if (oldMember.pending && !newMember.pending) {
      const memberRole = oldMember.guild.roles.cache.get(process.env.roleMemberId!)
      if (typeof memberRole === 'undefined') throw new Error('memberRole not found!')
      await newMember.roles.add(memberRole)
    }
    const fetchedMemberUpdateLogs = await newMember.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.MemberUpdate })
    const memberUpdateLogs = fetchedMemberUpdateLogs.entries.first()
    const logChannel = newMember.guild.channels.cache.get(process.env.salonLogId!)
    if (!(logChannel instanceof TextChannel)) return
    const avatarURL = newMember.displayAvatarURL()
    if (!(typeof memberUpdateLogs === 'undefined' || newMember.joinedAt === null)) {
      if (!(logChannel instanceof TextChannel)) return
      const embed = new EmbedBuilder()
        .setDescription(`L'utilisateur ${newMember.toString()} à été banni par ${memberUpdateLogs.executor?.toString() ?? 'N/A'} pour la raison suivante : \`\`\`${memberUpdateLogs.reason ?? 'N/A'} \`\`\``)
        .setThumbnail(avatarURL)
        .setColor('Red')
        .setFooter(footer)
      await logChannel.send({ embeds: [embed] })
    }
  }
}
