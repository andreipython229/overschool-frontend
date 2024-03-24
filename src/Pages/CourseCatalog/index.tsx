import { ChangeEvent, FC, memo, useEffect, useState } from 'react'
import styles from './CourseCatalog.module.scss'
import { Card, CardActionArea, CardContent, CardMedia, InputBase, Pagination, Typography, alpha, styled } from '@mui/material'
import { useFetchCourseCatalogQuery, useFilteredSearchMutation } from 'api/catalogServices'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import SearchIcon from '@mui/icons-material/Search'
import { Path } from 'enum/pathE'
import { motion } from 'framer-motion'
import { CatalogResponseT } from 'api/apiTypes'
import { generatePath, useNavigate } from 'react-router-dom'
import { logo } from 'assets/img/common'

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

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

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

  const handleFilter = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    await filterCourses(e.target.value)
      .unwrap()
      .then(data => setCourses(data))
  }

  if (!courses) {
    return <SimpleLoader style={{ position: 'fixed', top: '35%', left: '43%' }} />
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
      <div className={styles.wrapper_body}>
        <Typography gutterBottom variant="h5" sx={{ width: '100%', textAlign: 'center' }} color={'#ba75ff'} component="div">
          <p style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '14px' }}>
            Каталог курсов онлайн-школ на платформе{' '}
            <a
              href={Path.InitialPage}
              className={styles.headerButton}
              style={{
                textDecoration: 'none',
                color: '#ba75ff',
                fontWeight: 'bold',
                padding: '0.5rem',
                border: '2px solid #ba75ff',
                borderRadius: '7px',
              }}
            >
              <img src={logo} alt="Logotype ITOVERONE" />
              <p>Overschool.by</p>
            </a>
          </p>
        </Typography>
        <div style={{ width: '100%', padding: '0 2rem', display: 'flex', justifyContent: 'center' }}>
          <Search sx={{ border: '1px solid gray', borderRadius: '10px', width: '80% !important', backgroundColor: 'transparent' }}>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: '#ba75ff' }} />
            </SearchIconWrapper>
            <StyledInputBase onChange={handleFilter} placeholder="Поиск по курсам…" inputProps={{ 'aria-label': 'поиск' }} sx={{ width: '100%' }} />
          </Search>
        </div>
        {isFetching || isLoading ? (
          <SimpleLoader style={{ margin: '2rem auto' }} />
        ) : courses.results.length ? (
          <div className={styles.wrapper_body_courses}>
            {courses.results.map((course: any, index: number) => (
              <Card
                className={styles.wrapper_body_courses_card}
                sx={{ width: '30%', cursor: 'pointer', transition: 'all ease-in 0.2s' }}
                key={index}
              >
                <CardActionArea onClick={() => navigate(generatePath(Path.Catalog + Path.CatalogCourse, { courseId: course.course_id }))}>
                  <CardMedia component="img" height="240" image={course.photo} alt={course.name} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" color={'#ba75ff'} component="div">
                      <strong>{course.name}</strong>
                    </Typography>
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
    </motion.div>
  )
})
