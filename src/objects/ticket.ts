import { config } from 'dotenv'
import { type Client, type GuildMember, type Guild, type TextChannel, ChannelType, ThreadAutoArchiveDuration, type ThreadChannel } from 'discord.js'

config()

export default class Ticket {
  member: GuildMember
  type: string
  id: string
  private static guild: Guild // Add static keyword here
  private static ticketChannel: TextChannel // Add static keyword here

  private constructor (member: GuildMember, type: string, thread: ThreadChannel, id: string) {
    this.member = member
    this.type = type
    this.id = id
  }

  static async create (client: Client, member: GuildMember, type: string): Promise<Ticket> {
    this.guild = client.guilds.cache.get(process.env.localGuildId!) as Guild
    const ticketChannelId: string = type === 'report' ? process.env.salonPlainteId! : process.env.salonSupportId!
    this.ticketChannel = this.guild.channels.cache.get(ticketChannelId) as TextChannel
    const id = Math.random().toString(36).substr(2, 5)
    const thread = await this.ticketChannel.threads.create({
      name: `ticket-${id}`,
      autoArchiveDuration: ThreadAutoArchiveDuration.OneDay,
      type: ChannelType.PrivateThread,
      invitable: false,
      reason: `Ticket ouvert par ${member.toString()}`
    })
    await thread.members.add(member, 'Créateur du ticket')
    return new Ticket(member, type, thread, id)
  }
}
