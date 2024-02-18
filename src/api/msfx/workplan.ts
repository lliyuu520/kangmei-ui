import service from '@/utils/request'

export const baseUrl = '/msfx/workPlan'
export const pageApiUrl = baseUrl + '/page'

export const generateXml = (workNo: string) => {
	return service.post(baseUrl + '/generateXml?workNo=' + workNo)
}

export const updateProductionInfoApi = (data: any) => {
	return service.post(baseUrl + '/updateProductionInfo', data)
}
export const addBagCodeApi = (data: any) => {
	return service.post(baseUrl + '/addBagCode', data)
}

export const updateBoxCodeApi = (data: any) => {
	return service.post(baseUrl + '/updateBoxCode', data)
}
export const removeBoxCodeApi = (boxCodeId: number) => {
	return service.post(baseUrl + `/removeBoxCode?boxCodeId=${boxCodeId}`)
}
export const updateBagCodeApi = (data: any) => {
	return service.post(baseUrl + '/updateBagCode', data)
}
export const removeBagCodeApi = (bagCodeId: number) => {
	return service.post(baseUrl + `/removeBagCode?bagCodeId=${bagCodeId}`)
}
