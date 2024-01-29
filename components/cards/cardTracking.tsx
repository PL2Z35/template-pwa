import React from 'react';
import { Card, Image, Col, Rate, Row } from 'antd';
import { isMobile } from 'react-device-detect';

interface Props {
    img: string;
    pname: string;
    rate: number;
}

const HCardSP: React.FC<Props> = ({ img, pname, rate }) => {
    return (
        <Card
            className='card'
            hoverable
            style={{
                width: 'auto',
                alignItems: isMobile ? 'center' : 'flex-start', 
                display: 'grid',
                margin: 10,
            }}
        >
            <Row gutter={[16, 16]}>
                <Col span={24} md={8} lg={8} xl={8} xxl={8} >
                    <Image
                        style={{ borderRadius: '50%', marginLeft: 12 }}
                        width={70}
                        src={img}
                        alt={pname}
                        className='items-center justify-center'
                    />
                </Col>
                <Col
                    span={24}
                    md={8}
                    lg={8}
                    xl={8}
                    xxl={8}
                    className='flex flex-col items-center justify-center'
                >
                    <h1 className='color-link-purple'>{pname}</h1>
                </Col>
                <Col
                    span={24}
                    md={8}
                    lg={8}
                    xl={8}
                    xxl={8}
                    className='flex flex-col items-center justify-center'
                >
                    <div className='flex' style={{ justifyContent: isMobile ? 'items-center justify-center' : 'flex-start' }}>
                        <Rate disabled defaultValue={rate} style={{ left: '1px' }} />
                    </div>
                </Col>
            </Row>
        </Card>
    );
};

export default HCardSP;
