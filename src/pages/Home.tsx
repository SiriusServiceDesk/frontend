import { useSelector } from 'react-redux'
import { RequestsBlock, RequestsError, Welcome } from '../components'
import { userSelector } from '../redux/selectors/userSelector'

const Home = () => {
	const { name } = useSelector(userSelector)
	return (
		<div>
			<Welcome />
			{name ? <RequestsBlock /> : <RequestsError />}
		</div>
	)
}

export default Home
