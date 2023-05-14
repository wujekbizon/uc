//
// This is an example build script for Socket Runtime
// When you run 'ssc build', this script (node build.js) will be run
//
import fs from 'node:fs'
import path from 'node:path'

import esbuild from 'esbuild'
import {sassPlugin} from'esbuild-sass-plugin'

const cp = async (a, b) => fs.promises.cp(
  path.resolve(a),
  path.join(b, path.basename(a)),
  { recursive: true, force: true }
)

async function main () {
  const prod = process.argv.find(s => s.includes('--prod'))

  const params = {
    entryPoints: ['src/App.scss', 'src/index.jsx'],
    format: 'esm',
    bundle: true,
    loader: {
      ".png": "dataurl",
      ".woff": "dataurl",
      ".woff2": "dataurl",
      ".eot": "dataurl",
      ".ttf": "dataurl",
      ".svg": "dataurl",
  },
    minify: !!prod,
    sourcemap: !prod,
    external: ['socket:*'],
    plugins: [sassPlugin()]
  }

  const watch = process.argv.find(s => s.includes('--watch'))
  const serve = process.argv.find(s => s.includes('--serve'))

  //
  // The second argument to this program will be the target-OS specifc
  // directory for where to copy your build artifacts
  //
  let target = path.resolve(process.argv[2])

  let context
  if (serve || watch) {
    target = 'build/esbuild'
    fs.promises.mkdir(target, {recursive: true})
    context = await esbuild.context({...params, outdir: path.resolve(target) })
  }

  let promises = []

  if (serve) {
    promises.push(context.serve({servedir: path.resolve(target)}))
  }

  if (watch) {
    promises.push(context.watch())
  }

  if (!(watch || serve)) {
    await esbuild.build({
      ...params,
      outfile: path.join(target, 'index.js')
    })
  }
  if (process.argv.find(s => s.includes('--test'))) {
    await esbuild.build({
      ...params,
      entryPoints: ['test/index.js'],
      outdir: path.join(target, 'test')
    })
  }

  //
  // Not writing a package json to your project could be a security risk
  //
  await fs.promises.writeFile(path.join(target, 'package.json'), '{ "type": "module", "private": true }')

  if (!target) {
    console.log('Did not receive the build target path as an argument!')
    process.exit(1)
  }

  //
  // Copy some files into the new project
  //
  await Promise.all([
    cp('src/index.html', target),
    cp('src/index.css', target),
    cp('src/icon.png', target)
  ])

  Promise.all(promises)
}

main()
