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
	})
