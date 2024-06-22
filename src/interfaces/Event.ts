import { ClientEvents, Events } from 'discord.js';
import ExtendedClient from './ExtendedClient.js';

export default interface Event<Name extends keyof ClientEvents | Events.Raw> {
  name: Name;
  once?: boolean;
  execute: (...args: Name extends keyof ClientEvents ? ClientEvents[Name] : [ExtendedClient, unknown]) => Promise<void>;
}

export interface GenericEvent {
  name: string;
  once?: boolean;
  execute: (...args: unknown[]) => Promise<void>;
}
