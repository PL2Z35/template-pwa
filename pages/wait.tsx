import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Page from '@/components/page';
import Section from '@/components/section';
import { Typography, Spin, Image } from 'antd';
import { LoadingOutlined, FrownOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Wait = () => {
  const router = useRouter();

  useEffect(() => {
    const redirectHome = setTimeout(() => {
      router.push('/');
    }, 7000); 

    return () => clearTimeout(redirectHome); 
  }, [router]);

  return (
    <Page>
      <Section >
        <div className='text-center'>
          <Title level={2}>Estamos ajustando los detalles para una funcionalidad épica.</Title>
          <Title level={3}>¡Muy pronto podrás disfrutar de la galaxia en tus manos! 🚀✨</Title>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </div>
      </Section>
    </Page>
  );
};

export default Wait;