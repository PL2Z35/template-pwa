import React, { useState, useEffect } from 'react';
import { ConfigProvider, Spin } from 'antd';
import Page from '@/components/page';
import Section from '@/components/section';
import CarouselImages from '@/components/index/carrouselImages';
import CardCategory from '@/components/index/carousel/cardCategory'
import Title from '@/components/index/title';
import { get_all_for_categories, get_all_sub_categories, get_all_total_categories } from '@/config/petitions';
import { useRouter } from 'next/router';
import AlertSignin from '@/components/index/alertSignin';

const CategoryPage = () => {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const { category, subcategory } = router.query;

    useEffect(() => {
        const fetchData = async () => {
            if (subcategory) {
                const subcategoryData = await get_all_sub_categories(subcategory);
                setTitle(subcategoryData.title);
                setCategories(subcategoryData.data);
            } else if (category) {
                const categoryData = await get_all_for_categories(category);
                setTitle(categoryData.title);
                setCategories(categoryData.data);
            } else {
                setCategories(await get_all_total_categories());
                setTitle('CATEGORÍAS');
            }
            setLoading(false);
        };

        if (router.isReady) {
            fetchData();
        }

        const handleLoad = () => setLoading(false);
        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
    }, [router.isReady, category, subcategory]);

    const handleClick = (item: { id: string, spanish: string }) => {
        let url = ''
        if (subcategory) {
            url = '/filterPage?category=' + category + '&subcategory=' + item.id + '&page=1'
        } else if (category) {
            url = '/categoryPage?category=' + category + '&subcategory=' + item.id
        } else {
            url = '/categoryPage?category=' + item.spanish
        }
        window.location.href = url;
    };

    return (
        <Page>
            <CarouselImages />
			<Section>
				<AlertSignin />
                <Title namec={title}/>
				<div className='card-container '>
					{loading ? (
						<Spin size='large' />
					) : (
						categories.map((item: { id: string, spanish: string, image_2: string }) => (
							<CardCategory
								key={item.id}
								onClick={() =>
									handleClick(item)
								}
								namecp={item.spanish}
								img={item.image_2}
							/>
						))
					)}
				</div>
			</Section>
        </Page >
    );
};

export default CategoryPage;
