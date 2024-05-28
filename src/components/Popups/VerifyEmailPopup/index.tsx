import { tailChase } from 'ldrs'
import { useState } from 'react'
import ReactInputVerificationCode from 'react-input-verification-code'
import { useSelector } from 'react-redux'
import { userSelector } from '../../../redux/selectors/userSelector'
import {
	useConfirmEmailMutation,
	useLoginMutation,
	useResendCodeMutation,
} from '../../../redux/services/user'

export interface EmailPopupProps {
	setSelfOpened: (bool: boolean) => void
}

export const VerifyEmailPopup: React.FC<EmailPopupProps> = ({
	setSelfOpened,
}) => {
	const [inputValue, setInputValue] = useState('')
	const [completed, setCompleted] = useState(false)
	const [resent, setResent] = useState(false)
	const { email, password } = useSelector(userSelector)

	const [confirmEmail, { isLoading, isError: isVerifyError, reset }] =
		useConfirmEmailMutation()

	const [resendCode, {}] = useResendCodeMutation()
	const [login, {}] = useLoginMutation()

	const handleChange = (value: string) => {
		reset()
		setInputValue(value)
		if (value.length !== 4) {
			setCompleted(false)
		}
	}

	const handleConfirm = () => {
		if (completed) {
			confirmEmail({
				email,
				verification_code: inputValue,
			}).then(response => {
				if (!response.error) {
					setSelfOpened(false)
					login({ email, password }).then((response: any) => {
						if (response.error) {
							console.log('login error')
						} else {
							localStorage.setItem('token', response.data)
							window.location.reload()
						}
					})
				}
			})
		}
	}

	const handleResend = () => {
		setResent(true)
		resendCode({ email })
	}

	tailChase.register()

	return (
		<div className='popup'>
			<div className='popup-backdrop'></div>
			<div className='popup-wrapper'>
				<div className='popup-wrapper__heading'>
					<h1>Пожалуйста, проверьте Вашу почту</h1>
				</div>
				<div
					className={'code-wrapper' + ' ' + `${isVerifyError && 'is-error'}`}
				>
					<span>
						Мы отправили код на <b>{email}</b>
					</span>
					<ReactInputVerificationCode
						autoFocus
						placeholder=''
						onChange={handleChange}
						onCompleted={() => setCompleted(true)}
						value={inputValue}
					/>
					{isVerifyError && (
						<span className='verify-error'>Попробуйте еще раз!</span>
					)}
					{!completed && inputValue && <span>Пожалуйста, введите код</span>}
					<button onClick={handleConfirm}>
						{isLoading ? (
							<l-tail-chase size='30' speed='1.75' color='white'></l-tail-chase>
						) : (
							'Подтвердить'
						)}
					</button>
				</div>
				{!resent && (
					<span className='resend-code' onClick={handleResend}>
						Отправить код снова
					</span>
				)}
			</div>
		</div>
	)
}
