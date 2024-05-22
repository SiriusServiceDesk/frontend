import * as Yup from 'yup'
import { AdminEditRequestFormValues } from '../types/AdminEditRequestFormValues'

export const adminEditRequestValidationSchema: Yup.ObjectSchema<AdminEditRequestFormValues> =
	Yup.object().shape({
		execution_period: Yup.string()
			.required('Введите срок исполнения')
			.max(20, 'Срок не может быть длиннее 20 символов'),

		feedback: Yup.string().max(
			200,
			'Комментарий не может быть длиннее 200 символов'
		),
		performer: Yup.string()
			.required('Введите отдел или исполнителя')
			.max(20, 'Поле не может быть длиннее 20 символов'),
	})

export const adminEditRequestValidationSchemaIgnoreFields: Yup.ObjectSchema<AdminEditRequestFormValues> =
	Yup.object().shape({
		execution_period: Yup.string().max(
			20,
			'Срок не может быть длиннее 20 символов'
		),

		feedback: Yup.string().max(
			200,
			'Комментарий не может быть длиннее 200 символов'
		),
		performer: Yup.string().max(20, 'Поле не может быть длиннее 20 символов'),
	})
