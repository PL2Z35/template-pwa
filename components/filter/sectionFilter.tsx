import React from 'react';
import Section from '../section';

interface Props {
  filterNamePrice: string;
  filterNameMark: string;
  href: string;
}

const SectionFilter: React.FC<Props> = ({ filterNameMark, filterNamePrice, href }) => {
  const minValue = 0;
  const maxValue = 100;

  return (
    <>
      <Section>
        <h1>Filtros</h1>
        <input
          type="range"
          min={minValue}
          max={maxValue}
          defaultValue={minValue}
          step={1}
        />
        <p>Valor seleccionado: {minValue}</p>
      </Section>
    </>
  );
};

export default SectionFilter;
