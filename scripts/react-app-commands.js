import * as buildConstants from './build-constants.js'
import { withSuffix, spawn, recursedir, exists } from './helpers.js'
import * as fs from "node:fs/promises"
import Path from 'node:path'

const buildWebApp = async () => {
  const { exitCode } = await spawn({bin: withSuffix('npm'), cwd: buildConstants.reactApp}, 'run', 'build')
  return exitCode
}

const xformWebApp = async (argv) => {
  console.info(argv)
  console.log(`${buildConstants.reactAppBuild} => ${buildConstants.reactAppXform}`)

  await fs.rm(buildConstants.reactAppXform, { recursive: true, force: true })

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

  await fs.writeFile(Path.join(buildConstants.reactAppXform, 'build.time'), Math.round(Date.now()/1000).toString())

  return 0
}

const buildAppWin32 = async(argv) => {
  const nugetResult = await spawn({bin: withSuffix('nuget'), cwd: Path.dirname(buildConstants.win32sln)},  'restore')
  if (nugetResult.exitCode != 0)
    return nugetResult.exitCode

  const msbuildResult = await spawn({bin: withSuffix('msbuild'), cwd: Path.dirname(buildConstants.win32sln)},  Path.basename(buildConstants.win32sln), '/p:Configuration=Release')
  if (msbuildResult.exitCode != 0)
    return msbuildResult.exitCode

  const buildPath = Path.join(Path.dirname(buildConstants.win32sln), 'x64', 'Release')
  const packagePath = Path.join(buildConstants.build, argv.platform)

  if (await exists(packagePath))
    await fs.rm(packagePath, { recursive: true, force: true })

  await recursedir(buildPath, async (path, data, entry) => {
    if (entry.name.endsWith(".exe") || entry.name.endsWith(".dll")) {
      const src = Path.join(path, entry.name)
      const dest = src.replace(buildPath, packagePath)
      
      console.log(`copy ${src} => ${dest}`)
      await fs.mkdir(Path.dirname(dest), { recursive: true })
      await fs.copyFile(src, dest)
    }
  })

  await recursedir(buildConstants.reactAppXform, async (path, data, entry) => {
    const src = Path.join(path, entry.name)
    const dest = src.replace(buildConstants.reactAppXform, packagePath)
    
    console.log(`copy ${src} => ${dest}`)
    await fs.mkdir(Path.dirname(dest), { recursive: true })
    await fs.copyFile(src, dest)
  })

  return 0
}

const buildAppAndroid = async() => {
  const packagePath = Path.join(buildConstants.androidAssets, buildConstants.staticAssets)
  if (await exists(packagePath))
    await fs.rm(packagePath, { recursive: true, force: true })

  await recursedir(buildConstants.reactAppXform, async (path, data, entry) => {
    const src = Path.join(path, entry.name)
    const dest = src.replace(buildConstants.reactAppXform, packagePath)
    
    console.log(`copy ${src} => ${dest}`)
    await fs.mkdir(Path.dirname(dest), { recursive: true })
    await fs.copyFile(src, dest)
  })

  const androidBuildPath = Path.join(buildConstants.mobile, 'android')
  const gradlewResult = await spawn({bin: withSuffix('gradlew'), cwd: androidBuildPath}, 'assembleRelease')

  console.log(gradlewResult.stdout)

  if (gradlewResult.exitCode !== 0)
    return gradlewResult.exitCode;

  // todo - install & launch if arg present
  console.log(`cd ${androidBuildPath} && ${Path.join(process.env.ANDROID_HOME, 'platform-tools', withSuffix('adb'))} install  ${Path.join('app', 'build', 'outputs', 'apk', 'release', 'app-release.apk')}`)

  return 0
}

const platformBuildMap = {
  win32: buildAppWin32,
  android: buildAppAndroid
}

const buildApp = async(argv) => {
  if (platformBuildMap[argv.platform] === undefined) {
    console.log(`build-app doesn't support platform ${argv.platform}`)
    return 1
  }

  return await platformBuildMap[argv.platform](argv)
}

export { buildWebApp, xformWebApp, buildApp }
