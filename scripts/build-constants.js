import Path from 'node:path'

const reactApp = 'react-app'
const reactAppBuild = Path.join(reactApp, 'build')
const build = '_build'
const reactAppXform = Path.join(build, 'static_html')

export { reactApp, reactAppBuild, build, reactAppXform }
