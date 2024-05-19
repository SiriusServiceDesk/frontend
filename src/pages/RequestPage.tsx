import { Link, useParams } from 'react-router-dom'
import home from '../assets/home.svg'

const RequestPage = () => {
	const { id } = useParams()

	const request = {
		id: { id },
		name: 'почистить кампутр',
		status: 'in progress',
		performer: 'Технический отдел',
		comment: 'Технический отдел сраки нюх фу фу фу ',
		date: '21.02.2024',
		execution_period: '7 рабочиий пенис',
	}

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
			<div className='request-page__id__status'>
				<h1>ID заявки: №{id}</h1>
				<div>В работе</div>
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
						<li>{request.name}</li>
						<li>{request.status}</li>
						<li>{request.performer}</li>
						<li>{request.date}</li>
						<li className='request-page__info__values__comment'>
							{request.comment}
						</li>
						<li>{request.execution_period}</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default RequestPage
