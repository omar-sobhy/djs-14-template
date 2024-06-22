import { Client, ClientOptions } from 'discord.js';
import { Command } from './Command.js';
import { Config } from './Config.js';
import { GenericEvent } from './Event.js';

class ExtendedClient extends Client {
  /**
   * 
   * @param options options that will be passed to the discord.js `Client` constructor
   * @param config an object containing various configuration information
   * @param commands array of slash commands
   * @param events array of events
   */
  constructor(
    options: ClientOptions,
    public config: Config,
    public commands: Command[] = [],
    public events: GenericEvent[] = [],
  ) {
    super(options);
  }
}

export default ExtendedClient;
