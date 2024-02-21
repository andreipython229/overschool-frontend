import React, { FC, useEffect, useState } from 'react'
import { AudioPlayerT } from '../../../types/commonComponentsTypes'
import style from '../../AddAudio/addaudio.module.scss'
import { deletePath } from 'config/commonSvgIconsPath'
import { IconSvg } from '../IconSvg/IconSvg'

export const AudioPlayer: FC<AudioPlayerT> = ({ styles, audioUrls, files, title = 'Listen to the T-Rex:', delete: deleteFile }) => {
  const [urls, setUrls] = useState<string[]>([])
  const schoolName = window.location.href.split('/')[4]
  useEffect(() => {
    if (files) {
      files.forEach(file => setUrls(prevUrls => [...prevUrls, URL.createObjectURL(file)]))
    }
  }, [files])

  const handleDelete = async (index: number) => {
    deleteFile && (await deleteFile({id: index, schoolName}))
  }

  return (
    <>
      {audioUrls &&
        audioUrls.map(({ file }, index) => (
          <figure key={index} style={{ ...styles, width: '95%', display: 'flex', marginLeft: '41px', justifyContent: 'center', alignItems: 'center' }}>
            {/* <figcaption style={{ textAlign: 'center' }}>{title}</figcaption> */}
            <audio style={{ width: '100%', margin: '0.3em' }} controls src={file}>
              <a href={file}>Download audio</a>
            </audio>
            {deleteFile && (
              <div className={style.redactorCourse_rightSide_functional_addContent_navBlock_delete} onClick={() => handleDelete(index)}>
                <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deletePath} />
              </div>
            )}
          </figure>
        ))}
      {urls &&
        urls.map((url, index) => (
          <figure key={index} style={{ ...styles, width: '95%', display: 'flex', marginLeft: '41px', justifyContent: 'center', alignItems: 'center' }}>
            {/* <figcaption style={{ textAlign: 'center' }}>{title}</figcaption> */}
            <audio style={{ width: '100%' }} controls src={url}>
              <a href={url}>Download audio</a>
            </audio>
            {deleteFile && (
              <div className={style.redactorCourse_rightSide_functional_addContent_navBlock_delete} onClick={() => handleDelete(index)}>
                <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deletePath} />
              </div>
            )}
          </figure>
        ))}
    </>
  )
}
