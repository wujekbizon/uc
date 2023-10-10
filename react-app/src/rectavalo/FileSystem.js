import { nativeCallx1Param, log } from "./RectavaloWeb"

const FileSystem = {
  cwd: async () => { 
    const result = await nativeCallx1Param({
      fn: "cwd",
      ns: "filesystem"
    })
    if (result.error)
      throw new Error(result.error)

    return result.result
  },
  ls: async (path) => {
    const result = await nativeCallx1Param({
      fn: "listdir",
      ns: "filesystem",
      path
    })

    if (result.error)
      throw new Error(result.error)

    return result.result
  },
  stat: () => { return {} },
  readFile: async (path) => {
    const result = await nativeCallx1Param({
      fn: "readfile",
      ns: "io",
      path
    })

    if (result.error)
      throw new Error(result.error)

    const data_array = []

    for (const char of result.result) {
      data_array.push(String.fromCharCode(char))
    }

    return data_array.join('')
  },
  readFileBuffered: async (path, offset, bufferLength) => {
    const result = await nativeCallx1Param({
      fn: "readfile",
      ns: "io",
      path,
      offset,
      bufferLength
    })

    // happens when user clicks around on different files
    if (result === undefined || result.result === undefined) {
      debugger
      return { buffer: '' }
    }

    if (result.error)
      throw new Error(result.error)

    const data_array = []

    for (const char of result.result) {
      data_array.push(String.fromCharCode(char))
    }

    return { buffer: data_array.join(''), size: result.size }
  },
  writeFile: () => {  },
  rename: () => { },
  rm: () => {},
  mkdir: () => {},
}

export default FileSystem
