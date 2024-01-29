import React, { useEffect, useState } from 'react';
import { Pagination, Spin } from 'antd'; // Importa Spin desde 'antd'
import { useRouter } from 'next/router';

const App: React.FC<{ page: number }> = ({ page }) => {
    const total = Math.ceil(page) * 10;
    const router = useRouter();
    const [defaultPage, setDefaultPage] = useState(page);
    const [loading, setLoading] = useState(true);

    const handlePageChange = (page: number) => {
        let currentUrl = window.location.href;
        let url = new URL(currentUrl);
        url.searchParams.set('page', page.toString());
        window.location.href = url.toString();
    }

    useEffect(() => {
        const queryPage = router.query.page;
        if (queryPage) {
            const parsedPage = parseInt(queryPage as string, 10);
            setDefaultPage(parsedPage);
            setLoading(false);
        }
    }, [router.query]);

    return (
        <div className='center-container'>
            {loading ? (
                <Spin size='large' />
            ) : (
                <Pagination current={defaultPage} total={total} onChange={handlePageChange} />
            )}
        </div>
    );
};

export default App;
