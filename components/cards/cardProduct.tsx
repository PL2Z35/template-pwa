import { Button, Card, Flex, Tooltip } from 'antd';
import React from 'react';
import { isMobile } from 'react-device-detect';
import {
	EyeOutlined,
	HeartOutlined,
} from '@ant-design/icons'


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
    const truncateTitle = (title: string): string[] => {
        const maxLength = isMobile ? 13 : 19;
        title = title.split('..')[1]
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
                        width: isMobile ? '180px' : '230px',
                        height: '350px',
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'center' }} className='image-container'>
                        <div style={{
                            width: '100%',
                            height: '60%',
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
                                    objectFit: 'contain',
                                }}
                            />
                        </div>
                    </div>

                    <div className=''>
                        <Flex gap='small' vertical className='img-card-product'>
                            <Flex wrap='wrap' gap='small'>
                                <Button
                                    type='primary'
                                    shape='circle'
                                    icon={<HeartOutlined />}
                                    className='color-purple'
                                    disabled
                                />
                                <Button
                                    type='primary'
                                    shape='circle'
                                    icon={<EyeOutlined />}
                                    className='color-purple'
                                    disabled
                                />
                            </Flex>
                        </Flex>
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
