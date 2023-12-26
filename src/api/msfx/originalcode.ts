import service from '@/utils/request'

export const baseUrl = '/msfx/originalcode'
export const pageApiUrl = baseUrl + '/page'

export const generateXml = (params: any) => {
	return service.post(baseUrl + '/generateXml', params)
}
