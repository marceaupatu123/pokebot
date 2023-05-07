import { SlashCommandBuilder, BaseGuildTextChannel, type BaseInteraction, ChatInputCommandInteraction, type Message, AttachmentBuilder, EmbedBuilder } from 'discord.js'
import { commandDone } from '../messages.json'
import makeGraph from '../objects/graph'
module.exports = {
  data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Fais un sondage'),
  async execute (interaction: BaseInteraction) {
    if (!(interaction instanceof ChatInputCommandInteraction)) return
    // Delete the specified number of messages
    const channel = interaction.channel
    if (!(channel instanceof BaseGuildTextChannel)) return
    await interaction.reply('Veuillez écrire toute vos options dans ce format *option1/option2/...*\n Ne mettez pas plus de 5 options')
    const filter = (m: Message): boolean => m.author === interaction.user
    const collector = channel.createMessageCollector({ filter, max: 1, time: 10000 })
    collector.on('collect', async (m) => {
      const attachment = new AttachmentBuilder(makeGraph(m.content.split('/'), [23, 34, 103]), { name: 'graph.png' })
      const embed = new EmbedBuilder()
        .setImage('attachment://graph.png')
        .setColor('#0c3e89')
      await interaction.editReply({ content: commandDone, files: [attachment], embeds: [embed] })
    })
  }
}
