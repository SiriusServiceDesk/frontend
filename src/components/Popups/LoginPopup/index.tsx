import { yupResolver } from '@hookform/resolvers/yup'
import { tailChase } from 'ldrs'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import cross from '../../../assets/cross.svg'
import eye from '../../../assets/eye.svg'
import eyeCrossed from '../../../assets/eyeCrossed.svg'
import { useLoginMutation } from '../../../redux/services/user'
import { logDefaultValues } from '../schema/logDefaultValues'
import { logValidationSchema } from '../schema/logValidationSchema'
import { LogFormValues } from '../types/LogFormValues'
import { PopupProps } from '../types/PopupProps'

export const LoginPopup: React.FC<PopupProps> = ({
	setSelfOpened,
	setProceedOpened,
}) => {
	const [showPassword, setShowPassword] = useState(false)
	const [login, { isLoading, isError }] = useLoginMutation()

	const {
		register,
		clearErrors,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<LogFormValues>({
		defaultValues: logDefaultValues,
		mode: 'onChange',
		resolver: yupResolver(logValidationSchema),
	})

	const onSubmit = (data: LogFormValues) => {
		const { email, password } = data
		login({ email, password }).then((response: any) => {
			if (!response.error) {
				localStorage.setItem('token', response.data)
				setSelfOpened(false)
				window.location.reload()
			} else {
				console.log(response.error)
			}
		})
		reset({ password: '' })
		clearErrors()
	}

	const handleProceed = () => {
		setProceedOpened(true)
		setSelfOpened(false)
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
					<h1>Войти в аккаунт</h1>
					<img src={cross} alt='cross' onClick={() => setSelfOpened(false)} />
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
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
					<button type='submit'>
						{isLoading ? (
							<l-tail-chase size='30' speed='1.75' color='white'></l-tail-chase>
						) : (
							'Войти в аккаунт'
						)}
					</button>
				</form>
				{isError && (
					<span className='login-error'>Неверный email или пароль</span>
				)}
				<span className='popup-wrapper__alternative'>
					Нет аккаунта? <b onClick={handleProceed}>Зарегистрироваться</b>
				</span>
			</div>
		</div>
	)
}
