import { yupResolver } from '@hookform/resolvers/yup'
import { tailChase } from 'ldrs'
import { useForm } from 'react-hook-form'
import cross from '../../../assets/cross.svg'

import { useUpdateRequestMutation } from '../../../redux/services/application'
import { AdminEditRequestFormValues } from '../types/AdminEditRequestFormValues'
import { AdminEditRequestPopupProps } from '../types/AdminEditRequestPopupProps'

import { useState } from 'react'
import { adminEditRequestDefaultValues } from '../schema/adminEditRequestDefaultValues'
import { adminEditRequestValidationSchema } from '../schema/adminEditRequestValidationSchema'
import styles from './AdminEditRequestPopup.module.scss'

export const AdminEditRequestPopup: React.FC<AdminEditRequestPopupProps> = ({
	setSelfOpened,
	request,
}) => {
	const [status, setStatus] = useState(request.status)
	const [priority, setPriority] = useState(request.priority)
	const [update, { isLoading, isError }] = useUpdateRequestMutation()
	const {
		register,
		clearErrors,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<AdminEditRequestFormValues>({
		defaultValues: adminEditRequestDefaultValues,
		mode: 'onChange',
		resolver: yupResolver(adminEditRequestValidationSchema),
	})

	const onSubmit = (data: AdminEditRequestFormValues) => {
		const { execution_period, feedback } = data
		update([request.id, { execution_period, feedback, status, priority }]).then(
			(response: any) => {
				if (!response.error) {
					setSelfOpened({})
					window.location.reload()
				} else {
					console.log(response.error)
				}
			}
		)
		console.log({ execution_period, feedback, status, priority })

		reset()
		clearErrors()
	}

	tailChase.register()
	return (
		<div className='popup'>
			<div className='popup-backdrop' onClick={() => setSelfOpened({})}></div>
			<div className='popup-wrapper'>
				<div className='popup-wrapper__heading'>
					<h1>Редактирование заявки</h1>
					<img
						className='create-request__cross'
						src={cross}
						alt='cross'
						onClick={() => setSelfOpened({})}
					/>
				</div>
				<div className={styles.info}>
					<span className={styles.id}>ID №{request.id}</span>
					<span className={styles.title}>{request.title}</span>
					{request.comment && (
						<>
							<h2>Комментарий</h2>
							<span className={styles.comment}>{request.comment}</span>
						</>
					)}
					<div className={styles.statusSelection}>
						<h2>Статус</h2>
						<ul>
							<li
								className={
									status === 'Отклонена' ? styles.selectedDeclined : ''
								}
								onClick={() => setStatus('Отклонена')}
							>
								Отклонена
							</li>
							<li
								className={status === 'В работе' ? styles.selectedInWork : ''}
								onClick={() => setStatus('В работе')}
							>
								В работе
							</li>
							<li
								className={status === 'Выполнена' ? styles.selectedDone : ''}
								onClick={() => setStatus('Выполнена')}
							>
								Выполнена
							</li>
						</ul>
					</div>
					{status !== 'Выполнена' && (
						<div className={styles.prioritySelection}>
							<h2>Приоритет</h2>
							<ul>
								<li
									className={priority === 'Низкий' ? styles.selectedLow : ''}
									onClick={() => setPriority('Низкий')}
								>
									Низкий
								</li>
								<li
									className={
										priority === 'Средний' ? styles.selectedMiddle : ''
									}
									onClick={() => setPriority('Средний')}
								>
									Средний
								</li>
								<li
									className={priority === 'Высокий' ? styles.selectedHigh : ''}
									onClick={() => setPriority('Высокий')}
								>
									Высокий
								</li>
							</ul>
						</div>
					)}
				</div>

				<form onSubmit={handleSubmit(onSubmit)}>
					<span>Срок исполнения</span>
					<input
						{...register('execution_period')}
						placeholder='Срок исполнения'
					/>
					{errors?.execution_period && <p>{errors.execution_period.message}</p>}
					<span>Обратная связь </span> <textarea {...register('feedback')} />
					{errors?.feedback && <p>{errors.feedback.message}</p>}
					<button type='submit'>
						{isLoading ? (
							<l-tail-chase size='30' speed='1.75' color='white'></l-tail-chase>
						) : (
							'Сохранить'
						)}
					</button>
				</form>
				{isError && <span className='login-error'>Что-то пошло не так...</span>}
			</div>
		</div>
	)
}
