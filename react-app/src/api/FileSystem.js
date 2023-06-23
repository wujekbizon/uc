import { nativeCall, nativeCallx1Param } from "../RectavaloWeb"

const FileSystem = {
  ls: async (path) => { 
    let result = await nativeCallx1Param({
      fn: "listdir",
      ns: "filesystem",
      path
    })
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
