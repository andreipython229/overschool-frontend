import {FC, forwardRef, ReactNode, useEffect, useState} from 'react'
import styles from './styles/coursePage.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetchCourseDataFromCatalogMutation, useSendCourseAppealMutation } from 'api/catalogServices'
import { useFetchCourseLandingMutation, } from 'api/courseLandingServices'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { backArr } from 'components/Previous/config/svgIconPath'
import { Path } from 'enum/pathE'
import { Button } from 'components/common/Button/Button'
import { StarBorder, CollectionsBookmark, Person } from '@mui/icons-material'
import firstStep from 'assets/img/createProject/firstStep.png'
import secondStep from 'assets/img/createProject/secondStep.png'
import { CatalogCourseModules } from 'Pages/CourseCatalog/CoursePreview/courseModules'
import { useBoolean } from 'customHooks'
import { TransitionProps } from '@mui/material/transitions'
import { Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField, ThemeProvider, createTheme, styled } from '@mui/material'
import PhoneInput from 'react-phone-input-2'
import { BlocksController } from './BlocksController'
import {useAppDispatch} from "store/hooks";
import {changeBlocks, rollBackBlocks} from "store/redux/landing/constructorSlice";


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
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  // const [fetchCourse, { data: course, isLoading }] = useFetchCourseDataFromCatalogMutation()
  const [sendAppeal, { isLoading: sendingAppeal }] = useSendCourseAppealMutation()
  const [fetchLanding, {data: f_landing, isLoading}] = useFetchCourseLandingMutation()
  // const [openIndex, setOpenIndex] = useState<number>(-1)
  const [showModal, { on: close, off: openModal }] = useBoolean()
  const [error, setError] = useState<boolean>(false)
  const [step, setStep] = useState<number>(1)

  const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />
  })

  const closeModal = () => {
    setError(false)
    setStep(1)
    close()
  }

  useEffect(() => {
    const school_name = params.school_name
    if (school_name) {
      // fetchCourse(Number(params.course_id))
      fetchLanding({schoolName: String(params.school_name), id: Number(params.course_id)})
    }
  }, [params])

  useEffect(() => {
    if (f_landing) {
      dispatch(changeBlocks(f_landing))
    }
  }, [f_landing,])

  // const handleToggleOpen = (index: number) => {
  //   if (openIndex === index) {
  //     setOpenIndex(-1)
  //   } else {
  //     setOpenIndex(index)
  //   }
  // }

  if (!f_landing || isLoading) {
    return (
      <div className={styles.loaderBox}>
        <SimpleLoader style={{ height: '80px' }} />
      </div>
    )
  }

  const handleForm = () => {
    return null
  }



  return (
    <ThemeProvider theme={theme}>
      <div className={styles.wrapper}>
        <BlocksController
          // course={course}
          openModal={openModal}
          showModal={showModal}
          // countOfLessons={countOfLessons}
          isLoading2={isLoading}
          // handleToggleOpen={handleToggleOpen}
          // openIndex={openIndex}
        />
      {/*  <div className={styles.wrapper_banner}>*/}
      {/*    /!*<h2 style={{ textAlign: 'center', padding: '2rem 0 1rem', color: '#7730BD' }}>Список модулей и уроков внутри курса:</h2>*!/*/}
      {/*    /!*<div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', width: '100%' }}>*!/*/}
      {/*    /!*  {course.sections.map((module, index: number) => (*!/*/}
      {/*    /!*    <CatalogCourseModules*!/*/}
      {/*    /!*      section={module}*!/*/}
      {/*    /!*      sectionIndex={index}*!/*/}
      {/*    /!*      key={module.section_id}*!/*/}
      {/*    /!*      handleToggleOpen={handleToggleOpen}*!/*/}
      {/*    /!*      openIndex={openIndex}*!/*/}
      {/*    /!*    />*!/*/}
      {/*    /!*  ))}*!/*/}
      {/*    /!*</div>*!/*/}
      {/*    <div className={styles.wrapper_banner_content}>*/}
      {/*      <div className={styles.wrapper_banner_content_createProject}>*/}
      {/*        <h1>Присоединяйтесь к платформе OVERSCHOOL прямо сейчас!</h1>*/}
      {/*        <h1>Освойте одну из самых востребованных профессий!</h1>*/}
      {/*        <p>Попробуйте весь функционал в процессе использования и познайте, насколько он удобен</p>*/}
      {/*        <Button variant="primary" onClick={openModal} text="Оставить заявку" />*/}
      {/*      </div>*/}
      {/*      <div className={styles.wrapper_banner_content_images}>*/}
      {/*        <img src={firstStep} alt="Подать заявку" className={styles.wrapper_banner_content_images_firstStep} />*/}
      {/*        <img src={secondStep} alt="Подать заявку" className={styles.wrapper_banner_content_images_secondStep} />*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  {showModal && (*/}
      {/*    <Dialog*/}
      {/*      open={showModal}*/}
      {/*      TransitionComponent={Transition}*/}
      {/*      onClose={closeModal}*/}
      {/*      scroll="body"*/}
      {/*      PaperProps={{*/}
      {/*        component: 'form',*/}
      {/*        onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {*/}
      {/*          event.preventDefault()*/}
      {/*          event.stopPropagation()*/}
      {/*          const formData = new FormData(event.currentTarget)*/}
      {/*          formData.append('course', String(course.course_id))*/}
      {/*          if (formData) {*/}
      {/*            await sendAppeal(formData)*/}
      {/*              .unwrap()*/}
      {/*              .then(data => {*/}
      {/*                setError(false)*/}
      {/*                setStep(2)*/}
      {/*              })*/}
      {/*              .catch(err => setError(true))*/}
      {/*          }*/}
      {/*        },*/}
      {/*      }}*/}
      {/*      aria-describedby="alert-dialog-slide-description"*/}
      {/*    >*/}
      {/*      {step === 1 ? (*/}
      {/*        <>*/}
      {/*          <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', color: '#ba75ff' }}>*/}
      {/*            {'Оставьте Ваши данные и с Вами свяжется менеджер'}*/}
      {/*          </DialogTitle>*/}
      {/*          <DialogContent sx={{ padding: '1rem 4rem', display: 'flex', flexDirection: 'column', gap: '1rem', margin: '1rem 0' }}>*/}
      {/*            {error && <p style={{ fontSize: '12px', color: 'red' }}>Ошибка отправки заявки, введены некорректные данные</p>}*/}
      {/*            <TextField required margin="dense" id="name" name="name" label="Как к Вам обращаться:" type="text" fullWidth variant="outlined" />*/}
      {/*            <TextField required margin="none" id="email" name="email" label="Email:" type="email" fullWidth variant="outlined" />*/}
      {/*            <PhoneInput*/}
      {/*              inputClass={styles.phoneInput}*/}
      {/*              inputProps={{*/}
      {/*                name: 'phone',*/}
      {/*                theme: { theme },*/}
      {/*                required: true,*/}
      {/*              }}*/}
      {/*              placeholder="Номер телефона"*/}
      {/*              country={'by'}*/}
      {/*              onlyCountries={['by', 'ru', 'kz', 'ua']}*/}
      {/*            />*/}
      {/*            <TextField*/}
      {/*              margin="none"*/}
      {/*              id="message"*/}
      {/*              name="message"*/}
      {/*              multiline*/}
      {/*              minRows={2}*/}
      {/*              label="Дополнительная информация:"*/}
      {/*              type="text"*/}
      {/*              fullWidth*/}
      {/*              variant="outlined"*/}
      {/*            />*/}
      {/*          </DialogContent>*/}
      {/*          <DialogActions sx={{ padding: '0.5rem 4rem 1.5rem' }}>*/}
      {/*            <Button onClick={closeModal} text={'Отмена'} />*/}
      {/*            <Button type="submit" onClick={handleForm} text={'Отправить заявку'} />*/}
      {/*          </DialogActions>*/}
      {/*        </>*/}
      {/*      ) : (*/}
      {/*        <>*/}
      {/*          <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', color: '#ba75ff' }}>*/}
      {/*            {`Заявка о поступлении на курс ${course.name} успешно отправлена, для получения дополнительной информации, Вы можете перейти по контактной ссылке данной платформы`}*/}
      {/*          </DialogTitle>*/}
      {/*          <DialogContent>*/}
      {/*            <a href={course.contact_link} target="_blank" rel="noreferrer">*/}
      {/*              {course.contact_link}*/}
      {/*            </a>*/}
      {/*          </DialogContent>*/}
      {/*        </>*/}
      {/*      )}*/}
      {/*    </Dialog>*/}
      {/*  )}*/}
      </div>
    </ThemeProvider>
  )
}
