import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import './scss/app.scss'

function App() {
	const RequestPage = lazy(() => import('./pages/RequestPage'))

	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='' element={<Home />} />
				<Route
					path='request/:id' // :параметр(может быть сколько угодно)
					element={
						<Suspense fallback={<div>loading...</div>}>
							<RequestPage />
						</Suspense>
					}
				/>
			</Route>
		</Routes>
	)
}

export default App
