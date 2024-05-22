export interface AdminEditRequestPopupProps {
	setSelfOpened: (obj: AdminEditRequestPopupState) => void
	request: AdminEditRequestPopupState
}

export interface AdminEditRequestPopupState {
	id?: number
	title?: string
	comment?: string
	status?: string
	priority?: string
	execution_period?: string
	performer?: string
	feedback?: string
}
