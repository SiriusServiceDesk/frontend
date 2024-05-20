import { useState } from 'react'
import styles from './RequestsBlock.module.scss'

import { grid } from 'ldrs'
import { Link } from 'react-router-dom'
import arrow from '../../assets/arrow.svg'
import update from '../../assets/update.svg'
import { useGetAllQuery } from '../../redux/services/application'
import { ReqColor } from '../../types/ReqColor'
import { Request } from '../../types/Request'

export const RequestsBlock = () => {
	const [selectedRequests, setSelectedRequests] = useState(0)
	const [updateStatus, setUpdateStatus] = useState('')
	const { data, refetch, isLoading, isFetching, isError } = useGetAllQuery({})

	const requests: Request[] =
		isLoading && !isError
			? []
			: selectedRequests
			? data.payload.filter((req: Request) => req.status === 'Выполнена')
			: data.payload

	const onClickUpdate = () => {
		if (!updateStatus) {
			setUpdateStatus('in progress')
			refetch().then(() => setUpdateStatus(''))
		}
	}

	grid.register()

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
			{isLoading || isFetching ? (
				<div className='loader'>
					<l-grid size='60' speed='1.5' color='#5046e6'></l-grid>
				</div>
			) : (
				<>
					<div className={styles.requests__wrapper}>
						<ul>
							<li>ID заявки</li>
							<li>Название</li>
							<li>Статус</li>
							<li>Исполнитель</li>
							<li>Дата</li>
						</ul>

						<div className={styles.requests}>
							{requests.map((req: Request, index: number) => (
								<Link
									key={index}
									to={`request/${req.id}`}
									className={styles.requestLink}
								>
									<div className={styles.request}>
										<span className={styles.id}>{req.id}</span>
										<span className={styles.title}>{req.title}</span>
										<span
											className={styles.status}
											style={{ color: `${(ReqColor as any)[req.status]}` }}
										>
											{req.status}
										</span>
										<span className={styles.performer}>{req.performer}</span>
										<span className={styles.date}>{req.create_date}</span>
										<img src={arrow} alt='arrow' />
									</div>
								</Link>
							))}
						</div>
					</div>
				</>
			)}
		</div>
	)
}
