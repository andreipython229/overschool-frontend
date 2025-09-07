import { Pagination, EffectCoverflow, Navigation, Autoplay } from 'swiper/modules'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/effect-coverflow'

import styles from './slider.module.scss'
import { useFetchFeedbacksQuery } from 'api/feedbacksService'
import Rating from '@mui/material/Rating'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { AddFeedbackModal } from 'components/Modal/AddFeedback/AddFeedbackModal'
import { Portal } from 'components/Modal/Portal'
import { useBoolean } from 'customHooks'
import { AnimatePresence } from 'framer-motion'
import { addFeedbackIconPath } from './config/svgIconPath'
import { addIconPath, arrowLeftNewIconPath, arrowRightNewIconPath } from 'config/commonSvgIconsPath'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useRef, useState } from 'react'

export const Slider = () => {
  const { data } = useFetchFeedbacksQuery()
  const [showModal, { on: close, off: open, onToggle: setShow }] = useBoolean()
  const paginationRef = useRef<HTMLDivElement | null>(null)

  const swiperRef = useRef<SwiperType | null>(null)
  const [activeSlide, setActiveSlide] = useState(0)

  const goToSlide = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index)
    }
  }
  const handleSlideChange = (swiper: SwiperType) => {
    setActiveSlide(swiper.activeIndex)
  }
  if (!data) {
    return <></>
  }

  return (
    <>
      <div className={styles.init_main_feedback_header}>
        <p className={styles.init_main_header}>Что говорят пользователи Course Hub</p>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <div
            className={styles.init_container_box}
            style={{ justifyContent: 'center', alignItems: 'center', gap: '0' }}
            onClick={() => console.log('Click ignored')}
          >
            <div className={styles.init_container_box_leave} style={{ background: '#cfe2ff', color: '#357eeb' }}>
              <p>Читать все отзывы</p>
            </div>
          </div>
          <div className={styles.init_container_box} style={{ justifyContent: 'center', alignItems: 'center', gap: '0' }} onClick={open}>
            <div className={styles.init_container_box_leave}>
              <IconSvg width={16} height={16} viewBoxSize="0 0 17 16" path={addIconPath} />
              <p>Написать отзыв</p>
            </div>
          </div>
        </div>
      </div>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={15}
        centeredSlides={true}
        autoplay={{
          delay: 2500, //2500
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: `.${styles.swiperPagination}`,
        }}
        modules={[Autoplay, Pagination]}
        className={styles.swiper}
        onInit={(swiper: any) => {
          swiperRef.current = swiper
        }}
        onSlideChange={handleSlideChange}
      >
        {data &&
          data?.map(({ id, name, surname, avatar, position, content, rating, created_at }) => {
            return (
              <SwiperSlide key={id} style={{ width: 'clamp(343px, 90vw, 400px)' }}>
                {({ isActive }) => (
                  <div className={isActive ? styles.init_container : `${styles.init_container} ${styles.inactive}`}>
                    <div className={styles.init_container_box}>
                      <div className={styles.init_container_box_photo}>
                        <img src={avatar} alt="avatar" />
                      </div>
                      <div className={styles.init_container_box_info}>
                        <p className={styles.init_container_box_info_name}>
                          {name} {surname}
                        </p>
                        <p className={styles.init_container_box_info_position}>{position}</p>
                      </div>
                      <div className={styles.init_container_box_rev}>
                        <p className={styles.init_container_box_rev_content}>{content}</p>
                        <div className={styles.init_container_box_rev_block}>
                          <p className={styles.init_container_box_rev_block_date}>
                            {`${(new Date(created_at).getDate() < 10 ? '0' : '') + new Date(created_at).getDate()}.${
                              (new Date(created_at).getMonth() + 1 < 10 ? '0' : '') + (new Date(created_at).getMonth() + 1)
                            }.${new Date(created_at).getFullYear()}`}
                          </p>
                          <Rating name="read-only" value={rating} readOnly />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            )
          })}
        <AnimatePresence>
          {showModal && (
            <Portal closeModal={close}>
              <AddFeedbackModal setShowModal={setShow} />
            </Portal>
          )}
        </AnimatePresence>
      </Swiper>
      <div className={styles.pagination}>
        <div className={`${styles.pagination_navBtn} ${styles.pagination_navBtn_prevBtn}`} onClick={() => swiperRef.current?.slidePrev()}>
          <IconSvg path={arrowLeftNewIconPath} viewBoxSize="0 0 64 64" width={30} height={30} />
        </div>
        <div className={styles.swiperPagination}></div>
        <div className={`${styles.pagination_navBtn} ${styles.pagination_navBtn_nextBtn}`} onClick={() => swiperRef.current?.slideNext()}>
          <IconSvg path={arrowRightNewIconPath} viewBoxSize="0 0 64 64" width={30} height={30} />
        </div>
      </div>
    </>
  )
}
