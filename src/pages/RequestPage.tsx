import { grid } from 'ldrs'
import { Link, useParams } from 'react-router-dom'
import home from '../assets/home.svg'
import { useGetByIdQuery } from '../redux/services/application'
import { ReqColor } from '../types/ReqColor'

const RequestPage = () => {
	const { id } = useParams()

	const { data, isLoading } = useGetByIdQuery(id)

	grid.register()

	return (
		<div className='request-page'>
			<div className='request-page__heading'>
				<Link to='/'>
					<div className='request-page__heading-home'>
						<img src={home} alt='home' />
						<span>На главную</span>
					</div>
				</Link>
				<span className='request-page__heading-id'>№ {id}</span>
			</div>
			{isLoading ? (
				<div className='loader'>
					<l-grid size='60' speed='1.5' color='#5046e6'></l-grid>
				</div>
			) : (
				<>
					{!isLoading && data ? (
						<>
							<div className='request-page__id__status'>
								<h1>ID заявки: №{id}</h1>
								<div
									style={{
										backgroundColor: `${
											(ReqColor as any)[data.payload.status]
										}`,
									}}
								>
									{data.payload.status}
								</div>
							</div>
							<div className='request-page__info'>
								<h1>Детали</h1>
								<div className='request-page__info__module'>
									<ul className='request-page__info__titles'>
										<li>Название</li>
										<li>Статус</li>
										<li>Исполнитель</li>
										<li>Дата подачи</li>
										<li>Комментарий</li>
										<li className='request-page__info__titles__deadline'>
											Срок выполнения
										</li>
									</ul>
									<ul className='request-page__info__values'>
										<li>{data.payload.title}</li>
										<li
											style={{
												color: `${(ReqColor as any)[data.payload.status]}`,
											}}
										>
											{data.payload.status}
										</li>
										<li>{data.payload.performer}</li>
										<li>{data.payload.create_date}</li>
										<li className='request-page__info__values__comment'>
											{data.payload.comment}
										</li>
										<li>{data.payload.execution_period}</li>
									</ul>
								</div>
							</div>
						</>
					) : (
						<h1 className='request-error'>Такой заявки нет...</h1>
					)}
				</>
			)}
		</div>
	)
}

export default RequestPage
