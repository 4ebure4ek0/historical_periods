import React from "react"
import styles from './block.module.scss'
import Circle from "Components/circle/circle"
import dates from "Src/dates"

export default function Block () {
    return(
        <section className={styles.container}>
            <div className={styles.date_circle}>
                <h1 className={styles.title}>Исторические<br />даты</h1>
                <Circle points={dates.length}/>
            </div>
            <div className="slider"></div>
            <div className={styles.horizontal}/>
            <div className={styles.vertical}/>
        </section>
    )
}