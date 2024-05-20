import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import './scss/app.scss'
import Loading from './pages/Loading'

function App() {
	const RequestPage = lazy(() => import('./pages/RequestPage'))

	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='' element={<Home />} />
				<Route
					path='request/:id' // :параметр(может быть сколько угодно)
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
