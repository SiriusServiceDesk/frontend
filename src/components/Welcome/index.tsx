import { useState } from 'react'
import { useSelector } from 'react-redux'
import welcomeGuy from '../../assets/welcome_guy.png'
import { userSelector } from '../../redux/selectors/userSelector'
import { CreateRequestPopup } from '../index'
import styles from './Welcome.module.scss'

export const Welcome = () => {
	const [createReqOpened, setCreateReqOpened] = useState<Boolean>(false)
	const { name } = useSelector(userSelector)

	return (
		<div className={styles.wrapper}>
			{createReqOpened && (
				<CreateRequestPopup setSelfOpened={setCreateReqOpened} />
			)}
			<div className={styles.text_block}>
				{name ? <h1>Приветствуем, {name}!</h1> : <h1>Приветствуем!</h1>}
				<span>
					<b>ServiceDesk</b> - платформа для эффективной обработки обращений.
					Оставьте заявку сейчас для быстрого и качественного решения вашей
					проблемы.
				</span>
				<div
					className={name ? styles.button : styles.buttonNotLoggined}
					onClick={() => setCreateReqOpened(true)}
				>
					{name ? 'Оставить заявку' : 'Сначала зарегистрируйтесь'}
				</div>
			</div>
			<img src={welcomeGuy} alt='welcome' />
			<div className={styles.color_block} />
		</div>
	)
}
