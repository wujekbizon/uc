import { log } from './RectavaloWeb'
import sys from './sys'

const sep = sys.platform() === 'win32' ? '\\' : '/'

const removeTrailingSlash = (path) => {
  if (path.endsWith(sep)) 
  {
    path = path.substring(0,path.length-1)
  }
  return path
}

const join = (...args) => {
  let path = args.join(sep)
  return removeTrailingSlash(path)
}

const dirname = (path) => {
  // todo - win32 - check for 
  const rSlash = path.lastIndexOf(sep)
  // *nix - top level /
  if (rSlash === 0 && sys.platform() !== 'win32')
    return sep

  // win32 - a:\
  if (rSlash === 2 && path[1] === ':' && sys.platform() === 'win32')
    return path.substring(0,2)

  // win32 - \\ (unc root)
  if (rSlash === 1 && path[0] === sep && sys.platform() === 'win32')
    return path.substring(0,1)

  if (rSlash === -1)
    return ''

  return path.substring(0, rSlash)
}

const Path = {
  join,
  dirname,
  removeTrailingSlash,
  sep
}

export default Path
