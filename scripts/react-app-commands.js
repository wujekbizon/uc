import * as buildConstants from './build-constants.js'
import { spawn } from 'node:child_process'
import { withSuffix, recursedir } from './helpers.js'
import * as fs from "node:fs/promises"
import Path from 'node:path'
import { argv } from 'node:process'

const buildWebApp = async () => {
  const child = spawn(withSuffix('npm'), ['run', 'build'], { cwd: buildConstants.reactApp })

  const output = []

  child.stderr.on('data', (data) => {
    console.log(data.toString())
  })

  child.stdout.on('data', (data) => {
    output.push(data)
  })

  child.on('close', (code) => {
    console.log(`child exited with: ${code}`)
    if (code != 0) {
      output.forEach(line => {
        buildConstants.log(line.toString())
      })
    }
  })
}

const xformWebApp = async (argv) => {
  console.info(argv)
  console.log(`${buildConstants.reactAppBuild} => ${buildConstants.reactAppXform}`)

  recursedir(buildConstants.reactAppBuild, async (path, data, entry) => {
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
