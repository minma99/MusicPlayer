import React from 'react'
import { useRef, useState } from 'react'
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'
import { ImNext2, ImPrevious2 } from 'react-icons/im'
import { Col } from 'react-bootstrap'

export default function Control(props) {
    /////////////state

    const audioref = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState('')
    const [duration, setDuration] = useState('')


    ////////////////events
    const playHandler = () => {
        if (isPlaying) {
            audioref.current.pause()
            setIsPlaying(!isPlaying)
        } else {
            audioref.current.play()
            setIsPlaying(!isPlaying)
        }
    }

    const timeHandler = (e) => {
        let currentT = e.target.currentTime
        let durationT = e.target.duration
        setCurrentTime(currentT)
        setDuration(durationT)

    }
    const timeFormat = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }
    const dragHandler = (e) => {
        audioref.current.currentTime = e.target.value
        let currentTi = e.target.value
        setCurrentTime(currentTi)
    }

    const prevHandler = (previd) => {
        props.onPrev(previd)

    }
    const nextHandler = (nextid) => {
        props.onNext(nextid)
    }

    //////////////////jsx

    return (
        <>
            <div>
                <Col xs={10} className='d-flex justify-content-end'>
                    <span className='pe-2'>{timeFormat(currentTime)}</span>
                    <input onChange={(e) => dragHandler(e)} type='range' min={0} max={duration} value={currentTime} style={{ width: '70%' }} />
                    <span className='ps-2'>{timeFormat(duration)}</span>

                </Col>
            </div>
            <div className='mb-5 mt-3 fs-4'>
                <Col md={{ span: 7, offset: 3 }} className='d-flex justify-content-around'>
                    <ImPrevious2 onClick={() => { prevHandler(props.id) }} />
                    <div onClick={() => playHandler()}>
                        {isPlaying ? <BsFillPauseFill /> : <BsFillPlayFill />}
                    </div>
                    <ImNext2 onClick={() => { nextHandler(props.id) }} />
                </Col>
            </div>
            <audio onLoadedMetadata={(e) => timeHandler(e)} onTimeUpdate={(e) => timeHandler(e)} ref={audioref} src={props.audio}></audio>
        </>
    )
}
