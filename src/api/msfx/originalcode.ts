import service from '@/utils/request'

export const baseUrl = '/msfx/originalcode'
export const pageApiUrl = baseUrl + '/page'

export const useDetailApi = (id: number) => {
	return service.get(baseUrl + '/' + id)
}

export const useSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put(baseUrl, dataForm)
	} else {
		return service.post(baseUrl, dataForm)
	}
}

export const useCodeInfo = (id: number) => {
	return service.get(baseUrl + '/codeInfo/' + id)
}

export const generateXml = (ids: any) => {
	return service.post(baseUrl + '/generateXml', ids)
}
