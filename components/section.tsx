interface Props {
	children: React.ReactNode
}

const Section = ({ children }: Props) => (
	<section className='pt-10 mx-auto max-w-screen-xl px-2 mb-5'>{children}</section>
)

export default Section
