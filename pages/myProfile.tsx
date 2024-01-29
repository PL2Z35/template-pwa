import React, { createContext, useState } from 'react'
import {
	Button,
	Form,
	Input,
	Select,
	Space,
	Avatar,
	Card,
	Modal,
	notification,
} from 'antd'
import { UserOutlined } from '@ant-design/icons'
import Section from '../components/section'
import Page from '@/components/page'
import Title from '@/components/index/title'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { deleteUser } from '@/config/petitions'

interface Props {
	img: string
	pname: string
	rate: number
}

type FieldType = {
	username?: string
	usersname?: string
	password?: string
	email?: string
}

const { confirm } = Modal

const onFinish = (values: any) => {
	console.log('Received values of form: ', values)
}

const MyProfile: React.FC<Props> = ({ img, pname, rate }) => {
	const showPromiseConfirm = () => {
		confirm({
			title: '¿Desea eliminar su cuenta?',
			icon: <ExclamationCircleFilled />,
			content:
				'Perderás toda tu información y esta operación no es reversible!',
			okText: 'Sí, Eliminar',
			okType: 'danger',
			cancelText: 'No',
			async onOk() {
				try {
					await deleteUser()
					notification.success({
						message: 'Usuario Eliminado',
						description: 'Su usuario ha sido eliminado correctamente.',
					})
					setTimeout(() => {
						window.location.href = '/'
					}, 3000)
				} catch (error: any) {
					console.error('Error deleting user:', error.message)
					notification.error({
						message: 'Error al eliminar usuario',
						description:
							'Ocurrió un error al intentar eliminar su usuario. Por favor, inténtelo de nuevo.',
					})
				}
			},
			onCancel() {},
		})
	}

	return (
		<Page>
			<Section>
				<Title namec={'MI PERFIL'} />
				<div style={{ textAlign: 'center' }}>
					<div className='image-container centerTextP'>
						<Avatar
							size={{
								xs: 24,
								sm: 32,
								md: 40,
								lg: 64,
								xl: 80,
								xxl: 100,
							}}
							icon={<UserOutlined />}
							src='/userOn.svg'
							className='center-image'
						/>
					</div>
				</div>
			</Section>
			<Section>
				<Form
					name='complex-form'
					onFinish={onFinish}
					className='textForm'
					style={{ maxWidth: '600px', margin: '0 auto' }}
				>
					<Form.Item label='Usuario' className='textForm'>
						<Form.Item
							name='name'
							rules={[{ required: false }]}
							style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
						>
							<Input disabled placeholder='Nombre' className='inputForm' />
						</Form.Item>
						<Form.Item
							name='secondName'
							rules={[{ required: false }]}
							style={{
								display: 'inline-block',
								width: 'calc(50% - 8px)',
								margin: '0 8px',
							}}
						>
							<Input disabled placeholder='Apellido' className='inputForm' />
						</Form.Item>
					</Form.Item>
					<Form.Item label='E-mail' name='email'>
						<Input
							disabled
							placeholder='Email@compañia.com'
							className='inputForm'
						/>
					</Form.Item>
					<Form.Item
						label='Contraseña'
						name='password'
						rules={[
							{
								required: false,
								message: 'Tu contraseña debe tener al menos 6 caracteres',
							},
						]}
					>
						<Input.Password
							disabled
							placeholder='Contraseña'
							className='inputForm'
						/>
					</Form.Item>

					<div className='text-center'>
						<Form.Item label=' ' colon={false}>
							<Button danger type='text' onClick={showPromiseConfirm}>
								Eliminar Cuenta
							</Button>
							<Button className='btnProfile' htmlType='submit'>
								Guardar Cambios
							</Button>
						</Form.Item>
					</div>
				</Form>
			</Section>
		</Page>
	)
}

export default MyProfile
