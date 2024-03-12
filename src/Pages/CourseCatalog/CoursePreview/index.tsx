import { FC, forwardRef, useEffect, useState } from 'react'
import styles from './coursePreview.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetchCourseDataFromCatalogMutation, useSendCourseAppealMutation } from 'api/catalogServices'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { backArr } from 'components/Previous/config/svgIconPath'
import { Path } from 'enum/pathE'
import { Button } from 'components/common/Button/Button'
import { Star } from '@mui/icons-material'
import firstStep from '../../../assets/img/createProject/firstStep.png'
import secondStep from '../../../assets/img/createProject/secondStep.png'
import { CatalogCourseModules } from './courseModules'
import { useBoolean } from 'customHooks'
import { TransitionProps } from '@mui/material/transitions'
import { Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField, ThemeProvider, createTheme, styled } from '@mui/material'
import PhoneInput from 'react-phone-input-2'

const theme = createTheme({
  palette: {
    primary: {
      main: '#ba75ff', //this overide blue color
      light: '#e0dced', //overides light blue
      dark: 'rgb(0, 0, 0)', //overides dark blue color
    },
  },
})

export const CoureCatalogPreview: FC = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [fetchCourse, { data: course, isLoading }] = useFetchCourseDataFromCatalogMutation()
  const [sendAppeal, { isLoading: sendingAppeal }] = useSendCourseAppealMutation()
  const [openIndex, setOpenIndex] = useState<number>(-1)
  const [showModal, { onToggle: toggleModal, on: closeModal, off: openModal }] = useBoolean()

  const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />
  })

  useEffect(() => {
    if (params && params.courseId) {
      fetchCourse(Number(params.courseId))
    }
  }, [params])

  const countOfLessons = () => {
    let count = 0
    course?.sections.map(section => (count += section.lessons.length))
    return count
  }

  const handleToggleOpen = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(-1)
    } else {
      setOpenIndex(index)
    }
  }

  if (!course || isLoading) {
    return <SimpleLoader />
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.wrapper}>
        <div className={styles.previous}>
          <div className={styles.background_image_course}>
            <img src={course.photo} />
          </div>
          <div className={styles.previous_bcgrShadow}></div>
          <div onClick={() => navigate(Path.Catalog)} className={styles.back_all_course}>
            <IconSvg width={9} height={15} viewBoxSize="0 0 8 13" path={backArr} />
            <span>Назад в каталог</span>
          </div>
          <div className={styles.previous_onlineCourses}>Онлайн-курс</div>
          <div className={styles.previous_title_name}>{course?.name}</div>
          <div className={styles.previous_buttonAccept}>
            <Button variant="primary" onClick={openModal} text="Оставить заявку" />
          </div>
        </div>
        <div className={styles.wrapper_courseStats}>
          <div className={styles.wrapper_courseStats_stat}>
            <span>Занятий:</span>
            <span>{countOfLessons()}</span>
          </div>
          <div className={styles.wrapper_courseStats_stat}>
            <span>Учеников:</span>
            <span>100+</span>
          </div>
          <div className={styles.wrapper_courseStats_stat}>
            <span>Рейтинг:</span>
            <span>
              5<Star />
            </span>
          </div>
        </div>
        <div className={styles.wrapper_banner}>
          <h2 style={{ textAlign: 'center', padding: '2rem 0 1rem', color: '#4d5766' }}>Список модулей и уроков внутри курса:</h2>
          <div>
            {course.sections.map((module, index: number) => (
              <CatalogCourseModules
                section={module}
                sectionIndex={index}
                key={module.section_id}
                handleToggleOpen={handleToggleOpen}
                openIndex={openIndex}
              />
            ))}
          </div>
          <div className={styles.wrapper_banner_content}>
            <div className={styles.wrapper_banner_content_createProject}>
              <h1>Присоединяйтесь к платформе OVERSCHOOL прямо сейчас!</h1>
              <h1>Освойте одну из самых востребованных профессий!</h1>
              <p>Попробуйте весь функционал в процессе использования и познайте, насколько он удобен</p>
              <Button variant="primary" onClick={openModal} text="Оставить заявку" />
            </div>
            <div className={styles.wrapper_banner_content_images}>
              <img src={firstStep} alt="Подать заявку" className={styles.wrapper_banner_content_images_firstStep} />
              <img src={secondStep} alt="Подать заявку" className={styles.wrapper_banner_content_images_secondStep} />
            </div>
          </div>
        </div>
        {showModal && (
          <Dialog
            open={showModal}
            TransitionComponent={Transition}
            onClose={closeModal}
            scroll="body"
            PaperProps={{
              component: 'form',
              onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault()
                const formData = new FormData(event.currentTarget)
                formData.append('course', String(course.course_id))
                if (formData) {
                  sendAppeal(formData)
                    .unwrap()
                    .then(data => {
                      console.log(data)
                      closeModal()
                    })
                }
              },
            }}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', color: '#ba75ff' }}>
              {'Оставьте Ваши данные и с Вами свяжется менеджер'}
            </DialogTitle>
            <DialogContent sx={{ padding: '1rem 4rem', display: 'flex', flexDirection: 'column', gap: '1rem', margin: '1rem 0' }}>
              <TextField required margin="dense" id="name" name="name" label="Как к Вам обращаться:" type="text" fullWidth variant="outlined" />
              <TextField required margin="none" id="email" name="email" label="Email:" type="email" fullWidth variant="outlined" />
              <PhoneInput
                inputClass={styles.phoneInput}
                inputProps={{
                  name: 'phone',
                  theme: { theme },
                  required: true,
                }}
                placeholder="Номер телефона"
                country={'by'}
                onlyCountries={['by', 'ru', 'kz', 'ua']}
              />
              <TextField
                margin="none"
                id="message"
                name="message"
                multiline
                minRows={2}
                label="Дополнительная информация:"
                type="text"
                fullWidth
                variant="outlined"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={closeModal} text={'Отмена'} />
              <Button type="submit" text={'Отправить заявку'} />
            </DialogActions>
          </Dialog>
        )}
      </div>
    </ThemeProvider>
  )
}
