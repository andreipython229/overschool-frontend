import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { Input } from '../../../../../components/common/Input/Input/Input'
import { useDeleteCoursesMutation, useFetchCourseFoldersQuery, usePatchCoursesMutation, useCloneCourseMutation, useDeleteCourseCopyAccessMutation, useLazyFetchCourseCopyOwnersQuery, useLazyFetchCourseQuery } from '../../../../../api/coursesServices'
import { formDataConverter } from '../../../../../utils/formDataConverter'
import { CheckboxBall } from '../../../../../components/common/CheckboxBall'

import { CoursesDataT } from '../../../../../types/CoursesT'

import styles from './setting_course.module.scss'
import { useBoolean, useDebounceFunc } from '../../../../../customHooks'
import { Button } from '../../../../../components/common/Button/Button'
import { Path } from '../../../../../enum/pathE'
import { generatePath, useNavigate } from 'react-router-dom'
import { SimpleLoader } from '../../../../../components/Loaders/SimpleLoader'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Checkbox, FormControlLabel, createTheme, ThemeProvider } from '@mui/material'
import CopyToClipboard from 'react-copy-to-clipboard'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Toast } from 'primereact/toast'
import { SelectInput } from 'components/common/SelectInput/SelectInput'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { penIconPath } from 'Pages/Settings/Main/iconComponents'

type BasicSettingsT = {
  toggleCheckbox: boolean
  toggleCheckboxPublished: () => void
  isCatalog: boolean
  toggleCatalog: () => void
  isDirect: boolean
  toggleDirect: () => void
  courseFind: CoursesDataT
  refetch: () => void
}

export const BasicSettings: FC<BasicSettingsT> = ({
  toggleCheckbox,
  toggleCheckboxPublished,
  isCatalog,
  toggleCatalog,
  isDirect,
  toggleDirect,
  courseFind,
  refetch,
}) => {
  const toast = useRef<Toast>(null)
  const school = window.location.href.split('/')[4]
  const [update, { isLoading, isSuccess }] = usePatchCoursesMutation()
  const [nameCourse, setNameCourse] = useState<string>(courseFind?.name || '')
  const [shortDescription, setShortDescription] = useState<string>(courseFind?.description || '')
  const [deleteCourses, { isSuccess: isSuccessDelete }] = useDeleteCoursesMutation()
  const [fetchCourse, fetchingCourse] = useLazyFetchCourseQuery()
  const [cloneCourse, { isLoading: isCloning, isSuccess: isCloned, error: cloneError }] = useCloneCourseMutation();
  const [deleteCourseAccess] = useDeleteCourseCopyAccessMutation()
  const [fetchCourseCopyOwners, { data: owners }] = useLazyFetchCourseCopyOwnersQuery();
  const [alertOpen, setAlertOpen] = useState<boolean>(false)
  const schoolName = window.location.href.split('/')[4]
  const [copy, { onToggle: toggleCopy }] = useBoolean(false)
  const { data: foldersData, isSuccess: successFolders } = useFetchCourseFoldersQuery(school)
  const [foldersList, setFoldersList] = useState<{ label: string; value: string }[]>()
  const [selectedFolder, setSelectedFolder] = useState<number | string>()
  const [email, setEmail] = useState<string>('')
  const [revokeAccessOpen, setRevokeAccessOpen] = useState<boolean>(false);
  const [emailsWithAccess, setEmailsWithAccess] = useState<string[]>([])
  const [selectedEmails, setSelectedEmails] = useState<string[]>([])

  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: 'SFPRORegular',
      },
    },
  });
  
  const debounce = useDebounceFunc(update)
  const navigate = useNavigate()

  const handleCloseAlert = () => {
    setAlertOpen(false)
  }

  const handleOpenAlert = () => {
    setAlertOpen(true)
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleCloseRevokeAccess = () => {
    setRevokeAccessOpen(false);
  };

  const handleRestoreAccess = async () => {
    const id = courseFind?.course_id
    const updateCurse = {
      course_removed: null
    }
    const formdata = formDataConverter(updateCurse)
    const response = await update({ arg: { formdata, id }, schoolName })
    if ('data' in response && response.data.status === 200) {
      window.location.reload()
    }
    
  }

  const handleSendEmail = async () => {
    if (email) {
      try {
        await cloneCourse({ id: courseFind?.course_id, schoolName, userEmail: email }).unwrap();
        toast.current?.show({
          severity: 'success',
          summary: 'Успешно',
          detail: `Вы успешно поделились курсом с ${email}`,
          life: 5000,
        });
        const response = await fetchCourseCopyOwners({ courseName: courseFind.name, id: courseFind.course_id, schoolName: schoolName });        
        const newEmails = response.data.map((email: { email: string }) => email.email);
        setEmailsWithAccess(prevEmails => [
          ...new Set([...prevEmails, ...newEmails])
        ]);
      } catch (error) {
        const errorResponse = error as { data?: { detail?: string } }; 
        const errorMessage = errorResponse?.data?.detail || 'Произошла ошибка при выполнении запроса';
        toast.current?.show({
          severity: 'error',
          summary: 'Ошибка',
          detail: errorMessage,
          life: 5000,
        });
      }
    }
  }

  const handleRevokeAccess = async () => {
    if (selectedEmails.length > 0) {
      try {
        await deleteCourseAccess({ emails: selectedEmails, courseName: courseFind.name, id: courseFind.course_id, schoolName: schoolName })
        toast.current?.show({
          severity: 'info',
          summary: 'Доступ отозван',
          detail: `Вы успешно отозвали доступ к курсу у выбранных пользователей`,
          life: 5000,
        })
        setEmailsWithAccess(prevEmails => prevEmails.filter(email => !selectedEmails.includes(email)))
        handleCloseRevokeAccess()
      } catch (error) {
        console.error('Ошибка при отзыве доступа:', error)
        toast.current?.show({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Произошла ошибка при удалении доступа',
          life: 5000,
        })
      }
    }
  }

  useEffect(() => {
    const fetchOwnersData = async () => {
      if (courseFind?.name, courseFind.course_id, schoolName) {
        const response = await fetchCourseCopyOwners({ courseName: courseFind.name, id: courseFind.course_id, schoolName: schoolName });
        const newEmails = response.data.map((email: { email: string }) => email.email);
        setEmailsWithAccess(prevEmails => [
          ...new Set([...prevEmails, ...newEmails])
        ]);
      }
    };
  
    fetchOwnersData();
  }, [courseFind?.name]);

  useEffect(() => {
    if (!selectedFolder && courseFind && courseFind.folder && courseFind.folder.id) {
      setSelectedFolder(courseFind.folder.id)
    }
  }, [courseFind, selectedFolder]);

  useEffect(() => {
    if (successFolders && foldersData) {
      const newList = [
        { label: 'Без папки', value: '' },
        ...foldersData.map((folder: { name: string; id: number }) => {
          return { label: folder.name, value: folder.id }
        }),
      ]
      if (newList) {
        setFoldersList(newList)
      }
    }
  }, [foldersData])

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
    window.location.reload()
  }

  const handleSaveChanges = async () => {
    const updateCurse = {
      name: nameCourse,
      description: shortDescription,
      public: toggleCheckbox ? 'О' : 'Н',
      is_catalog: isCatalog,
      is_direct: isDirect,
      folder: selectedFolder ? selectedFolder : -1,
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

  const handleEmailSelectionChange = (email: string) => {
    setSelectedEmails(prevSelected =>
      prevSelected.includes(email)
        ? prevSelected.filter(e => e !== email)
        : [...prevSelected, email]
    )
  }

  return (
    <div className={`${styles.basic_settings}`}>
        {/* {!toggleCheckbox && (
                    <p className={styles.right_content_header}>
                        <IconSvg width={20} height={15} viewBoxSize=" 0 0 21 16" path={noPublishedGreyIconPath}/>
                        Не опубликован
                    </p>
                )} */}
      <div className={styles.publish_switch}>
        <p className={styles.publish_switch_title}>Опубликовать курс в школе</p>
        <span className={styles.publish_switch_desc}>весь функционал, связанный с процессом обучения на курсе, становится доступным</span>
        <div className={styles.publish_switch_wrapper_switch}>
          <CheckboxBall isChecked={toggleCheckbox} toggleChecked={toggleCheckboxPublished} />
        </div>
      </div>
      <div className={styles.course_name_wrapper}>
        <p className={styles.course_name_title}>Название курса:</p>
        <div className={styles.settings_input}>
          <Input type={'text'} placeholder={'Введите название курса'} name="nameCourse" value={nameCourse} onChange={handleNameCourse}>
            <IconSvg width={24} height={24} viewBoxSize='0 0 24 24' path={penIconPath}/>
          </Input>
        </div>
      </div>
      <div className={styles.short_discription_wrapper}>
        <p className={styles.short_discription_title}>Кратное описание:</p>
        <div className={styles.settings_input}>
          <Input type={'text'} placeholder={'Введите краткое описание курса'} name="shortDescription" value={shortDescription} onChange={handleNameCourse}>
            <IconSvg width={24} height={24} viewBoxSize='0 0 24 24' path={penIconPath}/>
          </Input>
        </div>
      </div>
      <div className={styles.short_discription_wrapper}>
        <p className={styles.short_discription_title}>Поделиться курсом по email:</p>
        <div className={styles.settings_input}>
          <Input type={'email'} placeholder={'Введите email'} name="email" value={email} onChange={handleEmailChange}>
            <IconSvg width={24} height={24} viewBoxSize='0 0 24 24' path={penIconPath}/>
          </Input>
        </div>
      </div>
      <div className={styles.btn}>
        <Button
          style={{padding: '15px 89px'}}
          onClick={handleSendEmail}
          text={'Поделиться'}
          variant={'newPrimary'}
        />
        <Button
          style={{padding: '15px 40px'}}
          variant={'cancel'}
          onClick={() => setRevokeAccessOpen(true)}
          text={'Отозвать доступ'}
        />
      </div>
      <ThemeProvider theme={theme}>
        <Dialog open={revokeAccessOpen} onClose={handleCloseRevokeAccess} aria-labelledby="revoke-access-dialog-title" aria-describedby="revoke-access-dialog-description" sx={{
          '.css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
            borderRadius: '10px',
            margin: 0,
            padding: '16px'
          }
        }}>
          <DialogTitle id="revoke-access-dialog-title">Отозвать доступ к курсу</DialogTitle>
          <DialogContent>
            <DialogContentText id="revoke-access-dialog-description">
              Выберите пользователей, у которых хотите отозвать доступ к курсу:
            </DialogContentText>
            <div>
              {emailsWithAccess.map(email => (
                <div key={email} style={{ marginBlockStart: '2px' }}>
                  <FormControlLabel
                    key={email}
                    control={
                      <Checkbox
                        style={{
                          color: '#ba75ff',
                        }}
                        checked={selectedEmails.includes(email)}
                        onChange={() => handleEmailSelectionChange(email)}
                      />
                    }
                    label={email}
                  />
                </div>
              ))}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseRevokeAccess} text="Отмена" variant={'cancel'}/>
            <Button onClick={handleRevokeAccess} text="Отозвать" variant={'newPrimary'} />
          </DialogActions>
        </Dialog>
      </ThemeProvider>
      <div className={styles.publish_switch}>
        {courseFind.baselessons_count && courseFind.baselessons_count >= 5 && toggleCheckbox ? (
          <p className={styles.publish_switch_title}>Опубликовать курс в каталоге</p>
        ) : (
          <p className={styles.publish_switch_title}>
            Опубликовать курс в каталоге можно при условии его публикации в школе и при наличии в нем не менее 5 занятий
          </p>
        )}
        <span className={styles.publish_switch_desc} style={{margin: '20px 0'}}>курс попадает в каталог и становится доступным для общего поиска в интернете</span>
        <div className={styles.publish_switch_wrapper_switch}>
          {courseFind.baselessons_count && courseFind.baselessons_count >= 5 && toggleCheckbox ? (
            <CheckboxBall isChecked={isCatalog} toggleChecked={toggleCatalog} />
          ) : (
            <CheckboxBall isChecked={isCatalog} />
          )}
        </div>
      </div>
      <div className={styles.publish_switch} style={{marginTop: '20px'}}>
        {toggleCheckbox ? (
          <p className={styles.publish_switch_title}>Доступ к курсу по прямой ссылке</p>
        ) : (
          <p className={styles.publish_switch_title}>Доступ к курсу по прямой ссылке (возможен при условии публикации курса в школе)</p>
        )}
        <span className={styles.publish_switch_desc} style={{margin: '20px 0'}}>курс можно найти по прямой ссылке даже при его отсутствии в каталоге</span>
        <div className={styles.publish_switch_wrapper_switch}>
          {toggleCheckbox ? <CheckboxBall isChecked={isDirect} toggleChecked={toggleDirect} /> : <CheckboxBall isChecked={isDirect} />}
        </div>
      </div>
      {courseFind.is_direct && (
        <div className={styles.short_discription_wrapper}>
          <p className={styles.short_discription_title}>Прямая ссылка на курс:</p>
          <div className={styles.short_discription_input}>
            <Input
              id="catalog-link"
              type={'text'}
              placeholder={'Введите'}
              name="catalog-link"
              value={`https://overschool.by/course-catalog/${courseFind.course_id}/`}
            >
            <IconSvg className={styles.penIcon} width={24} height={24} viewBoxSize='0 0 24 24' path={penIconPath} />
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
        </div>
      )}
      {foldersList && (
        <div className={styles.folderslist}>
          <p className={styles.publish_switch_title}>Выберите папку для курса:</p>
            <SelectInput
              optionsList={foldersList}
              setSelectedValue={setSelectedFolder}
              defaultOption={courseFind.folder ? courseFind.folder.name : 'Без папки'}
            />
        </div>
      )}
      <div className={styles.btn} style={{margin: 0}}>
        <Button
          style={{padding: '15px 40px'}}
          onClick={handleSaveChanges}
          text={isLoading ? <SimpleLoader style={{ height: '1em', width: '11em', color: 'white', zIndex: '100' }} /> : 'Применить изменения'}
          variant={'newPrimary'}
        />
      {courseFind.course_removed ? (
          <Button onClick={handleRestoreAccess} text={'Восстановить курс'} variant={'newPrimary'} style={{padding: '15px 40px'}}/>
        ) : (
          <Button onClick={handleOpenAlert} text={'Удалить курс'} variant={'cancel'} style={{padding: '15px 40px'}}/>
        )}
      </div>
      <ThemeProvider theme={theme}>
        <Dialog open={alertOpen} onClose={handleCloseAlert} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" sx={{
          '.css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
            borderRadius: '10px',
          }
        }}>
          <DialogTitle id="alert-dialog-title">{`Вы действительно хотите удалить курс "${courseFind.name}"?`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" sx={{
                textAlign: 'justify'
            }}>
              Этот курс будет перемещен в корзину и останется там на протяжении недели. Вы сможете его восстановить в течение этого времени.
              Если вы не восстановите курс, он будет удален навсегда.
              Если вы уверены, что хотите удалить курс {`"${courseFind.name}"`}, нажмите {'удалить'}. В противном случае нажмите {'отмена'}.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAlert} text={'Отмена'} variant={'cancel'}/>
            <Button onClick={handleDeleteCourse} autoFocus text={'Удалить'} variant={'newPrimary'} />
          </DialogActions>
        </Dialog>
      </ThemeProvider>
      <Toast position="bottom-left" ref={toast} style={{ marginLeft: '100px' }} />
    </div>
  )
}
