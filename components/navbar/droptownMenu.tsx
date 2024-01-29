import React, { useState, useEffect } from 'react'
import {
	AppstoreOutlined,
	MailOutlined,
	SettingOutlined,
} from '@ant-design/icons'
import { ConfigProvider, Menu, MenuProps } from 'antd'
import { get_all_for_categories, get_home_products } from '@/config/petitions'
import Link from 'next/link'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
	label: React.ReactNode,
	key?: React.Key | null,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: 'group',
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type,
	} as MenuItem
}

interface Subcategory {
	title: string
	data: string
}

interface Category {
	spanish: string
	subcategories: Subcategory[]
}

const onClick: MenuProps['onClick'] = (e) => {
	console.log('click', e)
}

const App: React.FC = () => {
	const [home, setHome] = useState([])
	const [categories, setCategories] = useState<Category[]>([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const homeData = await get_home_products()
				const results: Category[] = await Promise.all(
					homeData.global_categories.map(
						async (element: {
							spanish: any
							subcategories: { title: any; data: any }
						}) => {
							const subcategoryData = await get_all_for_categories(
								element.spanish,
							)
							element.subcategories = subcategoryData
							return element
						},
					),
				)
				setCategories(results)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}
		fetchData()
	}, [])

	const generateMenuItems = (category: any) => {
		return category.subcategories.data.map((element2: any) => ({
			label: (
				<Link href={`/categoryPage?category=${category.spanish}&subcategory=${element2.id}`}>
					{element2.spanish}
				</Link>
			),
			key: element2.id,
		}))
	}

	const menuItems: MenuItem[] = categories.map((category: any) => ({
		label: category.spanish,
		key: category.id,
		icon: '',
		children: generateMenuItems(category),
	}))

	return (
		<div>
			<Menu
				onClick={onClick}
				style={{ width: 256 }}
				mode='vertical'
				items={menuItems}
				subMenuCloseDelay={0.1}
				subMenuOpenDelay={0.5}
			/>
		</div>
	)
}

export default App
