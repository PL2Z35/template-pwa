import React from 'react'
import { Card, Image, Col, Button, Row, Rate } from 'antd'
import Section from '../section'


interface Props {
    img: string
    refe: string
    pname: string
    price: string
    go: string
    his: string
    rate: number

}

const hCardC: React.FC<Props> = ({ img, refe, pname, price, go, his, rate }) => {
    return (
        <Section>
            <div className='pt-1 pb-1'>
                <Card
                    hoverable
                    style={{ width: 'auto', alignItems: 'center', display: 'grid' }}
                >
                    <Image
                        style={{ borderRadius: "50%" }}
                        width={100}
                        src={img}
                    />
                    <Rate disabled defaultValue={rate} />
                    <p className='color-link-purple'>{refe}</p>
                    <p className='' style={{ fontWeight: 'bold' }}><span>{price}</span></p>
                    <p className=''>{pname}</p>
                    <Button className='btncardModal' href={go} target="_blank" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Ir al Sitio</Button>
                    <Button className='btncardModal' href={his} target="_blank" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Historico de Precios</Button>
                </Card>
            </div>
        </Section>

    )
}

export default hCardC
