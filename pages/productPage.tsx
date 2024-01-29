/* eslint-disable react-hooks/rules-of-hooks */
import Page from '@/components/page'
import Section from '@/components/section'
import Title from '@/components/index/title'
import CardCompare from '@/components/cards/cardCompare'
import React, { useEffect } from 'react'

const productPage = () => {

	useEffect(()=>{
		window.location.href = '/wait'
	})

	return (
		<Page>
			<Section>
				<CardCompare
					refP={''}
					titleP={''}
					imgP={''}
					imgSeller={''}
					bestPrice={''}
					linkButton={''}
					username={''}
				/>
			</Section>
		</Page>
	)
}

export default productPage
