import { Client, Events } from 'discord.js';
import type Event from '../interfaces/Event.js';

export const event: Event<Events.ClientReady> = {
  name: Events.ClientReady,
  once: true,
  async execute(client: Client) {
    console.log(`Logged in as ${client.user?.displayName}`);
  },
};

export default event;
