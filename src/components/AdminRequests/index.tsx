import { useState } from 'react'
import { AdminRequest } from '../../types/AdminRequest'
import { PriorityColor } from '../../types/PriorityColor'
import { Request } from '../../types/Request'
import { AdminEditRequestPopup } from '../Popups/AdminEditRequestPopup'
import { AdminEditRequestPopupState } from '../Popups/types/AdminEditRequestPopupProps'
import styles from './AdminRequests.module.scss'

export const AdminRequests: React.FC<any> = ({ requests = [] }) => {
	const [editRequestPopupInfo, setEditRequestPopupInfo] =
		useState<AdminEditRequestPopupState>({})
	const newReqs = requests.filter((req: Request) => req.status === 'Создана')

	const inWorkReqs = requests.filter(
		(req: Request) => req.status === 'В работе'
	)

	const doneReqs = requests.filter((req: Request) => req.status === 'Выполнена')

	return (
		<div className={styles.wrapper}>
			{editRequestPopupInfo.id && (
				<AdminEditRequestPopup
					setSelfOpened={setEditRequestPopupInfo}
					request={editRequestPopupInfo}
				/>
			)}
			<div className={styles.requestStatusBlock}>
				<div className={styles.requestHeading + ' ' + styles.redHeading}>
					<h1>Новые</h1>
					<span>{newReqs.length}</span>
				</div>
				<div className={styles.requestsWrapper}>
					{newReqs.map((req: AdminRequest, index: number) => (
						<div
							key={index}
							className={styles.request}
							onClick={() =>
								setEditRequestPopupInfo({
									id: req.id,
									title: req.title,
									comment: req.comment,
									status: req.status,
									priority: req.priority,
									execution_period: req.execution_period,
									performer: req.performer,
									feedback: req.feedback,
								})
							}
						>
							<span className={styles.id}>№{req.id}</span>
							<span className={styles.title}>{req.title}</span>
							<div>
								<span className={styles.applicant}>{req.applicant}</span>
								<span
									className={styles.priority}
									style={{ color: (PriorityColor as any)[req.priority] }}
								>
									{req.priority}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className={styles.requestStatusBlock}>
				<div className={styles.requestHeading + ' ' + styles.purpleHeading}>
					<h1>В работе</h1>
					<span>{inWorkReqs.length}</span>
				</div>
				<div className={styles.requestsWrapper}>
					{inWorkReqs.map((req: AdminRequest, index: number) => (
						<div
							key={index}
							className={styles.request}
							onClick={() =>
								setEditRequestPopupInfo({
									id: req.id,
									title: req.title,
									comment: req.comment,
									status: req.status,
									priority: req.priority,
									execution_period: req.execution_period,
									performer: req.performer,
									feedback: req.feedback,
								})
							}
						>
							<span className={styles.id}>№{req.id}</span>
							<span className={styles.title}>{req.title}</span>
							<div>
								<span className={styles.applicant}>{req.applicant}</span>
								<span
									className={styles.priority}
									style={{ color: (PriorityColor as any)[req.priority] }}
								>
									{req.priority}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className={styles.requestStatusBlock}>
				<div className={styles.requestHeading + ' ' + styles.greenHeading}>
					<h1>Выполнены</h1>
					<span>{doneReqs.length}</span>
				</div>
				<div className={styles.requestsWrapper}>
					{doneReqs.map((req: AdminRequest, index: number) => (
						<div
							key={index}
							className={styles.request}
							onClick={() =>
								setEditRequestPopupInfo({
									id: req.id,
									title: req.title,
									comment: req.comment,
									status: req.status,
									priority: req.priority,
									execution_period: req.execution_period,
									performer: req.performer,
									feedback: req.feedback,
								})
							}
						>
							<span className={styles.id}>№{req.id}</span>
							<span className={styles.title}>{req.title}</span>
							<div>
								<span className={styles.applicant}>{req.applicant}</span>
								<span
									className={styles.priority}
									style={{ color: (PriorityColor as any)[req.priority] }}
								>
									{req.priority}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
