import { FC, useEffect } from 'react'
import styles from './styles/coursePage.module.scss'
import { useParams } from 'react-router-dom'
import { useFetchCourseLandingMutation } from 'api/courseLandingServices'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import { useBoolean } from 'customHooks'
import { ThemeProvider, createTheme } from '@mui/material'
import { BlocksController } from './BlocksController'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { changeBlocks } from 'store/redux/landing/constructorSlice'

const theme = createTheme({
  palette: {
    primary: {
      main: '#ba75ff', //this overide blue color
      light: '#e0dced', //overides light blue
      dark: 'rgb(0, 0, 0)', //overides dark blue color
    },
  },
})

export const CoursePageConstruct: FC = () => {
  const params = useParams()
  const dispatch = useAppDispatch()
  const [fetchLanding, { data: f_landing, isLoading }] = useFetchCourseLandingMutation()
  const [showModal, { on: close, off: openModal }] = useBoolean()
  const landing = useAppSelector(state => state.landing.blocks)

  useEffect(() => {
    const school_name = params.school_name
    if (school_name) {
      fetchLanding({ schoolName: String(params.school_name), id: Number(params.course_id) })
    }
  }, [params])

  useEffect(() => {
    // const savedState = sessionStorage.getItem('landingState');
    // if (f_landing && !savedState) {
    //   dispatch(changeBlocks(f_landing))
    // }
    if (f_landing) {
      dispatch(changeBlocks(f_landing))
    }
  }, [f_landing])

  useEffect(() => {
    if (landing) {
      sessionStorage.setItem('landingState', JSON.stringify(landing))
    }
  }, [landing])

  if (isLoading) {
    return (
      <div className={styles.loaderBox}>
        <SimpleLoader style={{ height: '80px' }} />
      </div>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.wrapper}>{!isLoading && <BlocksController openModal={openModal} />}</div>
    </ThemeProvider>
  )
}
