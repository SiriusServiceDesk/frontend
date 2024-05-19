import * as Yup from 'yup'
import { LogFormValues } from '../types/LogFormValues'

export const logValidationSchema: Yup.ObjectSchema<LogFormValues> =
	Yup.object().shape({
		email: Yup.string()
			.email('Введите корректный email')
			.required('Email не может быть пустым'),
		password: Yup.string()
			.required('Пароль не может быть пустым')
			.min(8, 'Введите валидный пароль')
			.max(20, 'Введите валидный пароль'),
	})
