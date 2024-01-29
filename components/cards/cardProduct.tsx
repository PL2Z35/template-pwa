import { Card, Tooltip } from 'antd';
import React from 'react';

interface Props {
    onClick: () => void;
    title: string;
    subtitle: string;
    price: string;
    img: string;
    key: string;
}

const { Meta } = Card;

const cardList: React.FC<Props> = ({ key, onClick, title, subtitle, img, price }) => {
    // Función para dividir el título en dos partes de 21 caracteres cada una
    const truncateTitle = (title: string): string[] => {
        const maxLength = 19;
        if (title.length > maxLength) {
            const part1 = title.substring(0, maxLength);
            const part2 = title.substring(maxLength, maxLength * 2);
            return [part1, part2];
        } else {
            return [title, ''];
        }
    };

    const truncatedTitle = truncateTitle(title);

    return (
        <>
            <div key={key} className='pr-2 pl-2 '>
                <Card
                    className='card pt-2'
                    hoverable
                    bordered={true}
                    style={{
                        width: '200px', // Adjust the width as needed
                        height: '350px', // Adjust the height as needed
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'center' }} className='image-container'>
                        <div style={{
                            width: '100%',
                            height: '60%', // Adjust the height as needed
                            overflow: 'hidden',
                        }}>
                            <img
                                alt='cpImage'
                                src={img}
                                onClick={void 0}
                                className='pb-2'
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    maxHeight: '150px',
                                    objectFit: 'cover',
                                }}
                            />
                        </div>
                    </div>
                    <div className=''>
                        <div className="pt-5" style={{ color: 'black' }}>
                            <strong>
                                <Tooltip title={title} placement="top">
                                    <h1 className='center-text-card large-text car-text-color'>{truncatedTitle[0].toUpperCase()}</h1>
                                </Tooltip>
                                {truncatedTitle.length > 1 && (
                                    <Tooltip title={title} placement="top">
                                        <h1 className='center-text-card large-text car-text-color'>{truncatedTitle[1].toUpperCase()}</h1>
                                    </Tooltip>
                                )}
                            </strong>
                            <Tooltip title={title} placement="top">
                                <h4 className='center-text'>{subtitle}</h4>
                            </Tooltip>
                            <div className='center-text-card'>
                                <strong>Desde: </strong>
                                {price}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    );
};

export default cardList;
