import FileSystem from '../rectavalo/FileSystem'
import { log } from '../rectavalo/RectavaloWeb'
import Path from '../rectavalo/Path'

export const SORT_ASCENDING           = 0
export const SORT_DESCENDING          = 1
export const FILE_SORT_MODE_NAME      = 2
export const FILE_SORT_MODE_EXT       = 3
export const FILE_SORT_MODE_SIZE      = 4
export const FILE_SORT_MODE_DATE      = 5

/**
   * Returns sort order for a vs b if either are directories
   * Otherwise it is assumed that directories will be sorted in natural order
   * @param {fs.Dirent} a 
   * @param {fs.Dirent} b 
   * @returns 
   */
function sortDirectories (a, b) {
  if (a.isDirectory && b.isDirectory) {
    if (a.mtime === 0 || b.mtime === 0)
      // sort by name if either timestamps have no timestamp
      return sortName(a, b)
  }
  if (a.isDirectory &&  !b.isDirectory) return -1;

  return 1;
}

function sortName (a, b) {
  return a.name.localeCompare(b.name)
}

function sortExtension (a, b) {
  return a.ext.localeCompare(b.ext)
}

function sortSize (a, b) {
  if (a.size > b.size) return 1;
  if (b.size > a.size) return -1;
  return 0
}

function sortDate (a, b) {
  if (a.mtime > b.mtime) return 1;
  if (b.mtime > a.mtime) return -1;
  return 0
}

/**
 * Information for interacting with directory listings
 */
export default class DirectoryListData {

  /**
   * Create a DirectoryListData
   * @param {string} initialDirectory - The initial directory the FileViewer should list
   * @param {Number} sortDirection - SORT_ASCENDING (default) | SORT_DESCENDING
   * @param {Number} sortMode - FILE_SORT_MODE_NAME (default) | FILE_SORT_MODE_EXT | FILE_SORT_MODE_SIZE | FILE_SORT_MODE_DATE
   */
  constructor(initialDirectory) {
    this.currentDirectory = initialDirectory
    this._entries = []
    this._selectedEntries = []
    this._nextBasename = undefined
    this.sortDirection = SORT_ASCENDING
    this.sortMode = FILE_SORT_MODE_NAME
  }

  entryIndexOfBasename(basename) {
    if (basename === '..')
      return 0
    else
      return this._entries.findIndex(entry => {return entry.name === basename}) + 1
  }

  /**
   * nextCursorIndex - Returns the next cursor index which can be set via `nextBasename`
   * @param {Int} currentIndex 
   * @returns {Int} the index of nextBasename, or currentIndex if undefined
   */
  nextCursorIndex(currentIndex) {
    const basename = this._nextBasename
    this._nextBasename = undefined
    if (basename === undefined)
      return currentIndex

    // todo(@mribbons) - index could be determined at refresh time
    return this.entryIndexOfBasename(basename)
  }

  /**
   * nextBasename
   * @param {string} value - Set the basename of the item to be used on the next render
   */
  set nextBasename(value) {
    this._nextBasename = value
  }

  get currentDirectory() { return this._currentDirectory }
  set currentDirectory(value) {
    // dirname returns input if input ends with \
    // prevent \\ in path
    this._currentDirectory = value.endsWith('\\') ? value.substring(0, value.length-1) : value
  }

  traverse(entry) {
    // todo (@mribbons): support relative path, full path, split by dir sep
    // todo (@mribbons): navigate as far as possible even if final path doesn't exist
    const cd = this.currentDirectory;
    if (entry === '..') {
      return new DirectoryListData(Path.dirname(cd))
    } else if (entry.isDirectory) {
      return new DirectoryListData(Path.join(cd, entry.name))
    } else {
      // todo (@mribbons): cursor should move to file if path ends in file
      return this
    }
  }
  /**
   * get list of entries
   */
  get entries() {
    // todo(@mribbons): sort order
    // todo(@mribbons): directories at top option
    return [...this._entries];
  }

  /**
   * refresh listing
   * clears selectedEntries
   */
  async refresh(sortMode = this.sortMode, sortDirection = this.sortDirection) {
    this._selectedEntries = []
    
    let entries = []
    
    try {
      const results = (await FileSystem.ls(this._currentDirectory, { withFileTypes: true }))
      entries = results.map(entry => { 
        entry.isDirectory = entry.dir;
        return entry;
      })
    } catch (e) {
      log(`todo - toast error - failed to list: ${this._currentDirectory}: ${e.message}\n${e.stack}`)
    }
    
    // prevent duplicate refresh issue, assign entire list after processing
    this.sortMode = sortMode
    this.sortDirection = sortDirection
    this._entries = this.sort(entries)
  }
  
  /**
   * returns entries array sorted by current sortDirection and sortMode
   * @param {Array} entries 
   */
  sort(entries) {
    switch (this.sortMode) {
      case FILE_SORT_MODE_NAME:
        entries.sort(sortName)
        break;
      case FILE_SORT_MODE_EXT:
        entries.sort(sortExtension)
        break;
      case FILE_SORT_MODE_SIZE:
        entries.sort(sortSize)
        break;
      case FILE_SORT_MODE_DATE:
        entries.sort(sortDate)
        break;
      default:
        throw new Error(`Unsupported sort mode: ${this.sortMode}`)
    }

    if (this.sortDirection === SORT_DESCENDING)
      entries = entries.reverse()

    // todo(@mribbons): this should be optional
    entries.sort(sortDirectories)
    return entries
  }

  get selectedEntries() { return this._selectedEntries }
  set selectedEntries(value) { this._selectedEntries = value }

  /**
   * fullPath
   * Returns the full path for an entry
   * It is assumed that the entry was returned from this instance
   * @param {any} entry
   * @returns {String} - The full path to the file
   */
  fullPath (entry) {
    return Path.join(this._currentDirectory, [entry.name, entry.ext].join(''))
  }

  /**
   * getContents
   * @param {any} entry - file entry supplied from this instance
   * @returns {Promise<Buffer>} Buffer containing file data
   */
  async getContents (entry, offset) {
    if (!entry.isDirectory && entry !== '..') {
      return FileSystem.readFileBuffered(this.fullPath(entry), offset, 4096)
    } else 
      return { error: 'entry is a directory.' }
  }

  static async exists(path) {
    try {
      return FileSystem.stat(path)
    } catch (_) {
      return undefined
    }
  }

  async copyFile(entry, destFolder) {
    // todo - recursive copy
    const srcPath = Path.join(this.currentDirectory, entry.name)
    const destPath = Path.join(destFolder, entry.name)

    console.log(`copy ${srcPath} => ${destPath}`)

    if (await DirectoryListData.exists(destPath)) {
      return false
    }

    return new Promise(async (resolve, reject) => {
      try {
        await FileSystem.writeFile(destPath, await FileSystem.readFile(srcPath))
        resolve(true)
      } catch (e) {
        console.log(`copy failed: ${e.message}`)
        reject(e)
      }
    })
  }

  async moveFile(entry, destFolder) {
    const srcPath = Path.join(this.currentDirectory, entry.name)
    const destPath = Path.join(destFolder, entry.name)

    console.log(`rename ${srcPath} => ${destPath}`)
    console.log(`WARNING - FileSystem.rename not implemented`)

    if (await DirectoryListData.exists(destPath)) {
      return false
    }

    return new Promise(async (resolve, reject) => {
      try {
        await FileSystem.rename(srcPath, destPath)
        resolve(true)
      } catch (e) {
        console.log(`rename failed: ${e.message}`)
        reject(e)
      }
    })
  }

  async deleteFile(entry) {
    // todo - recursive delete
    const srcPath = Path.join(this.currentDirectory, entry.name)

    console.log(`rm ${srcPath}`)
    console.log(`WARNING - FileSystem.rm not implemented`)
    
    return new Promise(async (resolve, reject) => {
      try {
        await FileSystem.rm(srcPath)
        resolve(true)
      } catch (e) {
        console.log(`delete failed: ${e.message}`)
        reject(e)
      }
    })
  }

  static async mkdir(folder) {
    if (await DirectoryListData.exists(folder)) {
      return
    } else {
      await DirectoryListData.mkdir(await Path.dirname(folder))
      await FileSystem.mkdir(folder)
    }
  }

  async newFolder(name) {
    // calling FileSystem.stat on a subfolder that doesn't exist doesn't return false, check each supplied path one by one
    const parts = name.split(Path.sep)
    let newPath = Path.join(this.currentDirectory)

    return new Promise(async (resolve, reject) => {
      try {
        for (let p = 0; p < parts.length; ++p) {
          newPath = Path.join(this.currentDirectory, parts[p])
          DirectoryListData.mkdir(newPath)
        }
        resolve(true)
      } catch (e) {
        console.log(`newFolder failed: ${e.message}`)
        reject(e)
      }
    })
  }
}
