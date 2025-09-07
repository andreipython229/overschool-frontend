import { ChangeEvent, FC, memo, useEffect, useState } from 'react'
import styles from './CourseCatalog.module.scss'
import { Card, CardActionArea, CardContent, CardMedia, InputBase, Pagination, Typography, alpha, styled, Box } from '@mui/material'
import { useFetchCourseCatalogQuery, useFilteredSearchMutation } from 'api/catalogServices'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import { Path } from 'enum/pathE'
import { motion } from 'framer-motion'
import { CatalogResponseT } from 'api/apiTypes'
import { generatePath, useNavigate } from 'react-router-dom'
import { BackgroundAnimation } from 'components/BackgroundAnimation'
import { SearchIcon } from 'components/SearchBar/svgIconsPath'
import { studentsSearchPath } from 'components/AllStudentsBlock/config/svgIconsPath'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { Button } from 'components/common/Button/Button'
import { InitPageHeader } from 'Pages/Initial/newInitialPageHeader'
import { Footer } from 'components/Footer/index'
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}))
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: '8px',
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

const colors: string[] = [
  '#93CEF3',
  '#93A6F3',
  '#A693F3',
  '#D693F3',
  '#ED93F3',
  '#F393B8',
  '#F3BD93',
  '#C6F393',
  '#93A6F3',
  '#D5F393',
  '#93CEF3',
  '#F393E8',
]

export const CourseCatalogPage: FC = memo(() => {
  const navigate = useNavigate()
  const [currentPage, setPage] = useState<number>(1)
  const [courses, setCourses] = useState<CatalogResponseT>()
  const [filterCourses, { isLoading }] = useFilteredSearchMutation()
  const { data: coursesData, isFetching, refetch } = useFetchCourseCatalogQuery(currentPage)

  useEffect(() => {
    if (currentPage) {
      refetch()
    }
  }, [currentPage])

  useEffect(() => {
    if (coursesData) {
      setCourses(coursesData)
    }
  }, [coursesData])

  const [searchValue, setSearchValue] = useState('')
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)
  const handleFilter = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value
    setSearchValue(value)
    timeoutId && clearTimeout(timeoutId)

    const newTimeout = setTimeout(async () => {
      if (value.trim()) {
        const data = await filterCourses(value).unwrap()
        setCourses(data)
      } else {
        const freshData = await refetch().unwrap()
        setCourses(freshData)
      }
    }, 500)
    setTimeoutId(newTimeout)
  }

  if (!courses) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh', background: 'transparent' }}>
        <SimpleLoader style={{ height: '80px' }} />
      </div>
    )
  }

  return (
    <motion.div
      initial={{
        x: -2000,
      }}
      animate={{
        x: 0,
        y: 0,
      }}
      transition={{
        ease: 'easeInOut',
        duration: 0.4,
      }}
      className={styles.wrapper}
    >
      <InitPageHeader />
      <BackgroundAnimation />
      <div className={styles.wrapper_body}>
        <Typography gutterBottom variant="h5" sx={{ width: '100%', textAlign: 'center' }} color={'#ba75ff'} component="div">
          <p className={styles.wrapper_body_textHeader}>Каталог курсов</p>
        </Typography>
        <div className={styles.search}>
          <Button
            onClick={async () => {
              setPage(1)
              setSearchValue('')
              const data = await refetch().unwrap()
              setCourses(data)
            }}
            variant="newPrimary"
            className={styles.wrapper_body_courses_button}
            text={''}
          >
            Все курсы
          </Button>
          <Search
            className={styles.search_field}
            sx={{
              border: '1px solid gray',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderRadius: '10px',
              padding: '5px 10px',
              backgroundColor: 'transparent',
            }}
          >
            <IconSvg width={30} height={30} viewBoxSize="0 0 30 30" path={studentsSearchPath}>
              <SearchIcon />
            </IconSvg>
            <StyledInputBase
              value={searchValue}
              onChange={handleFilter}
              placeholder="Поиск по курсам…"
              inputProps={{ 'aria-label': 'поиск' }}
              sx={{ width: '100%', paddingLeft: '8px' }}
            />
          </Search>
        </div>
        {isFetching || isLoading ? (
          <SimpleLoader style={{ margin: '2rem auto' }} />
        ) : courses.results.length ? (
          <div className={styles.wrapper_body_courses}>
            {courses.results.map((course: any, index: number) => (
              <Card
                className={styles.wrapper_body_courses_card}
                sx={{ cursor: 'pointer', transition: 'all ease-in 0.2s', backgroundColor: '#CFE2FF' }}
                key={index}
              >
                <div className={styles.colorCircle} style={{ backgroundColor: colors[index % colors.length] }}></div>
                <CardActionArea
                  disableRipple
                  sx={{
                    backgroundColor: 'transparent',
                    '& .MuiCardActionArea-focusHighlight': {
                      backgroundColor: 'rgba(0, 0, 0, 0) !important',
                    },
                    height: '100%',
                  }}
                  onClick={() => navigate(generatePath(Path.Catalog + Path.CatalogCourse, { courseId: course.course_id }))}
                >
                  <CardContent sx={{ display: 'flex', height: '100%' }}>
                    <Box
                      sx={{
                        width: '60%',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <Typography gutterBottom color="#000000" component="div" className={styles.wrapper_body_courses_card_name}>
                        {course.name}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: '40%',
                        height: '90%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="40"
                        image={course.photo}
                        alt={course.name}
                        sx={{
                          width: '85%',
                          height: 'max-content',
                        }}
                      />
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </div>
        ) : (
          <div style={{ width: '100%', padding: '3rem 2rem', textAlign: 'center' }}>
            <p color="gray">По результатам поиска ничего не найдено...</p>
          </div>
        )}

        <Pagination count={Math.ceil(courses.count / 12)} page={currentPage} sx={{ color: '#ba75ff' }} onChange={(event, page) => setPage(page)} />
      </div>
      <Footer />
    </motion.div>
  )
})
