import React, { useState } from "react"
import styles from './block.module.scss'
import Circle from "Components/circle/circle"
import dates from "Src/dates"
import Slider from "../slider/slider"

export default function Block() {
    const [point, setPoint] = useState(1)
    const [title, setTitle] = useState(dates[point - 1].name)
    const setCurPoint = (pointNum: number) => {
        setPoint(pointNum)
        setTitle(dates[pointNum - 1].name)
    }
    return (
        <section className={styles.container}>
            <div className={styles.date_circle}>
                <h1 className={styles.title}>Исторические<br />даты</h1>
                <Circle title={title} points={dates.length} curPoint={point} setCurPoint={(pointNum) => setCurPoint(pointNum)} />
            </div>
            <div className={styles.btns_block}>
                <span className={styles.btns_num}>0{point} / 0{dates.length}</span>
                <div className={styles.btns}>
                    <button className={styles.btn} disabled={point == 1 ? true : false} onClick={() => setPoint(Number(point) - 1)}>
                        <svg width="16px" height="16px" strokeWidth="1.8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#42567a"><path d="M15 6L9 12L15 18" stroke="#42567a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    </button>
                    <button className={styles.btn} disabled={point == dates.length ? true : false} onClick={() => setPoint(Number(point) + 1)}>
                        <svg width="16px" height="16px" strokeWidth="1.8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#42567a"><path d="M9 6L15 12L9 18" stroke="#42567a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    </button>
                </div>
            </div>
            <Slider events={dates[point - 1].events} />
            <div className={styles.title_container}>
                <h2 className={styles.dates_title}>
                    <span className={`${styles.title_blue} ${styles.title}`}>{Object.keys(dates[point - 1].events)[0]} </span> 
                    <span className={`${styles.title_red} ${styles.title}`}>{Object.keys(dates[point - 1].events)[Object.keys(dates[point - 1].events).length - 1]}</span>
                </h2>
            </div>
            <div className={styles.horizontal} />
            <div className={styles.vertical} />
        </section>
    )
}