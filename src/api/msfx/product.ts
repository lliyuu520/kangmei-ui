import service from '@/utils/request'

export const baseUrl = '/msfx/product'
export const pageApiUrl = baseUrl + '/page'


export const useApi = (id: number) => {
	return service.get(baseUrl + '/' + id)
}

export const useSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put(baseUrl, dataForm)
	} else {
		return service.post(baseUrl, dataForm)
	}
}
export const syncProduct = () => {
	return service.post(baseUrl + '/syncProduct')
}

export const resProdCodeInfo = (id: number) => {
	return service.get(baseUrl + '/resProdCodeInfo/' + id)
}
