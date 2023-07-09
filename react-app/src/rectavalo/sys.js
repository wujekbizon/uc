let _platform = undefined
let _arch = undefined
let _requestHardwareArch = false

const probePlatform = () => {
  if (_platform === undefined && (navigator.userAgent.indexOf('iPhone') >= 0 || navigator.userAgent.indexOf('iPad') >= 0))
    _platform = 'ios'
  else if (_platform === undefined && navigator.userAgent.indexOf('Android') >= 0)
    _platform = 'android'
  else if (_platform === undefined && navigator.userAgent.indexOf('Mac OS') >= 0)
    _platform = 'darwin'
  else if (_platform === undefined && navigator.userAgent.indexOf('Win64') >= 0)
    _platform = 'win32'
  else if (_platform === undefined && navigator.userAgent.indexOf('Linux') >= 0)
    _platform = 'linux'
}

const archs = ['x64', 'x86_64', 'x86', 'arm64', 'amd64', 'arm7-v8a', 'arm7']

const probeArch = () => {
  if (_arch !== undefined)
    return

  probePlatform()
  if (_platform === 'ios' || _platform === 'darwin') {
    // todo - these can't be determined from userAgent, implement native call
    _requestHardwareArch = true
    return
  }

  for (const arch of archs) {
    if (_arch === undefined && navigator.userAgent.indexOf(arch) >= 0) {
      _arch = arch
      break
    }
  }
}

const sys = {
  platform: () => {
    probePlatform()
    return _platform
  },

  architecture: () => {
    probeArch()
    return _arch
  }
}

export default sys
