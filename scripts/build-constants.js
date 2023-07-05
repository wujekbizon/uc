import Path from 'node:path'

export const reactApp = 'react-app'
export const reactAppBuild = Path.join(reactApp, 'build')
export const build = '_build'
export const reactAppXform = Path.join(build, 'static_html')
export const win32sln = `win32\\Win32WebView.sln`
export const mobile = 'mobile'
export const androidAssets = Path.join(mobile, 'android', 'app', 'src', 'main', 'assets')
export const iosArchiveArgs = ['CODE_SIGN_IDENTITY="Apple Development"', 'CODE_SIGN_STYLE=Automatic']
export const iosExportPlist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>method</key>
  <string>development</string>
</dict>
</plist>
`

// Chose somethign different that can easily work with gitignore (doesn't require full path)
export const staticAssets = 'react-static'
