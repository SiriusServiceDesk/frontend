import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import cross from '../../../assets/cross.svg'
import info from '../../../assets/info.svg'
import selectedSvg from '../../../assets/selected.svg'
import { createReqDefaultValues } from '../schema/createReqDefaultValues'
import { createReqValidationSchema } from '../schema/createReqValidationSchema'
import { CreateReqFormValues } from '../types/CreateReqFormValues'
import { CreateReqPopupProps } from '../types/CreateReqPopupProps'

import { tailChase } from 'ldrs'
import { useState } from 'react'
import { useCreateRequestMutation } from '../../../redux/services/application'
import { Performers } from '../../../types/Performers'
import styles from './CreateRequestPopup.module.scss'

export const CreateRequestPopup: React.FC<CreateReqPopupProps> = ({
	setSelfOpened,
}) => {
	const [selectedPerformer, setSelectedPerformer] = useState<
		number | undefined
	>()
	const [create, { isLoading, isError }] = useCreateRequestMutation()

	const {
		register,
		clearErrors,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<CreateReqFormValues>({
		defaultValues: createReqDefaultValues,
		mode: 'onChange',
		resolver: yupResolver(createReqValidationSchema),
	})

	const onSubmit = (data: CreateReqFormValues) => {
		const { title, comment } = data
		create({
			title,
			comment,
			performer:
				selectedPerformer !== undefined ? Performers[selectedPerformer] : '',
		}).then((response: any) => {
			if (!response.error) {
				setSelfOpened(false)
				window.location.reload()
			} else {
				console.log(response.error)
			}
		})

		reset()
		clearErrors()
	}

	tailChase.register()

	return (
		<div className='popup'>
			<div
				className='popup-backdrop'
				onClick={() => setSelfOpened(false)}
			></div>
			<div className='popup-wrapper'>
				<div className='popup-wrapper__heading'>
					<h1>Оставить заявку</h1>
					<img
						className='create-request__cross'
						src={cross}
						alt='cross'
						onClick={() => setSelfOpened(false)}
					/>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					<span>Название</span>
					<input {...register('title')} placeholder='Название заявки' />
					{errors?.title && <p>{errors.title.message}</p>}
					<span>Опишите проблему подробнее </span>{' '}
					<textarea {...register('comment')} />
					{errors?.comment && <p>{errors.comment.message}</p>}
					<div className={styles.selectPerformer}>
						<div className={styles.selectPerformerHeading}>
							<span>Выберите отдел</span>
							<img src={info} alt='info' className={styles.info} />
							<div className={styles.infoBlock}>
								<h2>
									<b>💻</b>Технический отдел
								</h2>
								<span>
									Заявки связанные с неисправностями техники, принтерами и МФУ,
									техническим сопровождением мероприятий, организацией ВКС
								</span>
								<h2>
									<b>📄</b> Методический отдел
								</h2>
								<span>
									Учебные вопросы и документы, не связанные с учебным офисом,
									оформление практики
								</span>
								<h2>
									<b>📖</b>Учебный офис
								</h2>
								<span>
									Перевод студентов, отчисление, выдача справок об обучении,
									военкомат, бюджетная/платная основа обучения,{' '}
								</span>
								<h2>
									<b>🛏️</b>Гостиница
								</h2>
								<span>
									Поломки в средстве размещения, выдача чек-листов, вопросы о
									переселении
								</span>
								<h2>
									<b>🧸</b>Воспитательный отдел
								</h2>
								<span>
									Вопросы по воспитательной работе, дежурный воспитатель
								</span>
							</div>
						</div>
						<ul>
							<li
								onClick={() => setSelectedPerformer(0)}
								className={selectedPerformer === 0 ? styles.selected : ''}
							>
								<b>💻</b>
								Технический отдел
								<img src={selectedSvg} alt='sel' />
							</li>
							<li
								onClick={() => setSelectedPerformer(1)}
								className={selectedPerformer === 1 ? styles.selected : ''}
							>
								<b>📄</b>
								Методический отдел
								<img src={selectedSvg} alt='sel' />
							</li>
							<li
								onClick={() => setSelectedPerformer(2)}
								className={selectedPerformer === 2 ? styles.selected : ''}
							>
								<b>📖</b>
								Учебный офис
								<img src={selectedSvg} alt='sel' />
							</li>
							<li
								onClick={() => setSelectedPerformer(3)}
								className={selectedPerformer === 3 ? styles.selected : ''}
							>
								<b>🛏️</b>
								Гостиница
								<img src={selectedSvg} alt='sel' />
							</li>
							<li
								onClick={() => setSelectedPerformer(4)}
								className={selectedPerformer === 4 ? styles.selected : ''}
							>
								<b>🧸</b>
								Воспитательный отдел
								<img src={selectedSvg} alt='sel' />
							</li>
						</ul>
					</div>
					<button type='submit'>
						{isLoading ? (
							<l-tail-chase size='30' speed='1.75' color='white'></l-tail-chase>
						) : (
							'Создать заявку'
						)}
					</button>
				</form>
				{isError && <span className='login-error'>Что-то пошло не так...</span>}
			</div>
		</div>
	)
}
