import { InferType, s } from '@sapphire/shapeshift';

export const configSchema = s.object({
  token: s.string({ message: 'token must be a string.' }).lengthGreaterThan(0, { message: 'Token must be nonempty.' }),
  guildId: s.string({ message: 'guildIt must be a string.' }).optional(),
  applicationid: s.string({ message: 'applicationId must be a string.' }).optional(),
  debugRaw: s.boolean({ message: 'debugRaw must be a boolean.' }).optional(),
});

export type Config = InferType<typeof configSchema>;
