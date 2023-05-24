import { rand64 } from 'socket:crypto'
import fs from 'socket:fs/promises'
import path from 'socket:path'
import process from 'socket:process'

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
  if (a.isDirectory() && b.isDirectory()) return a.name.localeCompare(b.name)
  // always sort directories to top
  if (a.isDirectory() || b.isDirectory()) return 1

  return undefined;
}

function sortName (a, b) {
  let r = sortDirectories(a, b)
  if (r !== undefined) return r

  return a.name.localeCompare(b.name)
}

function sortExtension (a, b) {
  let r = sortDirectories(a, b)
  if (r !== undefined) return r

  return path.extname(a.name).localeCompare(path.extname(b.name))
}

function sortSize (a, b) {    
  let r = sortDirectories(a, b)
  if (r !== undefined) return r
  if (a.size > b.size) return 1;
  if (b.size > a.size) return -1;
  return 0
}

function sortDate (a, b) {    
  let r = sortDirectories(a, b)
  if (r !== undefined) return r
  if (a.mtimeMs > b.mtimeMs) return 1;
  if (b.mtimeMs > a.mtimeMs) return -1;
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
  constructor(initialDirectory = process.cwd()) {
    this._currentDirectory = initialDirectory
    this._entries = []
    this._selectedEntries = []
    this.sortDirection = SORT_ASCENDING
    this.sortMode = FILE_SORT_MODE_NAME
  }

  get currentDirectory() { return this._currentDirectory }
  set currentDirectory(value) { this._currentDirectory = value }

  traverse(entry) {
    // todo (@mribbons): support relative path, full path, split by dir sep
    // todo (@mribbons): navigate as far as possible even if final path doesn't exist
    // dirname returns input if input ends with \
    // prevent \\ in path
    const cd = this.currentDirectory.endsWith('\\') ? this.currentDirectory.substring(0, this.currentDirectory.length-1) : this.currentDirectory
    if (entry === '..') {
      return new DirectoryListData(path.dirname(cd))
    } else if (entry.isDirectory()) {
      return new DirectoryListData(path.join(cd, entry.name))
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
    
    for (const entry of (await fs.readdir(this._currentDirectory, { withFileTypes: true }))) {
      entries.push(entry)

      try {
        // todo(@mribbons): populate async
        let stat = await fs.stat(path.join(this._currentDirectory, entry.name));
        entry.size = stat.size
        entry.mtimeMs = stat.mtimeMs
        entry.birthtimeMs = stat.birthtimeMs
      } catch (_) {
        entry.birthtimeMs = entry.mtimeMs = entry.size = 0
      }
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

    return entries
  }

  get selectedEntries() { return this._selectedEntries }
  set selectedEntries(value) { this._selectedEntries = value }
}
