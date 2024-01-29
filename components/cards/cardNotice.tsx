import { Card } from 'antd';
import React, { useState } from 'react';

interface Props {
    onClick: () => void;
    title: string;
    subtitle: string;
    img: string;
    key: string;
}

const { Meta } = Card;

const CardNotice: React.FC<Props> = ({ key, onClick, title, subtitle, img }) => {
    const [isZoomed, setZoomed] = useState(false);

    return (
        <div className='pr-8 pl-8'>
            <Card
                className={`card cardNotice ${isZoomed ? 'zoomed' : ''}`}
                hoverable
                bordered
                style={{
                    width: '100%',
                    height: '280px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                }}
                onMouseEnter={() => setZoomed(true)}
                onMouseLeave={() => setZoomed(false)}
            >
                <div className='overlay'></div>
                <Meta
                    title={<h1 className='center-text large-text car-text-color card-notice-text-color'>{title.length > 20 ? title.substring(0, 23) + '...' : title}</h1>}
                    description={
                        <div
                            style={{
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 3,
                            }}
                            className='card-notice-text-color'
                        >
                            {subtitle}
                        </div>
                    }
                    className='pb-2'
                />
            </Card>
        </div>
    );
};

export default CardNotice;
