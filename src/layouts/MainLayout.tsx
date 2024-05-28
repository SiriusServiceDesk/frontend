import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components'

const MainLayout: React.FC = () => {
	return (
		<div className='content'>
			<Header />
			<Outlet />
		</div>
	)
}

export default MainLayout
