import {ChangeEvent, FC, memo, MouseEventHandler, useState} from 'react'
import { IconSvg } from '../../../../components/common/IconSvg/IconSvg'
import { addFileSvg } from './config/svgIconPath'
import { LogoAddBlockPropsT } from '../../../../types/pageTypes'

import styles from './logoAddBlock.module.scss'
import formStyles from "../../../Profile/formStyles.module.scss";
import {DownloadIconPath} from "../../../../assets/Icons/svgIconPath";
import {Button} from "../../../../components/common/Button/Button";




export const LogoAddBlock: FC<LogoAddBlockPropsT> = memo(({ logoDesc, aboutRequirements, requirementsArr, title, url, onChange, height }) => {

  const [selectedFile, setSelectedFile] = useState<ChangeEvent<HTMLInputElement>>()
  const [uploadFile, setUploadFile] = useState<string>('')
    const [isFetching, setIsFetching] = useState(true)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
          const url = URL.createObjectURL(event.target.files[0])
          setUploadFile(url)
      }
        setSelectedFile(event)
  }

  const handleUpload = () => {
      if (selectedFile) {
          onChange(selectedFile)
      }
  }

  return (
    <section className={styles.logoBlock}>
      <span className={styles.logoBlock_desc}>{logoDesc}</span>
        <div className={styles.logoBlock_information_requirements}>
          <div className={styles.logoBlock_information_requirements_title}>{aboutRequirements}</div>
          {requirementsArr.map((el, id) => {
            return (
              <p  key={id}>
                {id + 1}. {el}
              </p>
            )
          })}
        </div>
      <div className={styles.logoBlock_information}>
          {isFetching && (
        <label className={styles.logoBlock_information_label} style={{height: height}}>
            {url ? (
                    <div>
                        <input onChange={handleChange} className={styles.logoBlock_information_label_fileInput} type="file"
                               title="adasafafasf"/>
                        {uploadFile ? (
                        <img className={styles.logoBlock_information_label_img} src={uploadFile} alt=""/>)
                            :
                            (<img className={styles.logoBlock_information_label_img} src={url} alt=""/>)}
                    </div>
                )
                : (
                    <div>
                        {uploadFile ? (<img className={styles.logoBlock_information_label_img} src={uploadFile} alt=""/>)
                            :
                            (<><input onChange={handleChange} className={styles.logoBlock_information_label_fileInput}
                                      type="file"
                                      title="adasafafasf"/>
                                <div className={styles.logoBlock_iconInfo}>
                                    <IconSvg styles={{cursor: "pointer"}} width={50} height={50} viewBoxSize="0 0 23 23"
                                             path={DownloadIconPath}/>
                                    <p style={{color: "black", marginTop: "10%"}}>Выберите файл</p>
                                </div>
                            </>)
                        }
                        {/*<input onChange={handleChange} className={styles.logoBlock_information_label_fileInput} type="file"*/}
                        {/*       title="adasafafasf"/>*/}
                        {/*<div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>*/}
                        {/*    <IconSvg styles={{cursor: "pointer"}} width={50} height={50} viewBoxSize="0 0 23 23"*/}
                        {/*             path={DownloadIconPath}/>*/}
                        {/*    <p style={{color: "black", marginTop: "10%"}}>Выберите файл</p>*/}
                        {/*</div>*/}
                    </div>
                )}
          {/*{url && (<img className={styles.logoBlock_information_label_img}  src={url} alt="" />)}*/}
          {/* <input onChange={onChange} className={styles.logoBlock_information_label_fileInput} type="file" title="adasafafasf" />*/}
          {/*  <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>*/}
          {/*<IconSvg styles={{cursor: "pointer"}} width={50} height={50} viewBoxSize="0 0 23 23" path={DownloadIconPath} />*/}
          {/*      <p style={{color: "black", marginTop: "10%"}}>Выберите файл</p>*/}
          {/*  </div>*/}
        </label>
              )}
      </div>
        <Button onClick={handleUpload} style={{margin: "auto"}} variant={"newPrimary"} text={"Сохранить"}/>
    </section>
  )
})
