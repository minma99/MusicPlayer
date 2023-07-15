import React from 'react'
import './Songlist.css'
import Card from 'react-bootstrap/Card';

export default function Songlist(props) {
    const selectHandling =(id) =>{
        props.onSelect(id)
    }

    return (
        <>
            <Card className={`item text-center ${props.active ? "select" : "" } `} onClick={() => selectHandling(props.id)}>
                <Card.Img variant="right" src={props.cover} alt="Card image" className='p-4' />
                <Card.Title className=' text-black fw-light'>
                    {props.name}
                </Card.Title>
            </Card>
        </>

    )
}
