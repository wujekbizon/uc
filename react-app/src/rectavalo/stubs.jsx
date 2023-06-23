import {
  nativeCall,
  nativeMessage
}
from './RectavaloWeb'

// todo - stubs
const arch = async () => { 
  const r = await nativeCall('nativeHello')
  nativeCall(`console.log`, `arch: ${JSON.stringify(r.nativeResult)}`)
  return r.nativeResult
}

// todo - stubs
const path = {
  extname: () => { return "todo" },
  join: () => { return "todo" },
  dirname: () => { return "todo" },
  sep: '/'
}

// todo - stubs
const process = {
  cwd: () => { return "." },
}

// todo - stubs
const os = {
  platform: () => { return "win32" },
}

export {
  arch,
  path,
  process,
  os
}
