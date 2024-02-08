import React, { useEffect, useRef, useState } from "react"
import styles from './circle.module.scss'

interface IProps{
    points: number;
}

interface Points{
    'x': number;
    'y': number
}

const  Circle = (props:IProps) => {
    const[showPoint, setShowPoint] = useState(false)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const pointRef = useRef(null)
    let r = 260
    let arrPoints:Array<Points> = []
    useEffect(() => {
        let canvas = canvasRef.current
        canvas.style.width = canvas.offsetWidth + 'px';
        canvas.style.height = canvas.offsetHeight + 'px';
        const ctx = canvas.getContext("2d") as any
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(66, 86, 122, 0.2)'
        ctx.beginPath()
        ctx.arc(canvasRef.current?.width / 2, canvasRef.current?.height / 2, r, 0, 2*Math.PI);
        ctx.stroke()
        let x, y;
        for(let i = 0; i < Math.PI * 2; i += Math.PI * 2 / props.points){
            x = canvasRef.current.width / 2 + r * Math.sin(i);
            y = canvasRef.current.height / 2 + r * Math.cos(i);
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(66, 86, 122, 1)'
            ctx.beginPath()
            ctx.arc(x, y, 2, 0, 2*Math.PI);
            ctx.fill()
            ctx.text
            ctx.stroke()
            arrPoints.push({'x': x, 'y': y})
        }
    }, [])
    // useEffect(() => {

    // }, [points])
    const  handleHover = (e:any) => {
        let rect = canvasRef.current.getBoundingClientRect()
        const ctx = canvasRef.current.getContext("2d") as any
        arrPoints.forEach((point, n) => {
            if((point.x - (e.pageX - rect.left) <= 5 && point.x - (e.pageX - rect.left) >= -5) && (point.y - (e.pageY - rect.top) <= 5 && point.y - (e.pageY - rect.top) >= -5)){
                setShowPoint(true)
            }
        })
    }
    return(
        <>
            <canvas className={styles.circle} ref={canvasRef} id='circle' width={530} height={530} onMouseMove={handleHover}></canvas>
            {showPoint? <div className={styles.point} ref={pointRef}></div> : null}
        </>
    )
}

export default Circle