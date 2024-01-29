import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import { get_home_products } from '@/config/petitions';
import { isMobile } from 'react-device-detect';

interface Banner {
  image: string;
}



const BannerCarousel: React.FC = () => {
  const [bannerData, setBannerData] = useState<Banner[]>([]);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const isWeb = !isMobile;
        const response = await get_home_products(isWeb);
        const banners: Banner[] = response.banners || [];
        setBannerData(banners);
      } catch (error) {
        console.error('No hay banners:', error);
      }
    };

    fetchBanner();
  }, []);

  return (
    <Carousel autoplay style={{ width: isMobile ? '100%' : 'auto' }}>
      {bannerData.map((banner, index) => (
        <div key={index}>
          <video  autoPlay muted loop>
            <source src={banner.image} type="video/mp4" />
            Tu navegador no soporta videos.
          </video>
        </div>
      ))}
    </Carousel>
  );
};

export default BannerCarousel;
