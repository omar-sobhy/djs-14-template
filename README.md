A template for Discord.js v14 bots.

### Build
Run `npm install`, then run `npm run build` to run `tsc`.

### Run
First copy `config.example.json` to `config.json` and fill in the parameters. You can find the schema used to validate the config in `src/interfaces/Config.ts`. Currently, only `token` is required.

Now you can run `npm run start`. Pass `deploy` if application commands need to be refreshed: `npm run start -- deploy` (note the space).