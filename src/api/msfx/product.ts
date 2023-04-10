import service from '@/utils/request'

export const baseUrl = '/msfx/product'
export const pageApiUrl = baseUrl + '/page'


export const uploadProduct = (file: any) => {
	const formData = new FormData()
	formData.append('file', file.file)
	return service.post(baseUrl + '/uploadProduct', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
}

export const resProdCodeInfo = (id: number) => {
	return service.get(baseUrl + '/resProdCodeInfo/' + id)
}
