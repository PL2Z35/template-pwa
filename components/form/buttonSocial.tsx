import { Button } from 'antd';
import Image from 'next/image';
import React from 'react';

interface Props {
    name: string;
    svg: string;
    onClick: () => void;
}

const ButtonSocial: React.FC<Props> = ({ name, svg, onClick }) => {
    return (
        <Button
            onClick={onClick}
            type="default"
            shape="round"
            icon={<Image alt={name} src={svg} width="17" height="17"/>}
			className='btnLoginFB'
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            {name}
        </Button>
    );
};

export default ButtonSocial;
