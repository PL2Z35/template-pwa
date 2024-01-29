import CardListProduct from '@/components/cards/cardProduct';
import Navigation from '@/components/filter/navigation';
import Page from '@/components/page';
import Section from '@/components/section';
import SectionFilter from '@/components/filter/sectionFilter';
import Title from '@/components/index/title';
import { get_all_products } from '@/config/petitions';
import { Spin } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';


const FilterPage = () => {
	const router = useRouter();
	const { page, subcategory, category } = router.query;
	const [title, setTitle] = useState('PRODUCTOS')
	const [products, setProducts] = useState([]);
	const [pageData, setPageData] = useState(0);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			if(!page){
				window.location.href = window.location.href+'?page=1'
			}
			try {
				let cont = 24;
				if(isMobile){
					cont = 24;
				}
				const result = await get_all_products(page ? page : 1, category ? category : null, subcategory ? subcategory : null, cont);
				setPageData(Math.ceil(result.count / cont));
				console.log(result)
				setProducts(result.results);
				
			} catch (error) {
				console.error('Error fetching data:', error);
				window.location.href = '/404'
			} finally {
				setLoading(false);
			}
		};

		if (router.isReady) {
			fetchData();
		}

		const handleLoad = () => setLoading(false);
		window.addEventListener('load', handleLoad);

		return () => window.removeEventListener('load', handleLoad);
	}, [category, page, router.isReady, subcategory]);

	const handleClick = (item: {
		model: string;
		id: string;
		name: string;
		image: string;
		brand: string;
		lower_price_product: { price: string; retailer_id: string };
	  }) => {
		router.push('/productPage?id=' + item.id);
	  };
	  

	const Desktop: React.FC = () => (
		<div className='pt-4 ' style={{ display: 'flex' }}>
			<div style={{ width: '20%' }}>
				<SectionFilter filterNameMark='' filterNamePrice='' href='' />
			</div>
			<div style={{ width: '80%' }}>
				<div className='card-container' style={{ textAlign: 'left' }}>
					{loading ? (
						<Spin size='large' />
					) : (
						products.map((item: { model: string, id: string; name: string; image: string; brand: string; lower_price_product: { price: string, retailer_id: string } }) => (
							<CardListProduct
								key={item.id}
								onClick={() => handleClick(item)}
								title={item.name}
								subtitle={item.brand}
								price={item.lower_price_product.price}
								img={item.image}
							/>
						))
					)}
				</div>

				<Navigation page={pageData} />
			</div>
		</div>
	)

	const Mobile: React.FC = () => (
		<div className='pt-4 ' style={{ display: 'flex' }}>
			<div style={{ width: '0%' }}>
				<SectionFilter filterNameMark='' filterNamePrice='' href='' />
			</div>
			<div style={{ width: '100%' }}>
				<div className='card-container' style={{ textAlign: 'left' }}>
					{loading ? (
						<Spin size='large' />
					) : (
						products.map((item: { model: string, id: string; name: string; image: string; brand: string; lower_price_product: { price: string, retailer_id: string } }) => (
							<CardListProduct
								key={item.id}
								onClick={() => handleClick(item)}
								title={item.name}
								subtitle={item.brand}
								price={item.lower_price_product.price}
								img={item.image}
							/>
						))
					)}
				</div>

				<Navigation page={pageData} />
			</div>
		</div>
	)
	

	return (
		<Page>
			<Section>
				<Title namec={title} />
				{isMobile ? <Mobile /> : <Desktop />}
			</Section>
		</Page>
	);
};

export default FilterPage;
