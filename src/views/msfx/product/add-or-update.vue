<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" draggable>
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="120px" @keyup.enter="submitHandle()">
			<el-form-item prop="months" label="有效期">
				<el-input-number v-model="dataForm.months" placeholder="有效期"></el-input-number>
			</el-form-item>
			<el-form-item prop="company" label="公司">
				<el-select v-model="dataForm.company" placeholder="请选择公司">
					<el-option v-for="item in companyList" :key="item.code" :label="item.name" :value="item.code"></el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="visible = false">取消</el-button>
			<el-button type="primary" @click="submitHandle()">确定</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus/es'
import { useApi, useSubmitApi } from '@/api/msfx/product'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)

const dataFormRef = ref()

const dataForm = reactive<{
	id: string
	months: number
	company: string
}>({
	id: '',
	months: 0,
	company: 'KM'
})

const init = (id?: number) => {
	visible.value = true
	dataForm.id = ''

	// 重置表单数据
	if (dataFormRef.value) {
		dataFormRef.value.resetFields()
	}
	// id 存在则为修改
	if (id) {
		getData(id)
	}
}

// 获取信息
const getData = (id: number) => {
	useApi(id).then(res => {
		dataForm.id = res.data.id
		dataForm.months = res.data.months
	})
}
interface Company {
	code: string
	name: string
}

const companyList = ref<Company[]>([
	{ code: 'KM', name: '康美' },
	{ code: 'BYS', name: '白云山' }
])

const dataRules = ref({
	months: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	company: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}
		useSubmitApi(dataForm).then(() => {
			ElMessage.success({
				message: '操作成功',
				duration: 500,
				onClose: () => {
					visible.value = false
					emit('refreshDataList')
				}
			})
		})
	})
}
defineExpose({
	init
})
</script>
