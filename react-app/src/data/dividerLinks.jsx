import React from 'react'
import {
  MdFileCopy,
  MdFolderCopy,
  MdEditSquare,
  MdDriveFileMove,
  MdFolderDelete,
  MdFileOpen,
  MdDeleteForever,
} from 'react-icons/md'
import { FcPackage, FcSettings } from 'react-icons/fc'

export const dividerItems = [
  {
    id: 1,
    icon: <MdFileCopy />,
    text: 'Copy',
  },
  {
    id: 2,
    icon: <MdFileOpen />,
    text: 'Edit',
  },
  {
    id: 3,
    icon: <MdEditSquare />,
    text: 'New',
  },
  {
    id: 4,
    icon: <MdDriveFileMove />,
    text: 'Move',
  },
  {
    id: 5,
    icon: <MdDeleteForever />,
    text: 'Delete',
  },
  {
    id: 6,
    icon: <MdFolderDelete />,
    text: 'Empty',
  },
  {
    id: 7,
    icon: <FcPackage />,
    text: 'Pack Files',
  },
  {
    id: 8,
    icon: <FcSettings />,
    text: 'Settings',
  },
]
