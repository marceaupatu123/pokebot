import { Events, type GuildMember } from 'discord.js'
module.exports = {
  name: Events.GuildMemberUpdate,
  once: false,
  async execute (oldMember: GuildMember, newMember: GuildMember) {
    if (oldMember.pending && !newMember.pending) {
      const memberRole = oldMember.guild.roles.cache.get(process.env.roleMemberId!)
      if (typeof memberRole === 'undefined') throw new Error('memberRole not found!')
      return await newMember.roles.add(memberRole)
    }
  }
}
