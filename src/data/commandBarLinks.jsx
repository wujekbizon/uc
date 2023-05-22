import React from 'react'
import { FcRefresh } from 'react-icons/fc'
import { MdOutlineGridView, MdViewQuilt, MdOutlineDriveFileRenameOutline, MdSyncAlt } from 'react-icons/md'
import { FcViewDetails, FcSearch } from 'react-icons/fc'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa'
import { BiNotepad } from 'react-icons/bi'
import { IoInvertMode } from 'react-icons/io5'
import { RiFileTextFill } from 'react-icons/ri'

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
    icon: <FcRefresh />,
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
    icon: <FcViewDetails />,
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
    icon: <FcSearch />,
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
