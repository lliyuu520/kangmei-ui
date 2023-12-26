import service from '@/utils/request'

export const useParamApi = (id: Number) => {
	return service.get('/sys/param/' + id)
}

export const useParamSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/sys/param', dataForm)
	} else {
		return service.post('/sys/param', dataForm)
	}
}

export const useParamListApi = () => {
	return service.get('/sys/param/list')
}
