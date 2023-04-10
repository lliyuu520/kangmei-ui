import service from '@/utils/request'

export const baseUrl = '/msfx/boxcurcode'
export const pageApiUrl = baseUrl + '/page'

export const rollbackOne = (id: number) => {
	return service.post(baseUrl + '/rollbackOne/' + id)
}

export const uploadBoxCurCode = (file: any) => {
	const formData = new FormData()
	formData.append('file', file.file)
	return service.post(baseUrl + '/uploadBoxCurCode', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
}

