import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import cross from '../../../assets/cross.svg'
import { useRegistrationMutation } from '../../../redux/services/user'
import { setUser } from '../../../redux/user/userSlice'
import { regDefaultValues } from '../schema/regDefaultValues'
import { regValidationSchema } from '../schema/regValidationSchema'
import { PopupProps } from '../types/PopupProps'
import { RegFormValues } from '../types/RegFormValues'

import { useState } from 'react'
import eye from '../../../assets/eye.svg'
import eyeCrossed from '../../../assets/eyeCrossed.svg'

interface VerifyProp {
	setEmailVerifyOpened: (bool: Boolean) => void
}

export const RegisterPopup: React.FC<PopupProps & VerifyProp> = ({
	setSelfOpened,
	setProceedOpened,
	setEmailVerifyOpened,
}) => {
	const dispatch = useDispatch()

	const [showPassword, setShowPassword] = useState(false)
	const [showCPassword, setShowCPassword] = useState(false)
	const [registration, { isError: isRegError }] = useRegistrationMutation()

	const {
		register,
		clearErrors,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<RegFormValues>({
		defaultValues: regDefaultValues,
		mode: 'onChange',
		resolver: yupResolver(regValidationSchema),
	})

	const onSubmit = (data: RegFormValues) => {
		const { name, surname, email, password } = data

		registration({ name, surname, email, password }).then((response: any) => {
			if (isRegError) {
				console.log(response)
			} else {
				dispatch(setUser({ email, password }))
			}
		})
		reset()
		clearErrors()
		setEmailVerifyOpened(true)
		setSelfOpened(false)
	}

	const handleProceed = () => {
		setProceedOpened(true)
		setSelfOpened(false)
	}

	return (
		<div className='popup'>
			<div
				className='popup-backdrop'
				onClick={() => setSelfOpened(false)}
			></div>
			<div className='popup-wrapper'>
				<div className='popup-wrapper__heading'>
					<h1>Создать аккаунт</h1>
					<img src={cross} alt='cross' onClick={() => setSelfOpened(false)} />
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<span>Имя</span>
					<input {...register('name')} placeholder='Ваше имя' />
					{errors?.name && <p>{errors.name.message}</p>}
					<span>Фамилия</span>
					<input {...register('surname')} placeholder='Ваша фамилия' />
					{errors?.surname && <p>{errors.surname.message}</p>}
					<span>Email</span>
					<input {...register('email')} placeholder='Ваш email' />
					{errors?.email && <p>{errors.email.message}</p>}
					<span>Пароль</span>
					<div className='passWrapper'>
						<input
							type={showPassword ? 'text' : 'password'}
							{...register('password')}
						/>
						{showPassword ? (
							<img
								src={eyeCrossed}
								alt='eye'
								onClick={() => setShowPassword(false)}
							/>
						) : (
							<img src={eye} alt='eye' onClick={() => setShowPassword(true)} />
						)}
					</div>
					{errors?.password && <p>{errors.password.message}</p>}
					<span>Подтвердите пароль</span>
					<div className='passWrapper'>
						<input
							type={showCPassword ? 'text' : 'password'}
							{...register('confirmPassword')}
						/>
						{showCPassword ? (
							<img
								src={eyeCrossed}
								alt='eye'
								onClick={() => setShowCPassword(false)}
							/>
						) : (
							<img src={eye} alt='eye' onClick={() => setShowCPassword(true)} />
						)}
					</div>
					{errors?.confirmPassword && <p>{errors.confirmPassword.message}</p>}
					<button type='submit'>Создать аккаунт</button>
				</form>
				<span className='popup-wrapper__alternative'>
					Аккаунт уже есть? <b onClick={handleProceed}>Войти</b>
				</span>
			</div>
		</div>
	)
}
