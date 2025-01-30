import { Pagination, EffectCoverflow, Navigation } from 'swiper/modules'

import { Swiper, SwiperSlide } from 'swiper/react'

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
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useRef } from 'react'

export const Slider = () => {
  const { data } = useFetchFeedbacksQuery()
  const [showModal, { on: close, off: open, onToggle: setShow }] = useBoolean()
  const paginationRef = useRef<HTMLDivElement | null>(null)

  if (!data) {
    return <></>
  }

  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        spaceBetween={30}
        centerInsufficientSlides
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: -25,
          depth: 100,
          modifier: 2,
          slideShadows: false,
        }}
        pagination={{
          el: paginationRef.current,
          clickable: true,
        }}
        navigation={{
          prevEl: '.button_prev',
          nextEl: '.button_next',
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="mySwiper"
      >
        {data &&
          data?.map(({ id, name, surname, avatar, position, content, rating, created_at }) => {
            return (
              <SwiperSlide key={id}>
                {({ isActive }) => (
                  <div className={isActive ? styles.init_container : `${styles.init_container} ${styles.inactive}`}>
                    <div className={styles.init_container_box}>
                      <div className={styles.init_container_box_photo}>
                        <img style={{ opacity: 0 }} src={avatar} alt="avatar" />
                      </div>
                      <div className={styles.init_container_box_info}>
                        <p className={styles.init_container_box_info_name}>
                          {name} {surname}
                        </p>
                        <p className={styles.init_container_box_info_position}>{position}</p>
                      </div>
                      <div className={styles.init_container_box_rev}>
                        <p>{content}</p>
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
        {data ? (
          <SwiperSlide className={styles.init_containerLeave} onClick={open}>
            <div className={styles.init_container_box}>
              <div className={styles.init_container_box_leave}>
                <IconSvg width={54} height={54} viewBoxSize="0 0 54 54" path={addFeedbackIconPath} />
                <p>Написать отзыв</p>
              </div>
            </div>
          </SwiperSlide>
        ) : null}
        <AnimatePresence>
          {showModal && (
            <Portal closeModal={close}>
              <AddFeedbackModal setShowModal={setShow} />
            </Portal>
          )}
        </AnimatePresence>
      </Swiper>
      <div className={styles.buttons_nav}>
        <div className="button_prev">
          <div className={styles.buttons_nav_btn}>
            <ArrowBackIosNewIcon />
          </div>
        </div>
        <div className={styles.pagination}>
          <div ref={paginationRef}></div>
        </div>
        <div className="button_next">
          <div className={styles.buttons_nav_btn}>
            <ArrowForwardIosIcon />
          </div>
        </div>
      </div>
    </>
  )
}
