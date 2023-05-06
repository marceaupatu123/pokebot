import { config } from 'dotenv'
import { type Client, type GuildMember, type Guild, type TextChannel, ChannelType, ThreadAutoArchiveDuration, type ThreadChannel, EmbedBuilder, ForumChannel } from 'discord.js'

config()

export default class Ticket {
  member: GuildMember
  type: string
  thread: ThreadChannel
  id: string
  private static guild: Guild // Add static keyword here
  private static ticketChannel: TextChannel // Add static keyword here

  private constructor (member: GuildMember, type: string, thread: ThreadChannel, id: string) {
    this.member = member
    this.type = type
    this.thread = thread
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
    const salonQuestion = this.guild.channels.cache.get(process.env.salonQuestionId!)
    if (typeof salonQuestion === 'undefined' || !(salonQuestion instanceof ForumChannel)) throw new Error('salonQuestion not found!')
    const embed = new EmbedBuilder()
      .setThumbnail('https://media.discordapp.net/attachments/1102989329879531624/1104382930362585179/2Q-removebg-preview.png?width=105&height=86')
      .setColor('#cbbfa8')
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      .setDescription(`Bienvenu dans ton ticket ${member.toString()}!\n Merci de nous faire confiance pour régler ton problème, un membre de nos équipes va venir t'aider à résoudre ton problème.\nSi tu as simplement des questions nous t'invitons à favoriser le salon ${salonQuestion.toString()} et fermer ce ticket.`)
      .addFields({ name: '📜 Instructions', value: '➡️ Décris ta situation clairement à la suite de ce message, plus tu sera détaillé dans ta description et plus le processus sera rapide et efficace.\n➡️ Soit respectueux dans ta demande ! Prend ton mal en patience et ne te montre pas agressif.\n➡️ Répond dans les dernière 24h suivant une réponse du staff, auquel cas ton ticket sera automatiquement fermé.' })
    await thread.send({ embeds: [embed] })
    return new Ticket(member, type, thread, id)
  }
}
