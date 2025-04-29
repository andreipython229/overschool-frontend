import { FC, Key, useEffect, useMemo, useState } from 'react'
import { useAppSelector } from 'store/hooks'
import { CoursesCard } from './CoursesCard'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { Input } from 'components/common/Input/Input/Input'
import { RoleE } from 'enum/roleE'
import { schoolSelector, selectUser } from 'selectors'
import { AddCourseModal } from 'components/Modal'
import { useDeleteFolderMutation, useLazyFetchCourseFoldersQuery, useLazyFetchCoursesPageQuery } from 'api/coursesServices'
import { useSetSchoolMutation } from 'api/schoolService'
import { useBoolean } from 'customHooks/useBoolean'
import { Portal } from 'components/Modal/Portal'
import { useDebouncedFilter, usePagination } from '../../../../customHooks'
import styles from 'Pages/School/Navigations/CoursesCreating/coursePage.module.scss'
import { motion, AnimatePresence } from 'framer-motion'
import { CoursesT } from 'types/CoursesT'
import { Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { AddNewFolderModal } from 'components/Modal/AddFolderModal'
import { Button } from 'components/common/Button/Button'
import { useLazyFetchBonusesQuery } from '../../../../api/schoolBonusService'
import { setStudentBonus } from 'store/redux/bonuses/bonusSlice'
import { useDispatch } from 'react-redux'
import { useLazyFetchAllProgressQuery } from 'api/userProgressService'
import { SearchIconPath } from 'assets/Icons/svgIconPath'
import { LoaderLayout } from 'components/Loaders/LoaderLayout'
import { Pagination } from 'components/Pagination/Pagination'
import { useNavigate } from 'react-router-dom'
import { useFetchSchoolAppealsMutation } from 'api/catalogServices'

export const CoursePage: FC = () => {
  const { role } = useAppSelector(selectUser)
  const { schoolName, schoolId } = useAppSelector(schoolSelector)
  const test_course = localStorage.getItem('test_course')
  const [fetchData, { data: coursesData, isFetching, isSuccess }] = useLazyFetchCoursesPageQuery()
  const [fetchFolders, { data: folders, isError }] = useLazyFetchCourseFoldersQuery()
  const [isOpenAddCourse, { onToggle }] = useBoolean()
  const [courses, setCourses] = useState<CoursesT>()
  const { page: currentPage, onPageChange, paginationRange } = usePagination({ totalCount: coursesData?.count as number })
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
  const [fetchProgress, { data: userProgress, isLoading: progressLoading, isError: progressError }] = useLazyFetchAllProgressQuery()
  const [fetchAppealsData, { data: appealsData }] = useFetchSchoolAppealsMutation()
  const [pendingCount, setPendingCount] = useState(0)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const dispatchHandlerModal = () => {
    onToggle()
  }

  useEffect(() => {
    if (role === RoleE.Admin) {
      fetchFolders(schoolName)
    }
  }, [])

  useEffect(() => {
    if (isSuccess) {
      setCourses(coursesData)
    }
  }, [coursesData, setCourses])

  useEffect(() => {
    if (deletedSuccessfuly) {
      fetchFolders(schoolName)
    }
  }, [deletedSuccessfuly])

  useEffect(() => {
    if (schoolName && !coursesData && !isFetching) {
      fetchData({ schoolName, page: currentPage })
    }
    if (role === RoleE.Student) {
      getBonuses(schoolName)
    }
  }, [schoolId])

  useEffect(() => {
    if (currentPage && !isFetching) {
      fetchData({ schoolName, page: currentPage })
    }
  }, [currentPage])

  useEffect(() => {
    if (bonusSuccess && bonuses?.length) {
      dispatch(setStudentBonus(bonuses[0]))
    }
  }, [bonusSuccess, bonuses])

  useEffect(() => {
    if (role === RoleE.Student && !userProgress && !progressLoading) {
      fetchProgress({ schoolName })
    }
  }, [role, schoolName, userProgress, progressLoading])

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
      await updateSchoolTestCourse({ formdata, id: Number(schoolId) })
      await fetchData({ schoolName, page: currentPage })
      setCourses(coursesData)
    } catch (error) {
      console.error('Error updating test course:', error)
    }
  }

  const getProgress = (courseId: number) => {
    if (userProgress) {
      const currentProgress = userProgress.courses.find(course => course.course_id === courseId)
      return currentProgress
    } else return undefined
  }

  const startDeleteModal = (folder: { id: number; name: string }) => {
    openAlert()
    setDeletingFolder(folder)
  }

  const filteredCourses =
    role === RoleE.Student
      ? courses?.results
          .filter(course => {
            return course.name.toLowerCase().includes(search.toLowerCase())
          })
          .filter(course => course.public === 'О')
      : courses?.results.filter(course => {
          return course.name.toLowerCase().includes(search.toLowerCase())
        })

  useEffect(() => {
    if (schoolName) {
      fetchAppealsData({ schoolName: schoolName, pageToFetch: 1 })

    }
  }, [schoolName])

  useEffect(() => {
    if(appealsData && appealsData.results) {
      const count = appealsData.results.filter((appeal:any) => appeal.is_read === false).length
      setPendingCount(count)
    }
    
  }, [appealsData])

  if (!isSuccess || isFetching) return <LoaderLayout />
  
  return (
    <div className={styles.container}>
      {role === RoleE.Admin && (
        <AnimatePresence>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              padding: '1rem',
              justifyContent: 'space-between',
              ...(window.innerWidth <= 480
                ? {
                    margin: '30px 0 0 0',
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

            <div
              style={{
                display: 'flex',
                WebkitFlexWrap: 'wrap',
                gap: ' 20px 50px',
                ...(window.innerWidth <= 1200
                  ? {
                      gap: '10px',
                    }
                  : {}),
              }}
            >
              <div
                style={{
                  display: 'flex',
                  WebkitFlexWrap: 'wrap',
                  gap: '20px',

                  ...(window.innerWidth <= 850
                    ? {
                        display: 'none',
                      }
                    : {}),
                }}
              >
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
                    '@media (max-width: 1500px)': {
                      padding: '20px 20px',
                      fontSize: '14px',
                      lineHeight: 'normal',
                    },
                    '@media (max-width: 1200px)': {
                      padding: '8px 15px',
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
                    '@media (max-width: 1500px)': {
                      padding: '20px 20px',
                      fontSize: '14px',
                      lineHeight: 'normal',
                    },
                    '@media (max-width: 1200px)': {
                      padding: '8px 15px',
                    },
                  }}
                  label={activeFolder ? activeFolder : foldersVisible ? 'Скрыть папки' : 'Показать папки материалов'}
                  variant="filled"
                  onClick={toggleFolders}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  WebkitFlexWrap: 'wrap',
                  gap: '20px',
                  ...(window.innerWidth <= 1500
                    ? {
                        gap: '10px',
                      }
                    : {}),
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '24px',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    ...(window.innerWidth <= 1500
                      ? {
                          fontSize: '16px',
                        }
                      : {}),

                    ...(window.innerWidth <= 1200
                      ? {
                          fontSize: '14px',
                        }
                      : {}),
                  }}
                  className=""
                  onClick={() => navigate(`/school/${schoolName}/school-appeals/`)}
                >
                  Новые заявки 
                  <span style={{ color: '#357EEB' }}>
                    {pendingCount > 0 ? ` (+${pendingCount})` : ' (0)'}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '24px',
                    whiteSpace: 'nowrap',
                    ...(window.innerWidth <= 1500
                      ? {
                          fontSize: '16px',
                        }
                      : {}),

                    ...(window.innerWidth <= 1200
                      ? {
                          fontSize: '14px',
                        }
                      : {}),
                  }}
                  className=""
                >
                  Корзина <span style={{ color: '#357EEB' }}> ()</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={dispatchHandlerModal}
              className={styles.course_button_add}
              style={{
                ...(window.innerWidth <= 1500
                  ? {
                      fontSize: '16px',
                    }
                  : {}),
                ...(window.innerWidth <= 1200
                  ? {
                      padding: '8px 10px',
                      fontSize: '12px',
                    }
                  : {}),
              }}
            >
              <span>Создать курс</span>
            </button>

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
      <div className={styles.input}>
        <Input
          role="search-input"
          name=""
          type="search"
          value={search}
          onChange={event => setSearch(event.target.value)}
          placeholder="Поиск по материалам"
        >
          <IconSvg width={24} height={24} viewBoxSize="0 0 24 24" path={SearchIconPath} className={styles.searchIcon}>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0D28BB" />
                <stop offset="100%" stopColor="#357EEB" />
              </linearGradient>
            </defs>
          </IconSvg>
        </Input>
      </div>

      {role === RoleE.Admin && (
        <div
          style={{
            display: 'none',
            WebkitFlexWrap: 'wrap',
            gap: '10px',

            ...(window.innerWidth <= 850
              ? {
                  display: 'grid',

                  gridTemplateColumns: '1fr 1fr',
                  justifyContent: 'center',
                  margin: '20px 0 0 0',
                }
              : {}),

            ...(window.innerWidth <= 475
              ? {
                  margin: '0',
                  display: 'flex',
                  flexDirection: 'column',
                }
              : {}),
          }}
        >
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
              width: '100%',
              color: '#357EEB',
              fontSize: '20px',
              lineHeight: '23.87px',
              '@media (max-width: 1500px)': {
                padding: '20px 20px',
                fontSize: '14px',
                lineHeight: 'normal',
              },
              '@media (max-width: 1200px)': {
                padding: '10px ',
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
              width: '100%',
              color: '#357EEB',
              fontSize: '20px',
              lineHeight: '23.87px',

              '@media (max-width: 1500px)': {
                padding: '20px 20px',
                fontSize: '14px',
                lineHeight: 'normal',
              },
              '@media (max-width: 1200px)': {
                padding: '10px ',
              },
            }}
            label={activeFolder ? activeFolder : foldersVisible ? 'Скрыть папки' : 'Показать папки материалов'}
            variant="filled"
            onClick={toggleFolders}
          />
        </div>
      )}

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
              filteredCourses?.map((course: any, index) =>
                (RoleE.Admin === role && showTestCourse) || course.course_id !== 247 ? (
                  <CoursesCard
                    userProgress={getProgress(course.course_id)}
                    key={course?.course_id}
                    course={course}
                    role={role}
                    refetchCourses={() => fetchData({ schoolName, page: currentPage })}
                  />
                ) : null,
              )
            ) : (
              <div className={styles.search}>
                <p color="gray">Нет доступных к просмотру материалов...</p>
              </div>
            )}
          </motion.div>
        }
        {courses && filteredCourses?.length !== 0 && (
          <motion.div className={styles.paginationBox}>
            <Pagination currentPage={currentPage} paginationRange={paginationRange} onPageChange={onPageChange} />
          </motion.div>
        )}
      </AnimatePresence>
      {showModal && (
        <Portal closeModal={toggleModal}>
          <AddNewFolderModal close={toggleModal} refreshFolders={() => fetchFolders(schoolName)} />
        </Portal>
      )}
      {isOpenAddCourse ? (
        <Portal closeModal={onToggle}>
          <AddCourseModal courses={courses?.results} refetch={fetchData} setShowModal={onToggle} />
        </Portal>
      ) : null}
      <Dialog open={alertOpen} onClose={closeAlert} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{`Вы действительно хотите удалить папку "${deletingFolder?.name}"?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Это действие безвозвратно удалит папку, если вы не уверены, что хотите удалять папку {`"${deletingFolder?.name}"`}, то нажмите {'отмена'}.
            Если вы уверены, что хотите продолжить, нажмите {'удалить'}.
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
  )
}
