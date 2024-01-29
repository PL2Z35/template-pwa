import React from 'react'

interface Props {
	namec: string
}

const title  : React.FC<Props> = ({ namec }) => {

return(
	<>
	<h1 className='text-title-page pb-10'>{namec}</h1>
	</>
)

}

export default title


