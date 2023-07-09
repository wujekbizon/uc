// Function to traverse a single directory
export const traverseDirectory = (viewerIndex, entry, directoryListData) => {
  const newDirectory = directoryListData.map((item, index) => {
    if (index === viewerIndex) {
      return item.traverse(entry)
    } else {
      return item
    }
  })
  return newDirectory
}
