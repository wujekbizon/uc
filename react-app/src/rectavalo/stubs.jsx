import {
  nativeCall,
  nativeMessage
}
from './RectavaloWeb'

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

export {
  path,
  process,
}
