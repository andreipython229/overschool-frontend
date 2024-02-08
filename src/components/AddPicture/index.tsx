import { FC, useState } from 'react'
import styles from './addPicture.module.scss'
import { AddPostT } from 'types/componentsTypes'
import { useDeleteBlockMutation, useUpdateBlockDataMutation } from 'api/blocksService'
import { Reorder, useDragControls } from 'framer-motion'
import { IBlockPic } from 'types/sectionT'

export const AddPicture: FC<AddPostT> = ({ lessonIdAndType, isPreview, block, lesson, setLessonBlocks, lessonBlocks }) => {
  const [dragVideo, setDragVideo] = useState<boolean>(false)
  const [file, setFile] = useState<File | Blob>()
  const schoolName = window.location.href.split('/')[4]
  const [deleteBlock, { isLoading }] = useDeleteBlockMutation()
  const [saveChanges, { isLoading: isSaving }] = useUpdateBlockDataMutation()
  const controls = useDragControls()

  const handleDeleteCode = () => {
    if (lessonBlocks && setLessonBlocks && block) {
      deleteBlock({ id: block.id, schoolName })
        .unwrap()
        .then(data => {
          const updatedArray = lessonBlocks.filter(item => item.id !== block.id)
          setLessonBlocks(updatedArray)
        })
    }
  }

//   const handleSaveChanges = () => {
//     if (file && lessonBlocks && setLessonBlocks && block) {
//       const picBlockData: IBlockPic = {
//         id: block.id,
//         type: block.type,
//         order: block.order,
//         picture: file,
//       }

//       saveChanges({ data: picBlockData, schoolName })
//         .unwrap()
//         .then(data => {
//           const updatedArray = lessonBlocks.map(item => {
//             if (item.id === block.id) {
//               return picBlockData
//             }
//             return item
//           })
//           setLessonBlocks(updatedArray)
//         })
//     }
//   }

//   const onPointerDown = (event: PointerEvent<HTMLSpanElement>) => {
//     controls.start(event)
//   }

  return (
    <Reorder.Item
      value={block}
      dragListener={false}
      dragControls={controls}
      whileDrag={{
        scale: 1.1,
        borderRadius: '7px',
      }}
      key={block && block.id}
    >
      
    </Reorder.Item>
  )
}
