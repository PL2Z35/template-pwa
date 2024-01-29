import { Card, Image } from 'antd';
import React, { useState } from 'react';

interface Props {
    onClick: () => void;
    title: string;
    subtitle: string;
    img: string;
    key: string;
}

const { Meta } = Card;

const CardCarousel: React.FC<Props> = ({ key, onClick, title, subtitle, img }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className='pr-8 pl-8'>
            <Card
                className={`pb-2 card pt-10 ${isHovered ? 'zoom-effect' : ''}`}
                hoverable
                bordered
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    width: '100%',
                    height: '250px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden', // Added to prevent content overflow
                }}
            >
                <Meta
                    title={
                        <h1
                            className='center-text large-text car-text-color'
                            style={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {title.split('..')[1].length > 17
                                ? title.split('..')[1].toUpperCase().substring(0, 17) + '...'
                                : title.split('..')[1].toUpperCase()}
                        </h1>
                    }
                    description={
                        <div
                            style={{
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {subtitle}
                        </div>
                    }
                    className='pb-2'
                />
                <Image
                    alt='cpImage'
                    src={img}
                    onClick={void 0}
                    className='pb-2'
                    style={{
                        maxHeight: '150px',
                        maxWidth: '150px',
                        objectFit: 'contain',
                        marginBottom: '10px',
                    }}
                />
            </Card>
        </div>
    );
};

export default CardCarousel;
