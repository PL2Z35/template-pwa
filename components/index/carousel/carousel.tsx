/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect, RefObject, forwardRef } from 'react';
import { Carousel, Button, Card } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Meta } = Card;

interface CarouselRef {
  next: () => void;
  prev: () => void;
}

interface Props {
  children: React.ReactNode;
}

const CarouselWithCards: React.ForwardRefRenderFunction<CarouselRef, Props> = ({ children }, ref) => {
  const carouselRef = useRef<CarouselRef | null>(null);
  const [slidesToShow, setSlidesToShow] = useState<number>(3);
  const [loading, setLoading] = useState(false);

  const updateSlidesToShow = () => {
    const width = window.innerWidth;
    setSlidesToShow(width <= 576 ? 1 : 3); // Puedes ajustar la cantidad de elementos mostrados en cada diapositiva aquí
  };

  useEffect(() => {
    updateSlidesToShow();
    const handleResize = () => {
      updateSlidesToShow();
    };

    const handleLoad = () => setLoading(false);

    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  const next = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  const prev = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };

  React.useImperativeHandle(ref, () => ({
    next,
    prev,
  }), [next, prev]);

  return (
    <div className='carousel-container' style={ {maxWidth: '1400px', margin: '0 auto' }}>
      <Button
        className='carousel-arrow-btn left elegant-btn'
        type='primary'
        icon={<LeftOutlined />}
        onClick={prev}
      />
      <Carousel  ref={carouselRef as RefObject<any>} dots={false} slidesToShow={slidesToShow}>
      {React.Children.map(children, (child: any) => (
          <div key={child.key} className='carousel-item' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <div style={{ textAlign: 'center' }}>
              {React.cloneElement(child)}
            </div>
          </div>
        ))}
      </Carousel>
      <Button
        className='carousel-arrow-btn right elegant-btn'
        type='primary'
        icon={<RightOutlined />}
        onClick={next}
      />
    </div>
  );
};

export default forwardRef(CarouselWithCards);
