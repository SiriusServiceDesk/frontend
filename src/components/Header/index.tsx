import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import admin from '../../assets/admin.svg'
import exit from '../../assets/exit.svg'
import logo from '../../assets/logo.svg'
import profile from '../../assets/profile.svg'
import { userSelector } from '../../redux/selectors/userSelector'
import { useGetUserQuery } from '../../redux/services/user'
import { removeUser, setUser } from '../../redux/user/userSlice'
import { LoginPopup } from '../Popups/LoginPopup'
import { RegisterPopup } from '../Popups/RegisterPopup'
import { VerifyEmailPopup } from '../Popups/VerifyEmailPopup'
import styles from './Header.module.scss'

export const Header = () => {
	const dispatch = useDispatch()
	const [regPopupOpened, setRegPopupOpened] = useState<boolean>(false)
	const [logPopupOpened, setLogPopupOpened] = useState<boolean>(false)
	const [verifyPopupOpened, setVerifyPopupOpened] = useState<boolean>(false)
	const navigate = useNavigate()

	const { data, isLoading } = useGetUserQuery({})
	useEffect(() => {
		if (!isLoading && data) {
			dispatch(setUser(data.payload))
		}
	}, [data, isLoading, dispatch])

	const userData = useSelector(userSelector)

	const handleExit = () => {
		const conf = confirm('Вы уверены, что хотите выйти?')
		if (conf) {
			dispatch(removeUser())
			navigate('/')
		}
	}

	return (
		<header className={styles.header}>
			{regPopupOpened && (
				<RegisterPopup
					setSelfOpened={setRegPopupOpened}
					setProceedOpened={setLogPopupOpened}
					setEmailVerifyOpened={setVerifyPopupOpened}
				/>
			)}
			{logPopupOpened && (
				<LoginPopup
					setSelfOpened={setLogPopupOpened}
					setProceedOpened={setRegPopupOpened}
				/>
			)}
			{verifyPopupOpened && (
				<VerifyEmailPopup setSelfOpened={setVerifyPopupOpened} />
			)}
			<Link to='/'>
				<img className={styles.logo} src={logo} alt='logo' />
			</Link>
			<div className={styles.sideMenu}>
				{userData.role === 'Админ' && (
					<Link to='/admin'>
						<img className={styles.admin} src={admin} alt='adm' />
					</Link>
				)}
				{!userData.name ? (
					<img
						className={styles.profile}
						src={profile}
						alt='profile'
						onClick={() => setRegPopupOpened(true)}
					/>
				) : (
					<img
						className={styles.profile}
						src={exit}
						alt='exit'
						onClick={handleExit}
					/>
				)}
			</div>
		</header>
	)
}
