import { nativeCallx1Param } from "./RectavaloWeb"

const FileSystem = {
  ls: async (path) => {
    let result = await nativeCallx1Param({
      fn: "listdir",
      ns: "filesystem",
      path
    })

    if (result.error)
      throw new Error(result.error)

    return result.result
   },
  stat: () => { return {} },
  readFile: () => { return "todo" },
  writeFile: () => {  },
  rename: () => { },
  rm: () => {},
  mkdir: () => {},
}

export default FileSystem
