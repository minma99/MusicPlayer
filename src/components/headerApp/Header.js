import Reacat from 'react'
import './Header.css'
import { useState, useEffect } from 'react'
import { Container, Button, Col } from 'react-bootstrap'
import { GiMusicalNotes } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import Song from '../song/Song'
import Control from '../control/Control'
// import data from '../datas/Datas'
import Songlist from '../songlist/Songlist'

export default function Header() {
    /////////////state
    const [songs, setSongs] = useState([])
    const [currentSong, setCurrentSong] = useState(songs[0])
    const [toggle, setToggle] = useState(false)
    ////////////event

    useEffect(() => {
        const url = 'https://deezerdevs-deezer.p.rapidapi.com/track/%7Bid%7D';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '288a7d6786mshf7d7026bd940e01p15f87fjsnfc9e690a9d54',
                'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
            }
        };

try {
	fetch(url, options)
    .then((response) =>{response.text()
    console.log(response)})
    .then(data =>console.log(data))
	
	
} catch (error) {
	console.error(error);
}
    })
    //////////////////
    const selecthandler = (currentSongid) => {
        const selectedSong = songs.filter((item) => { return item.id === currentSongid })

        setCurrentSong(selectedSong[0])
        const newSong = (songs.map((item) => {
            if (item.id === currentSongid) {
                return {
                    ...item, active: true
                }
            } else {
                return {
                    ...item, active: false
                }
            }
        }))
        setSongs(newSong)
    }

    const toggelHandler = () => {
        setToggle(!toggle)
    }
    const prevHandling = (previd) => {
        const prevIndex = songs.findIndex((item) => item.id === currentSong.id)
        if (prevIndex === 0) {
            setCurrentSong(songs[songs.lenght - 1])
        }
        else {
            setCurrentSong(songs[prevIndex - 1])
        }

    }
    const nextHandling = (nextid) => {
        const nextIndex = songs.findIndex((item) => item.id === currentSong.id)
        if (nextIndex === (songs.lenght - 1)) {
            setCurrentSong(songs[0])
        }
        else {
            setCurrentSong(songs[nextIndex + 1])
        }



    }

    ///////////// jsx
    return (
        <>
            <div className='d-flex justify-content-between pe-1 ps-1'>
                <Col xs={2} className={`${toggle ? 'displayunleftside' : 'displayleftside '}`}>
                    <Col className='sidebar'>
                        <h3 className='text-center'>list of song</h3>
                        {songs.map((items) => <Songlist key={items.id} {...items} onSelect={selecthandler} />)}
                    </Col>ّ
                </Col>
                <Col xs={9} className={`rightside z-index-0${toggle ? 'rightsideopacity' : ''}`}>
                    <div className=''>
                        <Container className='text-end mt-2'>
                            <Button variant='primary' className='pe-3' onClick={() => toggelHandler()}>
                                ListSong
                                {
                                    toggle && <AiOutlineClose />
                                }
                            </Button>
                        </Container>
                        <Container className='text-center'>
                            <Song {...currentSong} />
                            <Control onPrev={prevHandling} onNext={nextHandling} {...currentSong} />
                        </Container>
                    </div>
                </Col>

            </div>



        </>
    )
}
