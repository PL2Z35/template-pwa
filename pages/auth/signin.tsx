import { useState, FormEvent, useEffect } from 'react'
import { Alert, Button, Form, Input, Space, notification } from 'antd'
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons'
import Page from '@/components/page'
import Section from '@/components/section'
import ButtonSocial from '@/components/form/buttonSocial'
import ButtonSocialG from '@/components/form/buttonSocialG'
import {
	signin_user,
	GoogleAuthProviderToken,
	FacebookAuthProviderToken,
	isAuthenticate,
} from '@/config/petitions'
import { useRouter } from 'next/router'
import { SmileOutlined } from '@ant-design/icons'
import Link from 'next/link'

const LoginPage = () => {
	const [alert, setAlert] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const router = useRouter()
	const [form] = Form.useForm()
	const [api, contextHolder] = notification.useNotification()

	useEffect(() => {
		const auth = async () => {
			if (await isAuthenticate()) {
				router.push('/')
			}
		}
		auth()
	})

	const googleAuth = async () => {
		if (await GoogleAuthProviderToken()) {
			return router.push('/')
		}
	}

	const fbAuth = async () => {
		if (await FacebookAuthProviderToken()) {
			return router.push('/')
		}
	}

	const openNotification = () => {
		api.open({
			message: 'Error de inicio de sesion',
			description: 'El usuario o la contraseña son incorrectors.',
			icon: <SmileOutlined style={{ color: '#108ee9' }} />,
		})
	}

	const onFinish = async (values: any) => {
		const signin = await signin_user(values.email, values.password)
		if (signin) {
			router.push('/')
		} else {
			openNotification()
			setTimeout(() => setAlert(true), 500)
			form.resetFields()
		}
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}

	type FieldType = {
		email?: string
		password?: string
	}

	return (
		<Page>
			<Section>
				<div className="container">
					<div className="div-centrado flex content-center items-center justify-center h-full">
						<div className="px-4">
							<div className="">
								<div className='card pb-2'>
									<div className='rounded-t mb-0 px-6 py-6'>
										<div className='text-center mb-3'>
											{alert ? <>{contextHolder}</> : ''}
											<h6 className='h6'>Inicia sesión con</h6>
										</div>
										<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
											<div className='pb-2'>
											<ButtonSocialG
												name='Continua con Google'
												svg='/images/google.svg'
												onClick={googleAuth}
											/>
											</div>
											<ButtonSocial
												name='Continua con Facebook'
												svg='/images/facebook.svg'
												onClick={fbAuth}
											/>
										</div>
										<hr className='mt-6 border-b-1 border-blueGray-300' />
									</div>
									<div className='flex-auto px-4 lg:px-10  pt-0'>
										<div className='small'>
											<small>O Inicia Sesión con credenciales</small>
										</div>
										<Form onFinish={onFinish}>
											<Form.Item<FieldType>
												name='email'
												rules={[
													{
														required: true,
														message: 'Por favor ingresa tu usuario!',
													},
												]}
											>
												<Input
													placeholder='Usuario'
													value={email}
													type='email'
													className='inputForm'
												/>
											</Form.Item>
											<Form.Item<FieldType>
												name='password'
												rules={[
													{
														required: true,
														message: 'Por favor ingresa tu contraseña!',
													},
												]}
											>
												<Input.Password
													className='inputForm'
													placeholder='Contraseña'
													type='password'
													value={password}
												/>
											</Form.Item>
											<Form.Item className='pt-2'>
												<Button
													type='primary'
													htmlType='submit'
													className='w-full color-navbar'
													shape='round'
												>
													Inicia Sesión
												</Button>
											</Form.Item>
										</Form>
									</div>
								</div>
								<div className='flex flex-wrap mt-6 relative color-text-black justify-start'>
									<Link
										href='/auth/forgotPassword'
										className='underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
									>
										Olvido su contraseña
									</Link>
									<Link
										href='/auth/signup'
										className='ml-auto underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
									>
										Crear una cuenta
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Section>
		</Page>
	)
}

export default LoginPage
