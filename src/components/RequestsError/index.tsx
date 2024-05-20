import styles from './RequestsError.module.scss'

export const RequestsError = () => {
	return (
		<h1 className={styles.error}>
			Войдите или создайте аккаунт, чтобы подать заявку!
		</h1>
	)
}
