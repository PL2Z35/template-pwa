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
                className={`card pt-10 ${isHovered ? 'zoom-effect' : ''}`}
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
                    justifyContent: 'center'
                }}
            >
                <Meta
                    title={<h1 className='center-text large-text car-text-color'>{title.split('..')[1].length > 20 ? title.split('..')[1].toUpperCase().substring(0, 21) + '...' : title.split('..')[1].toUpperCase()}</h1>}
                    description={
                        <div
                            style={{
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 1,
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
