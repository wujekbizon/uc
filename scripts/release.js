import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { buildWebApp, xformWebApp, buildApp } from './react-app-commands.js'
import * as buildConstants from './build-constants.js'
import { exit } from 'node:process'

yargs(hideBin(process.argv))
  .command('build-web-app', 'runs `npm run build` to produce static html app', () => {}, async (argv) => {
    exit(await buildWebApp(argv))
  })
  .command('xform-web-app', `changes web app import paths so they are relative. Outputs to ${buildConstants.reactAppXform}`, () => {}, async (argv) => {
    exit(await xformWebApp(argv))
  })
  .command('build-app <platform> [<host>]', 'Builds app for a specific <platform> using ssh <host>. Outputs to _build/<platform>', () => {}, async (argv) => {
    exit(await buildApp(argv))
  })
  .demandCommand(1)
  .parse()
