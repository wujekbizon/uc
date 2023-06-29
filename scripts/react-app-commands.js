import * as buildConstants from './build-constants.js'
import { withSuffix, spawnSync, recursedir } from './helpers.js'
import * as fs from "node:fs/promises"
import Path from 'node:path'

const buildWebApp = async () => {
  const { exitCode } = await spawnSync({bin: withSuffix('npm'), cwd: buildConstants.reactApp}, 'run', 'build')
  return exitCode
}

const xformWebApp = async (argv) => {
  console.info(argv)
  console.log(`${buildConstants.reactAppBuild} => ${buildConstants.reactAppXform}`)

  await fs.rmdir(buildConstants.reactAppXform)

  await recursedir(buildConstants.reactAppBuild, async (path, data, entry) => {
    const src = Path.join(path, entry.name)
    const dest = src.replace(buildConstants.reactAppBuild, buildConstants.reactAppXform)
    await fs.mkdir(Path.dirname(dest), { recursive: true })
    let contents = await fs.readFile(src)
    // make paths relative
    if (src.endsWith(".html")) {
      console.log(`modifying ${src} => ${dest}`)
      contents = contents.toString().replaceAll('"/static', '"./static')
    } else if (src.endsWith(".css")) {
      console.log(`modifying ${src} => ${dest}`)
      contents = contents.toString().replaceAll('src:url(/static/', 'src:url(../')
    }
    await fs.writeFile(dest, contents)
  }, {})

  return 0
}

const buildAppWin32 = async(argv) => {
  /*
  nuget restore
  msbuild Win32WebView.sln /p:Configuration=Debug
  cd x64\Debug; Win32WebView.exe
  */
}

const buildApp = async(argv) => {

}

export { buildWebApp, xformWebApp, buildApp }
