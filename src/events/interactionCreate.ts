import { BaseInteraction, Events } from 'discord.js';
import type Event from '../interfaces/Event.js';
import type ExtendedClient from '../interfaces/ExtendedClient.js';

export const event: Event<Events.InteractionCreate> = {
  name: Events.InteractionCreate,
  async execute(interaction: BaseInteraction) {
    if (interaction.isChatInputCommand()) {
      (interaction.client as ExtendedClient).commands.forEach((c) => {
        if (c.data.name === interaction.commandName) {
          c.execute(interaction);
        }
      });
    }
  },
};

export default event;
