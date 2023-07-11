import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'


export default function Song(props) {
    return (
        <>
            <Container>
                <Row >
                    <Col className=' p-2 d-flex justify-content-center' >
                        <Card
                            style={{ width: '14rem' }}
                            className='border-light' >
                            <Card.Img
                                variant="top"
                                src={props.cover}
                                style={{ width: '14rem', height: '14rem' }}
                                className='rounded-pill' />
                            <Card.Body>
                                <Card.Title className='pt-1 text-secondary '>
                                    <div className='p-1'><h5>{props.name}</h5></div>
                                    <div className='p-1'><p>{props.artist}</p></div>
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                
            </Container>
        </>
    )
}
