import React, { useState, useEffect } from 'react'
import Page from '@/components/page'
import Section from '@/components/section'
import { Card, Col, Row, ConfigProvider, Skeleton, Switch, Spin } from 'antd'
import { get_all_total_categories, get_home_products, isAuthenticate } from '@/config/petitions'
import AlertSignin from '@/components/index/alertSignin'
import CarouselImages from '@/components/index/carrouselImages'
import CardCategory from '@/components/index/carousel/cardCategory'
import Carousel from '@/components/index/carousel/carousel'
import CardNotice from '@/components/cards/cardNotice'
import CardCarousel from '@/components/cards/cardCarousel'

const Index = () => {
	const [loading, setLoading] = useState(true)
	const [categories, setCatategoires] = useState([])
	const [family, setFamily] = useState([])
	const [home, setHome] = useState([])
	const [notices, setNotices] = useState([])

	useEffect(() => {
		console.log(localStorage.getItem('tokenHitch'))
		const categories_all = async () => {
			const home = await get_home_products()
			setCatategoires(home.global_categories)
			setNotices(home.Blogs)
			setFamily(home.Products1.items)
			setHome(home.Products2.items)
			setLoading(false)
		}
		categories_all()
		const handleLoad = () => setLoading(false)
		window.addEventListener('load', handleLoad)
		return () => window.removeEventListener('load', handleLoad)
	}, [])

	const handleClick = (url: string) => {
		window.location.href = url
	}

	return (
		<Page>
			<CarouselImages />
			<Section>
				<AlertSignin />
				<div className='card-container '>
					{loading ? (
						<Spin size='large' />
					) : (
						categories.map((item: { id: string, spanish: string, image_1: string }) => (
							<CardCategory
								key={item.id}
								onClick={() =>
									handleClick('/categoryPage?category=' + item.spanish)
								}
								namecp={item.spanish}
								img={item.image_1}
							/>
						))
					)}
				</div>
			</Section>
			<Section>
				<h1 className='text-title-section'>CONÉCTATE CON OTROS</h1>
				<div className='mt-2 mb-2'>
					<Carousel>
						{loading ? (
							<Spin size='large' />
						) : (
							notices.map((item: { id: string, image_url: string, description: string, title: string }) => (
								<CardNotice
									key={item.id}
									onClick={() => handleClick('')}
									title={item.title}
									img={item.image_url}
									subtitle={item.description}
								/>
							))
						)}
					</Carousel>
				</div>
			</Section>
			<Section>
				<h1 className='text-title-section'>Disfruta En Familia</h1>
				<div className='mt-2 mb-2'>
					<Carousel>
						{loading ? (
							<Spin size='large' />
						) : (
							family.map((item: { id: string, name: string, image: string, brand: string }) => (
								<CardCarousel
									key={item.id}
									onClick={() => handleClick('')}
									title={item.name}
									img={item.image}
									subtitle={item.brand}
								/>
							))
						)}
					</Carousel>
				</div>
			</Section>
			<Section>
				<h1 className='text-title-section'>Renueva Tu Hogar</h1>
					<Carousel>
						{loading ? (
							<Spin size='large' />
						) : (
							home.map((item: { id: string, name: string, image: string, brand: string }) => (
								<CardCarousel
									key={item.id}
									onClick={() => handleClick('')}
									title={item.name}
									img={item.image}
									subtitle={item.brand}
								/>
							))
						)}
					</Carousel>
				
			</Section>
		</Page >
	)
}

export default Index
