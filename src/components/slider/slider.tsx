import { Pagination, EffectCoverflow } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';



import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow'

import styles from './slider.module.scss'



export const Slider = () => {
  return (
    <Swiper
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={3}
      spaceBetween={30}
      loop={true}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 200,
        modifier: 0,
        slideShadows: true,
      }}
      pagination={{
        dynamicBullets: true,
      }}
      modules={[EffectCoverflow, Pagination]}
      className="mySwiper"
    >
      <SwiperSlide className={styles.init_container}>
        <div className={styles.init_container_box}>
          <div className={styles.init_container_box_photo}>
            {/* <img src={}></img> */}
          </div>
          <div className={styles.init_container_box_info}>
            <p className={styles.init_box_container_info_name}>Влад Середа</p>
            <p className={styles.init_box_container_info_name}>25 лет, java разработчик</p>
          </div>
          <div className={styles.init_container_box_rev}>
            <p>Раньше я думал, что нормально зарабатывать в нашей стране нереально. но после IT мое мнение кардинально поменялось. 
              За короткое время я полностью ознакомился с материалами по Java. И вот мой результат- после окончания я нашел работу 
            за 2 месяца с зарплатой на старте 750$</p>
            <div>

            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className={styles.init_container}>
      <div className={styles.init_container_box}>
          <div className={styles.init_container_box_photo}>
            {/* <img src={com2}></img> */}
          </div>
          <div className={styles.init_container_box_info}>
            <p className={styles.init_box_container_info_name}>Александра Орлова</p>
            <p className={styles.init_box_container_info_name}>Support Lead в Хохлов Сабатовский</p>
          </div>
          <div className={styles.init_container_box_rev}>
            <p>Привлекло то, что у Course Hub приятный интерфейс как для наших учеников, так и для админов. Плюс, мы увидели заинтересованность проекта в развитии. Для нас это важно,так как мы сами стремимся постоянно развиваться.</p>
            <div>

            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className={styles.init_container}>
      <div className={styles.init_container_box}>
          <div className={styles.init_container_box_photo}>
            {/* <img src={com3}></img> */}
          </div>
          <div className={styles.init_container_box_info}>
            <p className={styles.init_box_container_info_name}>Зоя Мананникова</p>
            <p className={styles.init_box_container_info_name}>Руководитель обучения</p>
          </div>
          <div className={styles.init_container_box_rev}>
            <p>Привлекло то, что у Course Hub приятный интерфейс 
                как для наших учеников, так и для админов. Плюс, 
                мы увидели заинтересованность проекта в развитии. Для нас это важно,так как мы сами стремимся постоянно развиваться.</p>
            <div>

            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className={styles.init_containerLeave}>
        <div className={styles.init_container_box}>
        <div className={styles.init_container_box_leave}>
            <p>Оставить отзыв</p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  )
}