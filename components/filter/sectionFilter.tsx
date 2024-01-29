import React, { useEffect, useState, Suspense } from 'react';
import Section from '../section';
import { Button, Slider, Switch } from 'antd';
import ButtonFlotant from './buttonFlotant';
import { isMobile } from 'react-device-detect';
import { useRouter } from 'next/router';

interface Brand {
  brand: string;
}

interface Props {
  filter: Brand[];
}

const SectionFilter: React.FC<Props> = ({ filter }) => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const handleBrandToggle = (brand: string) => {
    setSelectedBrand(prevSelectedBrand => (prevSelectedBrand === brand ? null : brand));
    router.push('/')
  };

  const section = () => {
    return (
      <Section>
        <h1 className='pb-5'><strong>Filtros</strong></h1>
        <div className='brand-list-container'>
          <h2 className='pb-2'>Marcas:</h2>
          <ul className="brand-list">
            {filter.map((brandObj: Brand) => (
              <li key={brandObj.brand}>
                <label>
                  <input
                    type="checkbox"
                    value={'' + brandObj.brand}
                    checked={selectedBrand === brandObj.brand}
                    onChange={() => handleBrandToggle(brandObj.brand)}
                  />
                  {' ' + brandObj.brand}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className='pt-5 price-filter-container'>
          <h2>Precios: </h2>
          <Slider defaultValue={30} disabled={disabled} />
          <Button>Filtrar</Button>
        </div>
      </Section>
    )
  }

  return isMobile ? (
    <ButtonFlotant>
      <Suspense fallback={<div>Loading...</div>}>{section()}</Suspense>
    </ButtonFlotant>
  ) : (
    <Suspense fallback={<div>Loading...</div>}>{section()}</Suspense>
  );
};

export default SectionFilter;
