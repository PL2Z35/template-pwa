import React, { useEffect, useState } from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space, Menu } from 'antd';
import { get_home_products } from '@/config/petitions';
import DroptownMenu from './droptownMenu';

const App: React.FC = () => {
    return (
        <Dropdown className='pr-6' overlay={<DroptownMenu />}>
            <a onClick={(e) => e.preventDefault()}>
                <Space className=' center-text large-text color-link-white pr-4'>
                    CATEGORÍAS
                    <DownOutlined />
                </Space>
            </a>
        </Dropdown>
    );
}

export default App
