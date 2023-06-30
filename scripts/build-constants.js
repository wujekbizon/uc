import Path from 'node:path'

export const reactApp = 'react-app'
export const reactAppBuild = Path.join(reactApp, 'build')
export const build = '_build'
export const reactAppXform = Path.join(build, 'static_html')
export const win32sln = `win32\\Win32WebView.sln`
export const mobile = 'mobile'
export const androidAssets = Path.join(mobile, 'android', 'app', 'src', 'main', 'assets')
// Chose somethign different that can easily work with gitignore (doesn't require full path)
export const staticAssets = 'react-static'
