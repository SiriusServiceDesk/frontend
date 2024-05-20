import { grid } from 'ldrs'

const Loading = () => {
	grid.register()
	return (
		<div className='loader'>
			<l-grid size='60' speed='1.5' color='#5046e6'></l-grid>
		</div>
	)
}

export default Loading
