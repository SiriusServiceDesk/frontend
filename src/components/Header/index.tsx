import logo from '../../assets/logo.svg'
import notifications from '../../assets/notifications.svg'
import profile from '../../assets/profile.svg'
import styles from './Header.module.scss'

export const Header = () => {
	return (
		<header className={styles.header}>
			<img className={styles.logo} src={logo} alt='logo' />
			<div>
				<img className={styles.notifications} src={notifications} alt='notis' />
				<img className={styles.profile} src={profile} alt='profile' />
			</div>
		</header>
	)
}
