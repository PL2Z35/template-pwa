import React, { useEffect, useState } from 'react'
import {
	Alert,
	Button,
	DatePicker,
	Form,
	Input,
	Space,
	notification,
} from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import Page from '@/components/page'
import Section from '@/components/section'
import { Select } from 'antd'
import { useRouter } from 'next/router'
import type { DatePickerProps, SelectProps } from 'antd'
import {
	get_All_Countries,
	register_firebase,
	isAuthenticate,
} from '@/config/petitions'

const LoginPage = () => {
	const [alert, setAlert] = useState(false)
	const [form] = Form.useForm()
	const [countries, setCountries] = useState<SelectProps['options']>([])
	const [gender, setGender] = useState<SelectProps['options']>([])
	const router = useRouter()

	useEffect(() => {
		const auth = async () => {
			if (await isAuthenticate()) {
				router.push('/')
			}
		}

		const fetchData = async () => {
			const countriesData = await get_All_Countries()
			const countryOptions = countriesData.map((element: { country: any }) => ({
				value: element.country,
				label: element.country,
			}))
			setCountries(countryOptions)
			const genderOption = [
				{ label: 'MASCULINO', value: '1' },
				{ label: 'FEMENINO', value: '2' },
				{ label: 'OTRO', value: '3' },
			]
			setGender(genderOption)
		}
		auth()
		fetchData()
	}, [router])

	const openNotification = (message: string, description: string) => {
		notification.open({
			message: message,
			description: description,
			icon: <SmileOutlined style={{ color: '#108ee9' }} />,
		})
	}

	const onFinish = async (values: {
		password: string | any[]
		repassword: any
		email: any
		names: any
		lastname: any
		country: any
		gender: any
		date: any
	}) => {
		if (values.password !== values.repassword) {
			openNotification('Error en la contraseña', 'No coinciden las contraseñas')
		} else if (values.password.length < 8) {
			openNotification(
				'Error en la contraseña',
				'La contraseña debe tener al menos 8 dígitos',
			)
		} else {
			let fecha = new Date(values.date)
			let year = fecha.getFullYear()
			let month = fecha.getMonth() + 1
			let day = fecha.getDate()

			let formattedMonth = month < 10 ? '0' + month : month.toString()
			let formattedDay = day < 10 ? '0' + day : day.toString()

			let formattedDate = `${year}-${formattedMonth}-${formattedDay}`
			values.date = formattedDate

			let user = await register_firebase(values)
			if (user) {
				router.push('/auth/signin')
			} else {
				openNotification('Error de registro', 'El correo ya esta registrado.')
			}
		}
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}

	const onChange: DatePickerProps['onChange'] = (date, dateString) => {
		console.log(date, dateString)
	}

	type FieldType = {
		names: string
		lastname: string
		mail: string
		password: string
		repassword: string
		gender: string
		date: string
		country: string
	}

	return (
		<Page>
			<Section>
				<div className=' container'>
					<div className='div-centrado flex content-center items-center justify-center h-full'>
						<div className='px-4'>
							<div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 shadow-all-sides'>
								<div className='rounded-t mb-0 px-6 py-6'>
									<div className='text-center mb-3'>
										<h6 className='text-blueGray-800 text-sm font-bold color-text-black'>
											Registrate con tus credenciales
										</h6>
									</div>
									<Form
										form={form}
										onFinish={onFinish}
										onFinishFailed={onFinishFailed}
									>
										<div className='container-two'>
											<Form.Item
												name='names'
												rules={[
													{
														required: true,
														message: 'Ingresa tu nombre!',
													},
												]}
												className='pr-2 column-two'
											>
												<Input placeholder='Nombres' />
											</Form.Item>
											<Form.Item
												name='lastname'
												rules={[
													{
														required: true,
														message: 'Ingresa tus apellidos!',
													},
												]}
												className='pl-2 column-two'
											>
												<Input placeholder='Apellidos' />
											</Form.Item>
										</div>
										<div className='container-two'>
											<Form.Item
												name='email'
												rules={[
													{
														required: true,
														message: 'Ingresa el correo!',
													},
												]}
												className='pr-2 column-two'
											>
												<Input placeholder='Correo' type='email' />
											</Form.Item>
											<Form.Item
												name='date'
												rules={[
													{
														required: false,
														message: 'Ingresa tu fecha de nacimiento!',
													},
												]}
												className='pl-2 column-two'
											>
												<DatePicker
													onChange={onChange}
													className='total-width'
													placeholder='Selecciona tu fecha de nacimiento'
												/>
											</Form.Item>
										</div>
										<div className='container-two'>
											<Form.Item
												name='country'
												rules={[
													{
														required: true,
														message: 'Por favor ingresa tu pais!',
													},
												]}
												className='pr-2 column-two'
											>
												<Select
													showSearch
													placeholder='Pais'
													optionFilterProp='children'
													filterOption={(input, option) =>
														typeof option?.label === 'string' &&
														option?.label.includes(input)
													}
													filterSort={(optionA, optionB) => {
														const labelA =
															typeof optionA?.label === 'string'
																? optionA.label
																: ''
														const labelB =
															typeof optionB?.label === 'string'
																? optionB.label
																: ''
														return labelA
															.toLowerCase()
															.localeCompare(labelB.toLowerCase())
													}}
													options={countries}
												/>
											</Form.Item>
											<Form.Item
												name='gender'
												rules={[
													{
														required: false,
														message: 'Por favor ingresa tu pais!',
													},
												]}
												className='pl-2 column-two'
											>
												<Select
													showSearch
													placeholder='Genero'
													optionFilterProp='children'
													filterOption={(input, option) =>
														typeof option?.label === 'string' &&
														option?.label.includes(input)
													}
													filterSort={(optionA, optionB) => {
														const labelA =
															typeof optionA?.label === 'string'
																? optionA.label
																: ''
														const labelB =
															typeof optionB?.label === 'string'
																? optionB.label
																: ''
														return labelA
															.toLowerCase()
															.localeCompare(labelB.toLowerCase())
													}}
													options={gender}
												/>
											</Form.Item>
										</div>
										<div className='container-two'>
											<Form.Item<FieldType>
												name='password'
												rules={[
													{
														required: true,
														message: 'Ingresa tu contraseña!',
													},
												]}
												className='pr-2 column-two'
											>
												<Input placeholder='Contraseña' type='password' />
											</Form.Item>
											<Form.Item<FieldType>
												name='repassword'
												rules={[
													{
														required: true,
														message: 'Ingresa tu contraseña!',
													},
												]}
												className='pl-2 column-two'
											>
												<Input
													placeholder='Repite la contraseña'
													type='password'
												/>
											</Form.Item>
										</div>
										<Form.Item className='pt-2'>
											<Button
												type='primary'
												htmlType='submit'
												className='w-full color-navbar'
												shape='round'
											>
												Registrate
											</Button>
										</Form.Item>
									</Form>
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
