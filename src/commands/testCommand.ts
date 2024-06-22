import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import type { Command } from '../interfaces/Command.js';

export const command: Command = {
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('A test command')
    .addStringOption((option) => {
      return option.setName('query').setDescription('Query').setAutocomplete(true);
    }),
  async execute(interaction: ChatInputCommandInteraction) {
    interaction.reply('Test successful.');
  },
};

export default command;
