import React, { useEffect, useState } from 'react';
import { Alert, Button, Form, Input, Space, notification } from 'antd';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import Page from '@/components/page';
import Section from '@/components/section';
import ButtonSocial from '@/components/form/buttonSocial';
import { forgot_password, isAuthenticate } from '@/config/petitions';
import { SmileOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const LoginPage = () => {

    const [alert, setAlert] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [api, contextHolder] = notification.useNotification();
    const router = useRouter();

    useEffect(() => {
        const auth = async () => {
            if(await isAuthenticate()){
                router.push('/')
            }
        }
        auth();
    });

    const openNotification = (message: string, description: string) => {
        notification.open({
            message: message,
            description: description,
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
    };

    const onFinish = async (values: any) => {
        if(await forgot_password(values.email)){
            openNotification("Enviado", "Chequea tu correo y sigue las instrucciones para recuperar tu cuenta.");
        }else{
            openNotification("Error", "Hubo un problema al enviar el correo, intenta mas tarde.");
        }
    };

    type FieldType = {
        email?: string;
    };

    return (
        <Page>
            <Section>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '70vh',
                    }}
                >
                    <div className="container">
                        <div className="div-centrado flex content-center items-center justify-center h-full">
                            <div className="px-4">
                                <div className="card relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 shadow-all-sides">
                                    <div className="flex-auto px-4 lg:px-10  pt-0">
                                        <div className="text-blueGray-400 text-center mb-3 font-bold color-text-black">
                                            <h6 className="pt-10 text-blueGray-800 text-sm font-bold color-text-black">
                                                Ingresa tu correo
                                            </h6>
                                        </div>
                                        <Form onFinish={onFinish}>
                                            <Form.Item<FieldType>
                                                name="email"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Por favor ingresa tu usuario!',
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    placeholder="Correo"
                                                    value={email}
                                                    type='email'
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </Form.Item>
                                            <Form.Item className='pt-2'>
                                                <Button
                                                    type="primary"
                                                    htmlType="submit"
                                                    className="w-full color-navbar"
                                                    shape="round"
                                                >
                                                    Enviar
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </Page>
    );
};

export default LoginPage;
