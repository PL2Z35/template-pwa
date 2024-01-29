/* eslint-disable react-hooks/rules-of-hooks */
import Page from '@/components/page'
import Section from '@/components/section'
import React, { useEffect, useState } from 'react'
import HCardSP from '@/components/cards/cardTracking'
import Title from '@/components/index/title'
import { get_retailers } from '@/config/petitions'
import { List, Button, Skeleton, Row, Col } from 'antd'

const SalesPoints = () => {
	const [retailersData, setRetailersData] = useState<any[]>([]) // Usar 'any' temporalmente
	const [loading, setLoading] = useState(false)
	const [hasMore, setHasMore] = useState(true)

	const fetchData = async () => {
		setLoading(true)
		try {
			// Simula la carga de más datos, reemplaza esto con tu lógica real
			const moreData = await get_retailers()
			setRetailersData((prevData) => [...prevData, ...moreData])
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	const loadMore = async () => {
    if (!loading && hasMore) {
      await fetchData();
    }
  };

	return (
		<Page>
      <Section>
        <Title namec={'Puntos de Venta'} />
        <List
          grid={{ gutter: 16, column: 2 }}
          dataSource={retailersData}
          renderItem={(data, index) => (
            <List.Item key={index}>
              <HCardSP img={data.image} pname={data.retailer} rate={data.rating} />
            </List.Item>
          )}
          loadMore={
           ''
          }
        />
      </Section>
    </Page>
	)
}

export default SalesPoints
