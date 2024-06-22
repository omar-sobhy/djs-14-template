import type Event from '../interfaces/Event.js';
import { Events } from 'discord.js';

export const event: Event<Events.Raw> = {
  name: Events.Raw,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(client, data) {
    if (client.config.debugRaw) {
      console.log(data);
    }
  },
};

export default event;
