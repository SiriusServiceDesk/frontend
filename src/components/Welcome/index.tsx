import { useSelector } from 'react-redux'
import welcomeGuy from '../../assets/welcome_guy.png'
import { userSelector } from '../../redux/selectors/userSelector'
import styles from './Welcome.module.scss'

export const Welcome = () => {
	const userData = useSelector(userSelector)

	return (
		<div className={styles.wrapper}>
			<div className={styles.text_block}>
				{userData.name ? (
					<h1>Приветствуем, {userData.name}!</h1>
				) : (
					<h1>Приветствуем!</h1>
				)}
				<span>
					<b>ServiceDesk</b> - платформа для эффективной обработки обращений.
					Оставьте заявку сейчас для быстрого и качественного решения вашей
					проблемы.
				</span>
				<div className={styles.button}>Оставить заявку</div>
			</div>
			<img src={welcomeGuy} alt='welcome' />
			<div className={styles.color_block} />
		</div>
	)
}
