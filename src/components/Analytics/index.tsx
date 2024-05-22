import Loading from '../../pages/Loading'
import { useGetAnalyticsQuery } from '../../redux/services/application'
import styles from './Analytics.module.scss'

export const Analytics = () => {
	const { data, isLoading, isError } = useGetAnalyticsQuery({})

	return (
		<>
			{isLoading || isError ? (
				<Loading />
			) : (
				<div className={styles.analytics}>
					<div className={styles.analyticsBlock + ' ' + styles.red}>
						<span>Новые заявки</span>
						<h1>{data.payload.pending}</h1>
					</div>
					<div className={styles.analyticsBlock}>
						<span>Заявок в работе</span>
						<h1>{data.payload.in_progress}</h1>
					</div>
					<div className={styles.analyticsBlock}>
						<span>Обработано за сегодня</span>
						<h1>{data.payload.processed_today}</h1>
					</div>
					<div className={styles.analyticsBlock}>
						<span>Обработано всего</span>
						<h1>{data.payload.processed}</h1>
					</div>
				</div>
			)}
		</>
	)
}
