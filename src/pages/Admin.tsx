import { Navigate } from 'react-router-dom'

import { useState } from 'react'
import analytics from '../assets/analytics.svg'
import lightning from '../assets/lightning.svg'
import pen from '../assets/pen.svg'
import { AdminRequests, Analytics } from '../components'
import { useGetAllAdminQuery } from '../redux/services/application'
import Loading from './Loading'

const Admin = () => {
	const [selectedView, setSelectedView] = useState<number>(0)
	const { data, isLoading, isError } = useGetAllAdminQuery({})

	const view = !isLoading && {
		0: <AdminRequests requests={data.payload} />,
		1: <Analytics />,
		// 2: <Monitoring />,
	}
	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<>
					{!isError ? (
						<div className='admin'>
							<ul className='admin-menu'>
								<li
									className={selectedView === 0 ? 'admin-menu__selected' : ''}
									onClick={() => setSelectedView(0)}
								>
									<img src={pen} alt='pen' />
									<span>Заявки</span>
								</li>
								<li
									className={selectedView === 1 ? 'admin-menu__selected' : ''}
									onClick={() => setSelectedView(1)}
								>
									<img src={analytics} alt='analytics' />
									<span>Аналитика</span>
								</li>
								<li className='admin-monitoring'>
									<a href='http://213.226.127.82:3000/login' target='_blank'>
										<img src={lightning} alt='lightning' />
										<span>Мониторинг</span>
									</a>
								</li>
							</ul>
							{(view as any)[selectedView]}
						</div>
					) : (
						<Navigate to='/' />
					)}
				</>
			)}
		</>
	)
}

export default Admin
