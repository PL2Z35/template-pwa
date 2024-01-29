import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Menu, Dropdown, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { logout } from '@/config/petitions'

const UserNavbar = () => {
	const router = useRouter()
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	useEffect(() => {
		setIsAuthenticated(!!localStorage.getItem('token'))
	}, [])

	const handleSignOut = () => {
		logout()
		router.replace('/auth/signin')
	}

	const menu = (
		<Menu>
			{isAuthenticated ? (
				<>
					<Menu.Item key='profile'>
						<span>Usuario: </span>
						<strong>{localStorage.getItem('email')}</strong>
					</Menu.Item>
					<Menu.Item key='myProfile'>
						Mi perfil
						<Link href='/myProfile'></Link>
					</Menu.Item>
					<Menu.Item key='signin'>
						<Link href='/salesPoints'>Puntos de venta</Link>
					</Menu.Item>
					<Menu.Item key='signout' onClick={handleSignOut}>
						Salir
					</Menu.Item>
				</>
			) : (
				<div>
					<Menu.Item key='signin'>
						<Link href='/salesPoints'>Puntos de venta</Link>
					</Menu.Item>
					<Menu.Item key='signin'>
						<Link href='/auth/signin'>Inicia sesión</Link>
					</Menu.Item>
				</div>
			)}
		</Menu>
	)

	return (
		<div className='flex items-center gap-4'>
			<Dropdown overlay={menu} placement='bottomLeft'>
				<Avatar
					size='large'
					icon={<UserOutlined />}
					src={isAuthenticated ? localStorage.getItem('userImage') : undefined}
				/>
			</Dropdown>
		</div>
	)
}

export default UserNavbar
