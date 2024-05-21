import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { Input } from '../../../../../components/common/Input/Input/Input'
import { useDeleteCoursesMutation, usePatchCoursesMutation } from '../../../../../api/coursesServices'
import { formDataConverter } from '../../../../../utils/formDataConverter'
import { CheckboxBall } from '../../../../../components/common/CheckboxBall'

import { CoursesDataT } from '../../../../../types/CoursesT'

import styles from './setting_course.module.scss'
import { useBoolean, useDebounceFunc } from '../../../../../customHooks'
import { Button } from '../../../../../components/common/Button/Button'
import { Path } from '../../../../../enum/pathE'
import { generatePath, useNavigate } from 'react-router-dom'
import { SimpleLoader } from '../../../../../components/Loaders/SimpleLoader'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import CopyToClipboard from 'react-copy-to-clipboard'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Toast } from 'primereact/toast'

type BasicSettingsT = {
  toggleCheckbox: boolean
  toggleCheckboxPublished: () => void
  courseFind: CoursesDataT
  refetch: () => void
}

export const BasicSettings: FC<BasicSettingsT> = ({ toggleCheckbox, toggleCheckboxPublished, courseFind, refetch }) => {
  const toast = useRef<Toast>(null)
  const [update, { isLoading, isSuccess }] = usePatchCoursesMutation()
  const [nameCourse, setNameCourse] = useState<string>(courseFind?.name || '')
  const [shortDescription, setShortDescription] = useState<string>(courseFind?.description || '')
  const [deleteCourses, { isSuccess: isSuccessDelete }] = useDeleteCoursesMutation()
  const [alertOpen, setAlertOpen] = useState<boolean>(false)
  const schoolName = window.location.href.split('/')[4]
  const [copy, { onToggle: toggleCopy }] = useBoolean(false)
  const [isDirect, { onToggle: toggleDirect }] = useBoolean(courseFind.is_direct)

  const debounce = useDebounceFunc(update)
  const navigate = useNavigate()

  const handleCloseAlert = () => {
    setAlertOpen(false)
  }

  const handleOpenAlert = () => {
    setAlertOpen(true)
  }

  const handleNameCourse = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'nameCourse') {
      setNameCourse(e.target.value)
    } else {
      setShortDescription(e.target.value)
    }
  }

  const handleDeleteCourse = async () => {
    courseFind && (await deleteCourses({ id: +courseFind?.course_id, schoolName }))
    setAlertOpen(false)
  }

  const handleSaveChanges = async () => {
    const updateCurse = {
      name: nameCourse,
      description: shortDescription,
      public: 'О',
      is_catalog: toggleCheckbox,
      is_direct: isDirect,
    }

    const formdata = formDataConverter(updateCurse)
    if (formdata && courseFind) {
      const id = courseFind?.course_id
      await update({ arg: { formdata, id }, schoolName })
        .unwrap()
        .then(data => {
          refetch()
        })
    }
  }

  useEffect(() => {
    if (isSuccessDelete) {
      navigate(
        generatePath(Path.School + Path.Courses, {
          school_name: schoolName,
        }),
      )
    }
  }, [isSuccessDelete])

  return (
    <div className={`${styles.basic_settings}`}>
      <div className={`${styles.header_basic_settings}`}>
        <p>Основные настройки</p>
        {/* {!toggleCheckbox && (
                    <p className={styles.right_content_header}>
                        <IconSvg width={20} height={15} viewBoxSize=" 0 0 21 16" path={noPublishedGreyIconPath}/>
                        Не опубликован
                    </p>
                )} */}
      </div>
      <div className={styles.publish_switch}>
        {courseFind.baselessons_count && courseFind.baselessons_count>=5
        ? <p className={styles.publish_switch_title}>Опубликовать курс в каталоге:</p>
        : <p className={styles.publish_switch_title}>Опубликовать курс в каталоге можно при наличии в нем не менее 5 занятий</p>}
        <div className={styles.publish_switch_wrapper_switch}>
           {courseFind.baselessons_count && courseFind.baselessons_count>=5
          ? <CheckboxBall isChecked={toggleCheckbox} toggleChecked={toggleCheckboxPublished}/>
          : <CheckboxBall isChecked={toggleCheckbox}/>}
        </div>
      </div>
      <div className={styles.course_name_wrapper}>
        <p className={styles.course_name_title}>Название курса:</p>
        <Input type={'text'} name="nameCourse" value={nameCourse} onChange={handleNameCourse} />
      </div>
      <div className={styles.short_discription_wrapper}>
        <p className={styles.short_discription_title}>Кратное описание:</p>
        <Input type={'text'} name="shortDescription" value={shortDescription} onChange={handleNameCourse} />
      </div>
      <div className={styles.publish_switch}>
        <p className={styles.publish_switch_title}>Отображать курс в каталоге по прямой ссылке:</p>
        <div className={styles.publish_switch_wrapper_switch}>
          <CheckboxBall isChecked={isDirect}  toggleChecked={toggleDirect} />
        </div>
      </div>
      {courseFind.is_direct && (
        <div className={styles.short_discription_wrapper}>
          <p className={styles.short_discription_title}>Прямая ссылка на курс в каталоге:</p>
          <Input id="catalog-link" value={`https://overschool.by/course-catalog/${courseFind.course_id}/`} type="text" name="catalog-link">
            <CopyToClipboard
              text={`https://overschool.by/course-catalog/${courseFind.course_id}/`}
              onCopy={() => {
                toast.current?.show({
                  severity: 'success',
                  summary: 'Успешно',
                  detail: `Ссылка успешно скопирована`,
                  life: 2000,
                })
                toggleCopy()
              }}
            >
              <ContentCopyIcon sx={{ padding: '3px', cursor: 'pointer', color: '#6c7889' }} />
            </CopyToClipboard>
          </Input>
        </div>
      )}
      <div className={styles.btn}>
        <Button
          onClick={handleSaveChanges}
          text={isLoading ? <SimpleLoader style={{ height: '1em', width: '11em', color: 'white', zIndex: '100' }} /> : 'Применить изменения'}
          variant={'primary'}
        />
        <Button onClick={handleOpenAlert} text={'Удалить курс'} variant={'delete'} />
      </div>
      <Dialog open={alertOpen} onClose={handleCloseAlert} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{`Вы действительно хотите удалить курс "${courseFind.name}"?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Это действие безвозвратно удалит курс, если вы не уверены, что хотите удалять курс {`"${courseFind.name}"`}, то нажмите {'отмена'}. Если
            вы уверены, что хотите продолжить, нажмите {'удалить'}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert} text={'Отмена'} />
          <Button onClick={handleDeleteCourse} autoFocus text={'Удалить'} variant={'delete'} />
        </DialogActions>
      </Dialog>
      <Toast position="bottom-left" ref={toast} style={{ marginLeft: '100px' }} />
    </div>
  )
}
