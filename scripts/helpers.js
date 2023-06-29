import os from 'node:os'
import * as fs from "node:fs/promises"
import * as Path from "node:path"

const win32Suffixes = {
  'npm': 'cmd'
}

const withSuffix = (command) => {
  if (os.platform() !== 'win32')
    return

    if (win32Suffixes !== undefined) {
      return `${command}.${win32Suffixes[command]}`
    }

    return `${command}.exe`
}

const recursedir = async (path, cb, data) => {
  for (const entry of await (fs.readdir(path, { withFileTypes: true }))) {
    if (entry.isDirectory()) {
      await recursedir(Path.join(path, entry.name), cb, data)
    } if (entry.isFile()) {
      await cb(path, data, entry)
    }
  }

  return data
}

export { withSuffix, recursedir }
