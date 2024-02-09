import React from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import styles from './slider.module.scss'
import 'swiper/css'
import 'swiper/css/navigation'
import './buttons.scss'

interface IProps{
    events: any
}

const Slider = (props: IProps) => {
    return(
        <div className={styles.container}>
            <Swiper 
                slidesPerView={3.5} 
                spaceBetween={30} 
                navigation={true} 
                grabCursor={true} 
                modules={[Navigation]}
                className={styles.slider}
            >
                {Object.keys(props.events).map((item, n) =>( 
                    <SwiperSlide key={n} className={styles.slide}>
                        <h3 className={styles.title}>{item}</h3>
                        <p className={styles.content}>{props.events[item]}</p>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Slider