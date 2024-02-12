import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import styles from './circle.module.scss'
import gsap from "gsap";
import dates from "Src/dates"

interface IProps{
    points: number;
    curPoint: number;
    title: string;
    setCurPoint: (pointNum:number) => void;
}

interface IPoints{
    x: number;
    y: number;
}

const  Circle : React.FunctionComponent<IProps> = (props) => {
    const[touch, setTouch] = useState<boolean>(false)
    const[prevPoint, setPrevPoint] = useState<number>(1)
    const[deg, setDeg] = useState<number>(215)
    const[arrPoints, setArrPoints] = useState<Array<IPoints>>([])
    const circleRef = useRef<null | HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    let r = 260

    const makeSmall = (elem: EventTarget) : void => {
        if (!(elem instanceof HTMLSpanElement)) {
            return;
        }
        gsap.to(elem, {scale: 1, background: 'rgba(66, 86, 122, 1)', height: '6px', width: '6px'})
        elem.innerHTML = ''
        elem.dataset.title = ''
    }

    const makeFull = (elem: EventTarget) : void => {
        if (!(elem instanceof HTMLSpanElement)) {
            return;
        }
        gsap.to(elem, { rotate: `-${deg}deg`, duration:0})
        gsap.to(elem, {scale: 2, background: 'rgba(255, 255, 255, 1)', height: '30px', width: '30px'})
        elem.innerHTML = elem.dataset.id
        elem.dataset.title = dates[Number(elem.dataset.id) - 1].name
    }

    const checkTouch = () : void => {
        setTouch('ontouchstart' in document.documentElement)
    }

    const handleMouseOver = (e:React.SyntheticEvent<EventTarget>) : void => {
        if (!(e.target instanceof HTMLSpanElement)) {
            return;
        }
        if(!touch)
            makeFull(e.target)
    }

    const handleMouseLeave = (e:React.SyntheticEvent<EventTarget>) : void => {
        if (!(e.target instanceof HTMLSpanElement)) {
            return;
        }
        if(!touch)
            makeSmall(e.target)
    }

    const handleClick = (e: React.SyntheticEvent<EventTarget>) : void => {
        if (!(e.target instanceof HTMLSpanElement)) {
            return;
        }
        let delta = Number(e.target.dataset.id) - props.curPoint
        props.setCurPoint(Number(e.target.dataset.id))
        setPrevPoint(Number(e.target.dataset.id))
        setDeg(Number(deg) + (360 / props.points) * delta)
        makeSmall(e.target)
    }

    useLayoutEffect(() => {
        let canvas = canvasRef.current
        canvas.style.width = canvas.offsetWidth + 'px';
        canvas.style.height = canvas.offsetHeight + 'px';
        const ctx : CanvasRenderingContext2D = canvas.getContext("2d")
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(66, 86, 122, 0.2)'
        ctx.beginPath()
        ctx.arc(canvasRef.current?.width / 2, canvasRef.current?.height / 2, r, 0, 2*Math.PI);
        ctx.stroke()
        let arr = []
        let x:number, y:number;
        for(let i = 0; i < Math.PI * 2; i += Math.PI * 2 / props.points){
            x = canvasRef.current.width / 2 + r * Math.sin(i);
            y = canvasRef.current.height / 2 + r * Math.cos(i);
            arr.push({'x': x, 'y': y})
        }
        setArrPoints([...arr])
        checkTouch()
    }, [])

    useEffect(() => {
        gsap.to(circleRef.current, {rotate: `${deg}deg`})
    }, [deg])

    useEffect(() => {
        let delta = props.curPoint - prevPoint
        setPrevPoint(props.curPoint)
        setDeg(Number(deg) + (360 / props.points) * delta)
    }, [props.curPoint])
    return(
        <>
            <canvas className={styles.circle} ref={canvasRef} id='circle' width={530} height={530}>
            </canvas>
            <div className={styles.cover_circle} ref={circleRef}>
                {arrPoints.map((point, n) =>(
                    <span key={n} data-id={n+1} className={styles.point} style={{'top': `${point.y}px`, 'left': `${point.x}px`}} onMouseOver={(e) => handleMouseOver(e)} onMouseLeave={handleMouseLeave} onClick={handleClick}></span>
                ))}
            </div>
        </>
    )
}

export default Circle