import {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  type UserContextMenuCommandInteraction,
  GuildMember,
} from "discord.js";
import Ticket from "../objects/ticket";
import { commandDone } from "../messages.json";

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("Report l'Utilisateur")
    .setType(ApplicationCommandType.User),
  async execute(interaction: UserContextMenuCommandInteraction) {
    if (
      !(
        interaction.member instanceof GuildMember &&
        interaction.targetMember instanceof GuildMember
      )
    )
      return;
    const theTicket = await Ticket.create(
      interaction.client,
      interaction.member,
      "report"
    );
    await theTicket.thread.send(
      `Le créateur du ticket s'est plaint de ${interaction.targetMember.toString()}`
    );
    return await interaction.reply({ content: commandDone, ephemeral: true });
  },
};
