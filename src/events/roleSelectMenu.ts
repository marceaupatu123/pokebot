import {
  type BaseInteraction,
  Events,
  StringSelectMenuInteraction,
} from "discord.js";

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction: BaseInteraction) {
    if (!(interaction instanceof StringSelectMenuInteraction)) return;
    await interaction.deferReply({ ephemeral: true });
    const customId = interaction.customId;
    const member = interaction.member;
    const memberRoles = interaction.member.roles;
    const roleToAdd = interaction.guild.roles.cache.get(interaction.values[0]);
    if (customId !== "rolecolormenu" || memberRoles === undefined) return;
    if (roleToAdd === undefined) return;
    const roleArray = [
      "1107689351409836104",
      "1107689357017628702",
      "1107689359769083944",
      "1107689356120039534",
      "1107689358858932355",
      "1107689647859060838",
      "1107689357793575044",
    ];
    for (const roleId of roleArray) {
      if (memberRoles.cache.has(roleId)) {
        const role = memberRoles.cache.get(roleId);
        if (role === undefined) continue;
        await member.roles.remove(role);
      }
    }
    await member.roles.add(roleToAdd);
    return await interaction.editReply({
      content: `Le role <@&${roleToAdd.id}> a bien été ajouté!`,
    });
  },
};
