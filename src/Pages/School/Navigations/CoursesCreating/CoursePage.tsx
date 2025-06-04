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
  const [activeFolders, setActiveFolders] = useState<string[]>([])
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [sortBy, setSortBy] = useState<'name' | 'date'>('name')
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

  const filterCoursesByFolders = (folderId: number, folderName: string) => {
    if (coursesData) {
      let filteredArray = coursesData.results
      
      // Фильтрация по папкам
      if (folderId) {
        filteredArray = filteredArray.filter(course => {
          return course.folder && course.folder.id === folderId
        })
      }

      // Сортировка
      filteredArray.sort((a, b) => {
        if (sortBy === 'name') {
          return sortOrder === 'asc' 
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        } else {
          return sortOrder === 'asc'
            ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            : new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        }
      })

      setCourses({ ...courses, results: filteredArray })
    }
  }

  const toggleFolder = (folderId: number, folderName: string) => {
    if (activeFolders.includes(folderName)) {
      setActiveFolders(activeFolders.filter(f => f !== folderName))
      setCourses(coursesData)
    } else {
      setActiveFolders([...activeFolders, folderName])
      filterCoursesByFolders(folderId, folderName)
    }
  }

  const handleSort = (type: 'name' | 'date') => {
    setSortBy(type)
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    if (courses) {
      const sortedCourses = [...courses.results].sort((a, b) => {
        if (type === 'name') {
          return sortOrder === 'asc' 
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        } else {
          return sortOrder === 'asc'
            ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            : new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        }
      })
      setCourses({ ...courses, results: sortedCourses })
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
          <div className={styles.filtersContainer}>
            <div className={styles.folderFilters}>
              {activeFolders.length > 0 && (
                <Chip
                  label="Сбросить фильтры"
                  icon={<Delete />}
                  variant="outlined"
                  onClick={() => {
                    setActiveFolders([])
                    setCourses(coursesData)
                  }}
                />
              )}
              
              {foldersVisible && folders && (
                <motion.div className={styles.foldersList}>
                  {folders.map((folder: any, index: Key) => (
                    <div key={index} className={styles.folderItem}>
                      <Chip
                        label={folder.name}
                        variant={activeFolders.includes(folder.name) ? "filled" : "outlined"}
                        sx={{
                          background: activeFolders.includes(folder.name) ? '#ba75ff' : 'transparent',
                          color: activeFolders.includes(folder.name) ? 'white' : 'inherit'
                        }}
                        onClick={() => toggleFolder(folder.id, folder.name)}
                      />
                      <button
                        className={styles.deleteFolderButton}
                        onClick={() => startDeleteModal(folder)}
                      >
                        <Delete fontSize="small" />
                      </button>
                    </div>
                  ))}
                  <button
                    className={styles.addFolderButton}
                    onClick={toggleModal}
                  >
                    <span>+</span>
                  </button>
                </motion.div>
              )}
            </div>

            <div className={styles.sortControls}>
              <Button
                variant="newSecondary"
                onClick={() => handleSort('name')}
                text={`По названию ${sortBy === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}`}
              />
              <Button
                variant="newSecondary"
                onClick={() => handleSort('date')}
                text={`По дате ${sortBy === 'date' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}`}
              />
            </div>

            <div className={styles.actionButtons}>
              <Chip
                label={showTestCourse ? 'Скрыть тестовый курс' : 'Показать тестовый курс'}
                variant="filled"
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
                label={activeFolders.length > 0 ? activeFolders.join(', ') : foldersVisible ? 'Скрыть папки' : 'Показать папки материалов'}
                variant="filled"
                onClick={toggleFolders}
              />

              <button
                type="button"
                onClick={dispatchHandlerModal}
                className={styles.course_button_add}
              >
                <span>Создать курс</span>
              </button>
            </div>
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
