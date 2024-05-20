import * as Yup from 'yup'
import { CreateReqFormValues } from '../types/CreateReqFormValues'

export const createReqValidationSchema: Yup.ObjectSchema<CreateReqFormValues> =
	Yup.object().shape({
		title: Yup.string()
			.required('Введите название')
			.max(20, 'Название не может быть длиннее 20 символов'),

		comment: Yup.string().max(
			200,
			'Комментарий не может быть длиннее 200 символов'
		),
	})
