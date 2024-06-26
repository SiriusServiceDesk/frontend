import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Loading from './pages/Loading'
import NotFound from './pages/NotFound'
import './scss/app.scss'

function App() {
	const RequestPage = lazy(() => import('./pages/RequestPage'))
	const Admin = lazy(() => import('./pages/Admin'))

	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='' element={<Home />} />
				<Route
					path='admin'
					element={
						<Suspense fallback={<Loading />}>
							<Admin />
						</Suspense>
					}
				/>
				<Route
					path='request/:id'
					element={
						<Suspense fallback={<Loading />}>
							<RequestPage />
						</Suspense>
					}
				/>
				<Route path='*' element={<NotFound />} />
			</Route>
		</Routes>
	)
}

export default App
