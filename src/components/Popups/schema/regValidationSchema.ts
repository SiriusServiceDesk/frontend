import * as Yup from 'yup'
import { RegFormValues } from '../types/RegFormValues'

export const regValidationSchema: Yup.ObjectSchema<RegFormValues> =
	Yup.object().shape({
		name: Yup.string()
			.required('Имя не может быть пустым')
			.trim()
			.min(3, 'Имя должно быть не менее 3 символов')
			.max(80, 'Имя должно быть не более 80 символов'),
		surname: Yup.string()
			.required('Фамилия не может быть пустой')
			.trim()
			.min(3, 'Фамилия должна быть не менее 3 символов')
			.max(80, 'Фамилия должна быть не более 80 символов'),
		email: Yup.string()
			.email('Введите корректный email')
			.required('Email не может быть пустым'),
		password: Yup.string()
			.required('Пароль не может быть пустым')
			.min(8, 'Пароль должен содержать не менее 8 символов')
			.max(20, 'Пароль должен содержать не более 20 символов'),
		confirmPassword: Yup.string()
			.required('Поле не может быть пустым')
			.oneOf([Yup.ref('password')], 'Пароли должны совпадать'),
	})
