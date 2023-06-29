import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { buildWebApp, xformWebApp, buildApp } from './react-app-commands.js'
import * as buildConstants from './build-constants.js'

yargs(hideBin(process.argv))
  .command('build-web-app', 'runs `npm run build` to produce static html app', () => {}, (argv) => {
    buildWebApp(argv)
  })
  .command('xform-web-app', `changes web app import paths so they are relative. Outputs to ${buildConstants.reactAppXform}`, () => {}, (argv) => {
    xformWebApp(argv)
  })
  .command('build-app <platform> [<host>]', 'Builds app for a specific <platform> using ssh <host>. Outputs to _build/<platform>', () => {}, (argv) => {
    console.info(argv)
  })
  .demandCommand(1)
  .parse()
