import { FC, Key, useEffect, useState } from 'react'
import { useAppSelector } from 'store/hooks'
import { CoursesCard } from './CoursesCard'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { Input } from 'components/common/Input/Input/Input'
import { RoleE } from 'enum/roleE'
import { searchIconPath } from 'config/commonSvgIconsPath'
import { schoolIdSelector, schoolNameSelector, selectUser } from 'selectors'
import { AddCourseModal } from 'components/Modal'
import { useDeleteFolderMutation, useFetchCourseFoldersQuery, useLazyFetchCoursesPageQuery } from 'api/coursesServices'
import { useSetSchoolMutation } from 'api/schoolService'
import { useBoolean } from 'customHooks/useBoolean'
import { Portal } from 'components/Modal/Portal'
import { useDebouncedFilter } from '../../../../customHooks'
import styles from 'Pages/School/Navigations/CoursesCreating/coursePage.module.scss'
import ContentLoader from 'react-content-loader'
import { motion, AnimatePresence } from 'framer-motion'
import { CoursesT } from 'types/CoursesT'
import { Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { Delete, FolderCopyOutlined, Visibility, VisibilityOff } from '@mui/icons-material'
import { AddNewFolderModal } from 'components/Modal/AddFolderModal'
import { Button } from 'components/common/Button/Button'
import { useLazyFetchBonusesQuery } from '../../../../api/schoolBonusService'
import { setStudentBonus } from 'store/redux/bonuses/bonusSlice'
import { useDispatch } from 'react-redux'

export const CoursePage: FC = () => {
  const { role } = useAppSelector(selectUser)
  const schoolName = useAppSelector(schoolNameSelector)
  const schoolId = useAppSelector(schoolIdSelector)
  const school_id = localStorage.getItem('school_id')
  const test_course = localStorage.getItem('test_course')
  const [fetchData, { data: coursesData, isSuccess }] = useLazyFetchCoursesPageQuery()
  const { data: folders, isError, refetch } = useFetchCourseFoldersQuery(schoolName)
  const [isOpenAddCourse, { onToggle }] = useBoolean()
  const [courses, setCourses] = useState<CoursesT>()
  const [nameCourses, foundCourses, filterData] = useDebouncedFilter(courses?.results as any, 'name' as keyof object)
  const [search, setSearch] = useState('')
  const [foldersVisible, { on: hideFolders, off: showFolders, onToggle: toggleFolders }] = useBoolean(false)
  const [activeFolder, setActiveFolder] = useState<string>('')
  const [showModal, { onToggle: toggleModal }] = useBoolean(false)
  const [deleting, { onToggle: toggleDeleting }] = useBoolean(false)
  const [alertOpen, { on: closeAlert, off: openAlert }] = useBoolean(false)
  const [deletingFolder, setDeletingFolder] = useState<{
    id: number
    name: string
  }>()
  const [showTestCourse, setShowTestCourse] = useState(true)
  const [deleteFolder, { isSuccess: deletedSuccessfuly }] = useDeleteFolderMutation()
  const [getBonuses, { data: bonuses, isSuccess: bonusSuccess }] = useLazyFetchBonusesQuery()
  const [updateSchoolTestCourse, { data: isLoading }] = useSetSchoolMutation()
  const dispatch = useDispatch()

  const dispatchHandlerModal = () => {
    onToggle()
    fetchData(schoolName)
  }

  useEffect(() => {
    if (isSuccess) {
      setCourses(coursesData)
    }
  }, [coursesData, setCourses])

  useEffect(() => {
    if (deletedSuccessfuly) {
      refetch()
    }
  }, [deletedSuccessfuly])

  useEffect(() => {
    if (schoolName === window.location.href.split('/')[4]) {
      fetchData(schoolName)
    } else {
      fetchData(schoolName)
    }
    if (role === RoleE.Student) {
      getBonuses(schoolName)
    }
  }, [schoolId])

  useEffect(() => {
    if (bonusSuccess && bonuses?.length) {
      dispatch(setStudentBonus(bonuses[0]))
    }
  }, [bonusSuccess, bonuses])

  const filterCoursesByFolders = (folderId: number) => {
    if (coursesData) {
      const filteredArray = coursesData.results.filter(course => {
        return course.folder && course.folder.id === folderId
      })

      if (filteredArray) {
        setCourses({ ...courses, results: filteredArray })
      }
    }
  }

  useEffect(() => {
    if (test_course) {
      const isTestCourse = test_course.toLowerCase()
      if (isTestCourse === 'true') {
        setShowTestCourse(true)
      } else {
        setShowTestCourse(false)
      }
    }
  }, [test_course])

  const toggleTestCourseVisibility = async (newState: boolean) => {
    setShowTestCourse(newState)
    const formdata = new FormData()
    formdata.append('test_course', JSON.stringify(newState))
    try {
      await updateSchoolTestCourse({ formdata, id: Number(school_id) })
      await fetchData(schoolName)
      setCourses(coursesData)
    } catch (error) {
      console.error('Error updating test course:', error)
    }
  }

  const startDeleteModal = (folder: { id: number; name: string }) => {
    openAlert()
    setDeletingFolder(folder)
  }

  const filteredCourses = courses?.results.filter((course: any) => {
    return course.name.toLowerCase().includes(search.toLowerCase())
  })
  if (!isSuccess)
    return (
      <div >
        <div>
          <ContentLoader speed={2} width={270} height={550} viewBox="0 0 150 160" backgroundColor="#fff" foregroundColor="#f2f2f2">
            <rect x="0" y="0" rx="3" ry="3" width="130" height="130" />
          </ContentLoader>
        </div>
        <div className={styles.skeleton}>
          <ContentLoader speed={2} width={270} height={550} viewBox="0 0 150 160" backgroundColor="#e0dced" foregroundColor="#ecebeb">
            <rect x="0" y="10" rx="3" ry="3" width="130" height="65" />
          </ContentLoader>
        </div>
        <div className={styles.skeleton}>
          <ContentLoader speed={2} width={270} height={550} viewBox="0 0 150 160" backgroundColor="#cccccc" foregroundColor="#ecebeb">
            <rect x="7" y="95" rx="3" ry="3" width="115" height="8" />
            <rect x="15" y="115" rx="3" ry="3" width="100" height="8" />
            <rect x="15" y="135" rx="3" ry="3" width="100" height="8" />
          </ContentLoader>
        </div>
        <div style={{ position: 'absolute', zIndex: 20, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          {/* <SimpleLoader style={{ width: '100px', height: '100px' }} /> */}
        </div>
      </div>
    )
  return (
    <div  style={{maxWidth:'1360px', margin: 'auto'}}>
      <div className={styles.container}>
        {role === RoleE.Admin && (
          <AnimatePresence>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                paddingBottom: '1rem',
                justifyContent: 'space-between',
                ...(window.innerWidth <= 480
                  ? {
                     margin:'30px 0 0 0'
                    }
                  : {}),
              }}
            >
              {activeFolder.length > 0 && (
                <Chip
                  label={'Убрать фильтрацию'}
                  icon={<Delete />}
                  variant="outlined"
                  onClick={() => {
                    setActiveFolder('')
                    setCourses(coursesData)
                    hideFolders()
                  }}
                />
              )}
              <div style={{ display: 'flex', WebkitFlexWrap: 'wrap', gap: ' 20px 50px' }}>
                <div style={{ display: 'flex', WebkitFlexWrap: 'wrap', gap: '20px' }}>
                  <Chip
                    // icon={showTestCourse ? <VisibilityOff /> : <Visibility />}
                    label={showTestCourse ? 'Скрыть тестовый курс' : 'Показать тестовый курс'}
                    variant="filled"
                    // sx={deleting ? { background: '#ff3131' } : {}}
                    sx={{
                      background: 'transparent',
                      border: '2px solid #357EEB',
                      borderRadius: '10px',
                      padding: '30px 40px',
                      width: 'fit-content',
                      color: '#357EEB',
                      fontSize: '20px',
                      lineHeight: '23.87px',
                      '@media (max-width: 600px)': {
                        padding: '20px 20px',
                        fontSize:'14px',
                        lineHeight:'normal'
                      },
                    }}
                    onClick={() => toggleTestCourseVisibility(!showTestCourse)}
                  />

                  <Chip
                    sx={{
                      background: 'transparent',
                      border: '2px solid #357EEB',
                      borderRadius: '10px',
                      padding: '30px 40px',
                      width: 'fit-content',
                      color: '#357EEB',
                      fontSize: '20px',
                      lineHeight: '23.87px',
                      '@media (max-width: 600px)': {
                        padding: '20px 20px',
                          fontSize:'14px',
                        lineHeight:'normal'
                      },
                    }}
                    label={activeFolder ? activeFolder : foldersVisible ? 'Скрыть папки' : 'Показать папки материалов'}
                    variant="filled"
                    onClick={toggleFolders}
                  />
                </div>

                <div style={{ display: 'flex', WebkitFlexWrap: 'wrap', gap: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', fontSize: '24px', whiteSpace: 'nowrap' }} className="">
                    Новые заявки <span style={{ color: '#357EEB' }}> ()</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', fontSize: '24px', whiteSpace: 'nowrap' }} className="">
                    Корзина <span style={{ color: '#357EEB' }}> ()</span>
                  </div>
                </div>
              </div>
              {/* {role !== RoleE.Student && ( */}
              <button type="button" onClick={dispatchHandlerModal} className={styles.course_button_add}>
                <span>Создать курс</span>
              </button>
              {/* )} */}

              {foldersVisible && folders && (
                <motion.div
                  style={{ display: 'flex', WebkitFlexWrap: 'wrap', gap: '1rem', alignItems: 'center', width: '100%', flexWrap: 'wrap' }}
                  initial={{
                    x: -50,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.2,
                  }}
                >
                  {folders.map((folder: any, index: Key | null | undefined) => (
                    <Chip
                      key={index}
                      label={folder.name}
                      variant="outlined"
                      sx={deleting ? { background: '#ff3131' } : {}}
                      onClick={() => {
                        if (deleting) {
                          startDeleteModal(folder)
                        } else {
                          filterCoursesByFolders(folder.id)
                          setActiveFolder(folder.name)
                          hideFolders()
                        }
                      }}
                    />
                  ))}
                  <button
                    style={{
                      width: '1.8rem',
                      height: '1.8rem',
                      borderRadius: '50%',
                      background: '#ba75ff',
                      border: 'none',
                      color: 'white',
                      fontSize: '30px',
                      position: 'relative',
                    }}
                    onClick={toggleModal}
                  >
                    <span style={{ position: 'absolute', top: '-0.28rem', left: '0.28rem' }}>+</span>
                  </button>
                  <button
                    style={{
                      width: '1.8rem',
                      height: '1.8rem',
                      borderRadius: '50%',
                      background: 'transparent',
                      border: 'none',
                      color: 'white',
                      fontSize: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onClick={toggleDeleting}
                  >
                    <Delete sx={{ color: 'red' }} />
                  </button>
                </motion.div>
              )}
            </div>
          </AnimatePresence>
        )}
        <Input
          role="search-input"
          name=""
          type="search"
          value={search}
          onChange={event => setSearch(event.target.value)}
          placeholder="Поиск по материалам"
        >
          <IconSvg width={20} height={20} viewBoxSize="0 0 20 20" path={searchIconPath} />
        </Input>
        {/* <div className={styles.search}>
                    <p color="gray">По результатам поиска ничего не найдено...</p>
        </div> */}
        {/* <div className={styles.course_all}>
                <ToggleButtonDropDown isOpen={isVisible} nameOfItems={'курсы'} handleToggleHiddenBlocks={handleVisible} />
            </div> */}
        <AnimatePresence>
          {
            <motion.div
              className={role === RoleE.Student ? styles.course : styles.course_admin}
              initial={{
                y: -50,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                delay: 0.5,
              }}
            >
              {courses && filteredCourses?.length !== 0 ? (
                <>
                  {filteredCourses?.map((course: any) =>
                    showTestCourse || course.course_id !== 247 ? <CoursesCard key={course?.course_id} course={course} role={role} /> : null,
                  )}
                  {role !== RoleE.Student && (
                    <button type="button" onClick={dispatchHandlerModal} className={styles.course_card}>
                      <span className={styles.course_addCourse}>
                        <span>Добавить материал</span>
                      </span>
                    </button>
                  )}
                </>
              ) : (
                <>
                  <div className={styles.search}>
                    <p color="gray">Нет доступных к просмотру материалов...</p>
                  </div>
                  {role !== RoleE.Student && (
                    <button type="button" onClick={dispatchHandlerModal} className={styles.course_card}>
                      <span className={styles.course_addCourse}>
                        <span>Добавить материал</span>
                      </span>
                    </button>
                  )}
                </>
              )}
            </motion.div>
          }
        </AnimatePresence>
        {showModal && (
          <Portal closeModal={toggleModal}>
            <AddNewFolderModal close={toggleModal} refreshFolders={refetch} />
          </Portal>
        )}
        {isOpenAddCourse ? (
          <Portal closeModal={onToggle}>
            <AddCourseModal courses={courses?.results} setShowModal={onToggle} />
          </Portal>
        ) : null}
        <Dialog open={alertOpen} onClose={closeAlert} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{`Вы действительно хотите удалить папку "${deletingFolder?.name}"?`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Это действие безвозвратно удалит папку, если вы не уверены, что хотите удалять папку {`"${deletingFolder?.name}"`}, то нажмите{' '}
              {'отмена'}. Если вы уверены, что хотите продолжить, нажмите {'удалить'}.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeAlert} text={'Отмена'} />
            <Button
              onClick={() => {
                deleteFolder({ id: Number(deletingFolder?.id), schoolName })
                closeAlert()
              }}
              autoFocus
              text={'Удалить'}
              variant={'delete'}
            />
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}
