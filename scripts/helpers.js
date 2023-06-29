import os from 'node:os'
import { spawn } from 'node:child_process'
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

/**
 * @typedef SpawnSyncOptions
 * @member {String} bin - binary to execute
 * @member {String|undefined} cwd - Optional cwd
 * @member {Boolean} logErr - if true: Write stdout to console if there was an error. Write stderr to console regardless
 */

/**
 * @typedef SpawnSyncResult
 * @member {Number} exitCode
 * @member {String} stdout
 * @member {String} stderr
 */

/**
 * spawnSync
 * Simple shell exec.
 * Outputs stderr by default
 * Outputs stdout if exit code != 0
 * @param {SpawnSyncOptions} opts
 * @param  {...any} args - command line arguments
 * @returns 
 */
const spawnSync = async(opts, ...args) => {
  const bin = opts.bin ?? undefined
  const cwd = opts.cwd ?? undefined
  const logErr = opts.cwd !== false
  
  if (!bin) {
    throw new Error('opts.bin must be defined.')
  }

  const child = spawn(opts.bin, args, {cwd})
  const out = []
  const err = []


  child.stderr.on('data', (data) => {
    err.push(data.toString())
    if (logErr) {
      console.log(data.toString())
    }
  })

  child.stdout.on('data', (data) => {
    out.push(data.toString())
  })

  const p = new Promise((resolve) => {
    child.on('close', (code) => {
      const result = { exitCode: code }
      result.stdout = out.join('\n')
      result.stderr = err.join('\n')
      if (code != 0 && logErr) {
        console.log(result.stdout)
      }

      resolve(result)
    })
  })

  return p
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

export { withSuffix, recursedir, spawnSync }
