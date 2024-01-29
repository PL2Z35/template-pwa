import React from 'react';
import { Alert, Button, Card } from 'antd';
import { isMobile } from 'react-device-detect';

const { Meta } = Card;

const MobileAlert: React.FC = () => (
    <div className='pr-5 pl-5 pb-10'>
        <Alert
            message={
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingLeft: '30px', paddingRight: '30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <p style={{ margin: 0 }}>Inicia sesión para hacer compras inteligentes</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Button size='large' className='background-pink pb-1' style={{ marginBottom: '10px', color: 'white', border: '1px solid #be00e0', padding: '10px 20px' }} href='/auth/signin'><strong>Iniciar Sesión</strong></Button>
                        <Button size='large' style={{ backgroundColor: 'white', color: '#be00e0', border: '1px solid color-purple', padding: '10px 20px' }} href='/auth/signup'><strong>Crear Cuenta</strong></Button>
                    </div>
                </div>
            }
            type="info"
            className='background-purple pt-5 pb-5 card'
            style={{ fontSize: '18px', color: 'white' }}
        />
    </div>
);

const DesktopAlert: React.FC = () => (
    <div className='pb-10'>
        <Alert
            message={
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '30px', paddingRight: '30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <p style={{ margin: 0 }}>Inicia sesión para hacer compras inteligentes</p>
                    </div>
                    <div style={{ alignItems: 'center' }}>
                        <Button size='large' className='background-pink' style={{ marginRight: '10px', color: 'white', border: '1px solid #be00e0', padding: '10px 20px' }} href='/auth/signin'><strong>Iniciar Sesión</strong></Button>
                        <Button size='large' style={{ marginRight: '10px', backgroundColor: 'white', color: '#be00e0', border: '1px solid color-purple', padding: '10px 20px' }} href='/auth/signup'><strong>Crear Cuenta</strong></Button>
                    </div>
                </div>
            }
            type="info"
            className='background-purple pt-5 pb-5 card'
            style={{ fontSize: '18px', color: 'white' }}
        />
    </div>
);

const App: React.FC = () => (
    <>
        {isMobile ? <MobileAlert /> : <DesktopAlert />}
    </>
);

export default App;
