import { useState } from 'react'
import styles from './RequestsBlock.module.scss'

import { Link } from 'react-router-dom'
import arrow from '../../assets/arrow.svg'
import update from '../../assets/update.svg'

const requests = [
	{
		id: 1,
		name: 'почистить кампутр',
		status: 'in progress',
		performer: 'Технический отдел',
		date: '21.02.2024',
	},
	{
		id: 2,
		name: 'почистить кампутр',
		status: 'in progress',
		performer: 'Технический отдел',
		date: '21.02.2024',
	},
	{
		id: 3,
		name: 'почистить кампутр',
		status: 'in progress',
		performer: 'Технический отдел',
		date: '21.02.2024',
	},
	{
		id: 4,
		name: 'почистить кампутр',
		status: 'in progress',
		performer: 'Технический отдел',
		date: '21.02.2024',
	},
	{
		id: 5,
		name: 'почистить кампутр',
		status: 'in progress',
		performer: 'Технический отдел',
		date: '21.02.2024',
	},
]

export const RequestsBlock = () => {
	const [selectedRequests, setSelectedRequests] = useState(0)
	const [updateStatus, setUpdateStatus] = useState('')

	const onClickUpdate = () => {
		if (!updateStatus) {
			setUpdateStatus('in progress')
			setTimeout(() => setUpdateStatus(''), 1000)
		}
	}

	// const handleRequestClick = () => {}

	return (
		<div className={styles.wrapper}>
			<div className={styles.requests__menu}>
				<ul>
					<li
						className={!selectedRequests ? styles.active : ''}
						onClick={() => setSelectedRequests(0)}
					>
						Мои заявки
					</li>
					<li
						className={selectedRequests ? styles.active : ''}
						onClick={() => setSelectedRequests(1)}
					>
						Выполненные
					</li>
				</ul>
				<div
					className={`${styles.update} ${updateStatus ? styles.updating : ''}`}
					onClick={onClickUpdate}
				>
					<img src={update} alt='upd' />
					<span>Обновить</span>
				</div>
			</div>
			<div className={styles.requests__wrapper}>
				<ul>
					<li>ID заявки</li>
					<li>Название</li>
					<li>Статус</li>
					<li>Исполнитель</li>
					<li>Дата</li>
				</ul>

				<div className={styles.requests}>
					{requests.map((req, index) => (
						<Link
							key={index}
							to={`request/${req.id}`}
							className={styles.requestLink}
						>
							<div className={styles.request}>
								<span className={styles.id}>{req.id}</span>
								<span className={styles.title}>{req.name}</span>
								<span className={styles.status} style={{ color: 'blue' }}>
									{req.status}
								</span>
								<span className={styles.performer}>{req.performer}</span>
								<span className={styles.date}>{req.date}</span>
								<img src={arrow} alt='arrow' />
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}
