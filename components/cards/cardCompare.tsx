/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import Section from '@/components/section'
import CommentList from '../index/comments'
import {
	Col,
	Image,
	Row,
	Breadcrumb,
	Card,
	Rate,
	Flex,
	Button,
	Tooltip,
	Avatar,
	List,
	Radio,
	Space,
	ConfigProvider,
	Modal,
	Spin,
} from 'antd'
import {
	EyeOutlined,
	HeartOutlined,
	AntDesignOutlined,
} from '@ant-design/icons'
import { get_comments, get_prices_by_retailer, get_product_retialres, get_retailer, get_retailer_by_id } from '@/config/petitions'
import { useRouter } from 'next/router'
import HCardC from '../cards/cardHCardC'


interface Props {
	refP: string
	titleP: string
	imgP: string
	imgSeller: string
	bestPrice: string
	linkButton: string
	username: string
}
const desc = ['Muy Malo', 'Malo', 'Normal', 'Bueno', 'Increible']

const cardCompare: React.FC<Props> = ({ }) => {
	const router = useRouter();
	const [retailer, setRetailer] = useState({ name: '', image: '' });
	const [retailerData, setRetailerData] = useState({ url: '', image: '' });
	const [retailers, setRetailers] = useState([]);
	const [image, setImage] = useState('');
	const [name, setName] = useState('');
	const [brand, setBrand] = useState('');
	const [price, setPrice] = useState('');
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			setImage(localStorage.getItem('imageProduct') || '');
			setName(localStorage.getItem('nameProduct') || '');
			setBrand(localStorage.getItem('brandProduct') || '');
			setPrice(localStorage.getItem('priceProduct') || '');
			setRetailer(await get_retailer_by_id(localStorage.getItem('retailerProduct')))
			const result = await get_prices_by_retailer();
			setRetailers(result);
			setRetailerData(result[0])
			setLoading(false)
		}
		fetchData();
		const handleLoad = () => setLoading(false)
		window.addEventListener('load', handleLoad)
		return () => window.removeEventListener('load', handleLoad)
	}, []);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const [value, setValue] = useState(0)

	return (
		<>
			<ConfigProvider
				theme={{
					token: {
						colorText: '#4d00e0',
						borderRadiusLG: 25,
						boxShadowTertiary:
							'0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',

					},
				}}
			>
				<Row className='mt-5'>
					<Col flex={2} className='flex flex-col items-center justify-center'>
						<h1 className='center-tex' style={{ maxWidth: '20ch', margin: '0 auto' }} >{name}</h1>
						<h1 className='refP'>{brand}</h1>
						<Image
							width={200}
							src={image}
						/>
						<p className='pP'>
							Imagen de referencia según tipo o cantidad del producto.
						</p>
					</Col>
					<Col flex={3} className='imgP-container'>
						<Card hoverable style={{ width: 300 }} className='mt-2 card'>
							<h1 className='titleC'>Califique este producto</h1>
							<Flex className='stars' gap='middle' vertical>
								<Rate tooltips={desc} onChange={setValue} value={value} />
							</Flex>
							<Flex gap='small' vertical className='imgP-container2'>
								<Flex wrap='wrap' gap='small'>
									<Button
										type='primary'
										shape='circle'
										icon={<HeartOutlined />}
										className='btncard'
									/>
									<Button
										type='primary'
										shape='circle'
										icon={<EyeOutlined />}
										className='btncard'
									/>
								</Flex>
							</Flex>
						</Card>
						<Card
							hoverable
							style={{ width: 300 }}
							title='Mejor Precio'
							extra={<a target="_blank" href={retailerData.url}>Ir al Sitio</a>}
							className='mt-2'
						>
							<Flex gap='small' wrap='wrap'>
								<Avatar
									size={{ xs: 60, sm: 60, md: 60, lg: 64, xl: 68, xxl: 100 }}
									icon={<AntDesignOutlined />}
									src={retailerData.image}
									style={{ border: '2px solid #000' }}
								/>
								<h1 className='flex flex-col items-center justify-center'>PRECIO: </h1>
								<h1 className='flex flex-col items-center justify-center'>{price}</h1>
							</Flex>
						</Card>
					</Col>
				</Row>
			</ConfigProvider>
			<section className='btncontainer'>
				<Button onClick={showModal} className='btncardSize'>COMPARAR</Button>
				<Modal
					title="COMPARAR"
					open={isModalOpen}
					onOk={handleOk}
					onCancel={handleCancel}
					centered={true}
					style={{ textAlign: 'center', fontSize: '1.3em' }}
					width={1000}
					footer={null}
				>
					{loading ? (
						<Spin size='large' />
					) : (
						retailers.map((item: { url: string, retailer_name: string, descripcion_b: string, str_price: string, id: string, spanish: string, image: string, retailer_rating: string }) => (
							<HCardC
								key={item.id}
								img={item.image}
								refe={item.retailer_name}
								pname={item.descripcion_b}
								price={item.str_price} go={item.url} his={'/wait'} rate={Number(item.retailer_rating)}
								/>
						))
					)}
				</Modal>
			</section>
			<Section>
				<CommentList />
			</Section>
		</>
	)
}

export default cardCompare
