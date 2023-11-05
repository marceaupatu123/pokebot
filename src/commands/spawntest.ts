import {
  SlashCommandBuilder,
  type BaseInteraction,
  ChatInputCommandInteraction,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder,
} from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("spawnrolecolor")
    .setDescription("spawn le truc des roles color"),
  async execute(interaction: BaseInteraction) {
    if (!(interaction instanceof ChatInputCommandInteraction)) return;
    const selectMenu = new StringSelectMenuBuilder()
      .addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel("Rouge")
          .setEmoji("🔴")
          .setValue("1107689351409836104"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Vert")
          .setEmoji("🟢")
          .setValue("1107689357017628702"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Bleu Ciel")
          .setEmoji("🔵")
          .setValue("1107689359769083944"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Jaune")
          .setEmoji("🟡")
          .setValue("1107689356120039534"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Orange")
          .setEmoji("🟠")
          .setValue("1107689358858932355"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Violet")
          .setEmoji("🟣")
          .setValue("1107689647859060838"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Rose")
          .setEmoji("🦩")
          .setValue("1107689357793575044")
      )
      .setCustomId("rolecolormenu");
    const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
      selectMenu
    );
    await interaction.channel?.send({
      content: "Prends la couleur de ton choix !",
      components: [row],
    });
  },
};
