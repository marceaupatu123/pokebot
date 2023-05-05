import { SlashCommandBuilder, type ChatInputCommandInteraction, ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js'

module.exports = {
  data: new SlashCommandBuilder()
    .setName('spawn')
    .setDescription('Wow'),
  async execute (interaction: ChatInputCommandInteraction) {
    const button = new ButtonBuilder()
      .setCustomId('report')
      .setLabel('Porter plainte')
      .setStyle(ButtonStyle.Danger)
      .setEmoji('1103373570194812928')

    const row = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(button)

    await interaction.channel!.send({ content: 'Ouvrez un ticket pour toute **plainte à l\'encontre d\'un joueur** <:NAN:1103277577948364944>', components: [row] })
  }
}
