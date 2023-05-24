import React from 'react'
import { MdOutlineGridView, MdViewQuilt, MdOutlineDriveFileRenameOutline, MdSyncAlt } from 'react-icons/md'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa'
import { BiNotepad } from 'react-icons/bi'
import { IoInvertMode, IoSearch } from 'react-icons/io5'
import { RiFileTextFill } from 'react-icons/ri'
import { SlRefresh } from 'react-icons/sl'
import { AiOutlineFolderView } from 'react-icons/ai'

export const menuOptions = [
  { key: 'f', menu: 'Files' },
  { key: 'm', menu: 'Mark' },
  { key: 'c', menu: 'Commands' },
  { key: 'n', menu: 'Net' },
  { key: 'w', menu: 'Show' },
  { key: 'o', menu: 'Configuration' },
  { key: 's', menu: 'Start' },
]

export const links = [
  {
    link: (
      <>
        <span>F</span>iles{' '}
      </>
    ),
  },
  {
    link: (
      <>
        <span>M</span>ark{' '}
      </>
    ),
  },
  {
    link: (
      <>
        <span>C</span>ommands{' '}
      </>
    ),
  },
  {
    link: (
      <>
        <span>N</span>et{' '}
      </>
    ),
  },
  {
    link: (
      <>
        Sho<span>w</span>{' '}
      </>
    ),
  },
  {
    link: (
      <>
        C<span>o</span>nfiguration{' '}
      </>
    ),
  },
  {
    link: (
      <>
        <span>S</span>tart{' '}
      </>
    ),
  },
]

export const subLinksIcons = [
  {
    id: 1,
    icon: <SlRefresh />,
    title: 'Reread Source',
  },
  {
    id: 2,
    icon: <MdOutlineGridView />,
    title: 'File Names',
  },
  {
    id: 3,
    icon: <MdViewQuilt />,
    title: 'All Files',
  },
  {
    id: 4,
    icon: <AiOutlineFolderView />,
    title: 'Thumbnail',
  },
  {
    id: 5,
    icon: <FaArrowAltCircleLeft />,
    title: 'Go Back',
  },
  {
    id: 6,
    icon: <FaArrowAltCircleRight />,
    title: 'Go Forward',
  },
  {
    id: 7,
    icon: <IoInvertMode />,
    title: 'Invert',
  },
  {
    id: 8,
    icon: <IoSearch />,
    title: 'Search',
  },
  {
    id: 9,
    icon: <MdOutlineDriveFileRenameOutline />,
    title: 'Rename Files',
  },
  {
    id: 10,
    icon: <BiNotepad />,
    title: 'Notepad',
  },
  {
    id: 11,
    icon: <MdSyncAlt />,
    title: 'Sync Dir',
  },
  {
    id: 12,
    icon: <RiFileTextFill />,
    title: 'Copy Names',
  },
]
