import { type BaseInteraction, ButtonInteraction, Events } from 'discord.js'
import Ticket from '../objects/ticket'

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  async execute (interaction: BaseInteraction) {
    if (!(interaction instanceof ButtonInteraction)) return
    const customId = interaction.customId
    if (!(customId === 'support' || customId === 'report')) return
    await Ticket.create(interaction.client, interaction.member, customId)
  }
}
