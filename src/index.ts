import {
  Events,
  GatewayIntentBits,
  REST,
  RESTPutAPIApplicationCommandsResult,
  Routes,
} from 'discord.js';
import type { Command } from './interfaces/Command.js';
import { configSchema } from './interfaces/Config.js';
import ExtendedClient from './interfaces/ExtendedClient.js';
import fs from 'fs/promises';
import type { GenericEvent } from './interfaces/Event.js';
import { resolve } from 'path';

async function main() {
  const rawConfig = await fs.readFile('./config.json', { encoding: 'utf-8' });

  const config = configSchema.parse(JSON.parse(rawConfig));

  const { token } = config;

  const client = new ExtendedClient(
    {
      intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
      ],
    },
    config,
  );

  const commandsFiles = await fs.readdir('./build/commands', {
    encoding: 'utf-8',
    withFileTypes: true,
  });

  const commandsPromises = commandsFiles
    .filter((f) => f.name.endsWith('.js'))
    .map(async (f) => {
      return await import(`file://${resolve(f.path)}/${f.name}`);
    });

  const commandsModules: { command: Command }[] = await Promise.all(commandsPromises);

  client.commands = commandsModules.map((c) => c.command);

  const eventsFiles = await fs.readdir('./build/events', {
    encoding: 'utf-8',
    withFileTypes: true,
  });

  const eventsPromises = eventsFiles
    .filter((f) => f.name.endsWith('.js'))
    .map(async (f) => {
      return await import(`file://${resolve(f.path)}/${f.name}`);
    });

  const events: { event: GenericEvent }[] = await Promise.all(eventsPromises);

  events.forEach(({ event }) => {
    if (event.name === Events.Raw) {
      //
    } else if (event.once) {
      client.once(event.name, (...args: unknown[]) => event.execute(...args));
    } else {
      client.on(event.name, (...args: unknown[]) => event.execute(...args));
    }
  });

  client.login(token);
}

async function deploy() {
  const rawConfig = await fs.readFile('./config.json', { encoding: 'utf-8' });

  const config = JSON.parse(rawConfig);

  const { token, applicationId } = config;

  const rest = new REST().setToken(token);

  const commandsFiles = await fs.readdir('./build/commands', {
    encoding: 'utf-8',
    withFileTypes: true,
  });

  const promises = commandsFiles
    .filter((f) => f.name.endsWith('.js'))
    .map(async (f) => {
      return await import(`file://${resolve(f.path)}/${f.name}`);
    });

  const commandsModules: { command: Command }[] = await Promise.all(promises);

  const response = (await rest.put(Routes.applicationCommands(applicationId), {
    body: commandsModules.map((c) => c.command.data.toJSON()),
  })) as RESTPutAPIApplicationCommandsResult;

  console.log(`Refreshed ${response.length} commands.`);
}

if (process.argv[2] === 'deploy') {
  deploy();
}

main();
