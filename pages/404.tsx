import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Page from '@/components/page';
import Section from '@/components/section';
import { Typography, Spin, Image } from 'antd';
import { LoadingOutlined, FrownOutlined } from '@ant-design/icons';

const { Title } = Typography;

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    const redirectHome = setTimeout(() => {
      router.push('/');
    }, 4000);

    return () => clearTimeout(redirectHome); // Clear the timeout on component unmount
  }, [router]);

  return (
    <Page>
      <Section >
        <div className='text-center'>
          <Image
            preview={false}
            src="https://www.mundodeportivo.com/urbantecno/hero/2023/10/descubre-que-es-el-error-404-y-como-puedes-solucionarlo.jpg?width=1200"
            width={300}
            className="not-found-illustration"
          />
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
          <Title level={4}>Lo sentimos, la página que estás buscando no existe o ha sido eliminada.</Title>
          <p>En unos momentos serás redirigido a la página de inicio.</p>
        </div>
      </Section>
    </Page>
  );
};

export default NotFound;