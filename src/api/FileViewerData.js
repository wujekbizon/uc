import fs from 'socket:fs/promises'
import path from 'socket:path'
import process from 'socket:process'

/**
 * Information for interacting with directory listings
 */
export default class FileViewerData {

  /**
   * Create a FileViewerData
   * @param {string} initialDirectory - The initial directory the FileViewer should list
   */
  constructor(initialDirectory = process.cwd()) {
    this._currentDirectory = initialDirectory
    this._entries = []
    this._selectedEntries = []
    this.refresh()
  }

  get currentDirectory() { return this._currentDirectory }
  set currentDirectory(value) { this._currentDirectory = value }

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
  async refresh() {
    this._selectedEntries = []
    for (const entry of (await fs.readdir(this._currentDirectory, { withFileTypes: true }))) {
      this._entries.push(entry)
    }
  }

  get selectedEntries() { return this._selectedEntries }
  set selectedEntries(value) { this._selectedEntries = value }
}
