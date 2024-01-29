import { Card, Col, Row, ConfigProvider, Skeleton, Switch } from 'antd'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { on } from 'events';

interface Props {
	onClick: () => void;
	namecp: string
	img: string
}
const { Meta } = Card
const cardCatProduct: React.FC<Props> = ({ onClick, namecp, img }) => {
	return (
		<div className='pr-5 pl-5'>
			<Card className='card pt-10' hoverable bordered={true}
				style={{ width: '100%', maxHeight: '500px', display: 'flex', flexDirection: 'column' }}
				cover={<img
					alt='cpImage'
					src={img}
					onClick={onClick}
					width="200" height="200"
					style={{minHeight: '80px'}}
					className='pr-20 pl-20' />}
			>
				<h1 className='center-text large-text car-text-color'>{namecp}</h1>
			</Card>
		</div>
	)
}

export default cardCatProduct
