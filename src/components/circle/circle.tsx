import React, { useEffect, useRef, useState } from "react"
import styles from './circle.module.scss'
import gsap from "gsap";
import dates from "Src/dates"

interface IProps{
    points: number;
    curPoint: number;
    title: string;
    setCurPoint: (pointNum:number) => void;
}

interface Points{
    'x': number;
    'y': number
}

const  Circle = (props:IProps) => {
    const[prevPoint, setPrevPoint] = useState(1)
    const[deg, setDeg] = useState(245)
    const[arrPoints, setArrPoints] = useState([])
    const circleRef = useRef(null)
    const firstPointRef = useRef(null)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    let r = 260

    const makeSmall = (elem: any) => {
        gsap.to(elem, {scale: 1, background: 'rgba(66, 86, 122, 1)', height: '6px', width: '6px'})
        elem.innerHTML = ''
        elem.dataset.title = ''
    }

    const makeFull = (elem: any) => {
        gsap.to(elem, { rotate: `-${deg}deg`, duration:'0'})
        gsap.to(elem, {scale: 2, background: 'rgba(255, 255, 255, 1)', height: '30px', width: '30px'})
        elem.innerHTML = elem.dataset.id
        elem.dataset.title = dates[elem.dataset.id - 1].name
    }

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
        let arr = []
        let x, y;
        for(let i = 0; i < Math.PI * 2; i += Math.PI * 2 / props.points){
            x = canvasRef.current.width / 2 + r * Math.sin(i);
            y = canvasRef.current.height / 2 + r * Math.cos(i);
            arr.push({'x': x, 'y': y})
        }
        setArrPoints([...arr])
    }, [])

    useEffect(() => {
        gsap.to(circleRef.current, {rotate: `${deg}deg`})
    }, [deg])

    useEffect(() => {
        console.log(firstPointRef.current)
        let delta = props.curPoint - prevPoint
        setPrevPoint(props.curPoint)
        setDeg(Number(deg) + (360 / props.points) * delta)
    }, [props.curPoint])

    const handleMouseEnter = (e:any) => {
        makeFull(e.target)
    }

    const handleMouseLeave = (e:any) => {
        makeSmall(e.target)
    }

    const handleClick = (e: any) => {
        let delta = e.target.dataset.id - props.curPoint
        props.setCurPoint(e.target.dataset.id)
        setPrevPoint(e.target.dataset.id)
        setDeg(Number(deg) + (360 / props.points) * delta)
        makeSmall(e.target)
    }
    return(
        <>
            <canvas className={styles.circle} ref={canvasRef} id='circle' width={530} height={530}>
            </canvas>
            <div className={styles.cover_circle} ref={circleRef}>
                {arrPoints.map((point, n) => <span key={n} data-id={n+1} ref={n + 1 == props.curPoint? firstPointRef : null} className={styles.point} style={{'top': `${point.y}px`, 'left': `${point.x}px`}} onMouseEnter={(e) => handleMouseEnter(e)} onMouseLeave={handleMouseLeave} onClick={handleClick}></span>)}
            </div>
        </>
    )
}

export default Circle