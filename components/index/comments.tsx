import React, { useEffect, useState } from 'react';
import { Avatar, List, Rate } from 'antd';
import { get_comments } from '@/config/petitions';

interface Props {
}

const CommentList: React.FC<Props> = () => {
	const [data, setData] = useState([])
	useEffect(() => {
		const fetchData = async () => {
			const comments = await get_comments(localStorage.getItem('idProduct'));
			console.log(comments);
		}
		fetchData();
	});

	return (
		<>
			{!data || data.length === 0 ? (
				<h1>No hay comentarios</h1>
			) : (
				<List
					itemLayout="horizontal"
					dataSource={data}
					renderItem={(item, index) => (
						<List.Item>
							<List.Item.Meta
								avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
								title={<a>{'áaa'}</a>}
								description={'aa'}
							/>
							<Rate />
						</List.Item>
					)}
				/>
			)}
		</>
	);
};
export default CommentList;
