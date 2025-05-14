<template>
	<el-dialog v-model="visible" title="添加盒码" :close-on-click-modal="false" draggable>
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="120px" @keyup.enter="submitHandle()">
			<el-form-item prop="bagCode" label="盒码">
				<el-input v-model="dataForm.bagCode" placeholder="盒码"></el-input>
			</el-form-item>
			<el-form-item prop="batchNo" label="批号">
				<el-input v-model="dataForm.batchNo" placeholder="批号"></el-input>
			</el-form-item>
			<el-form-item prop="madeDate" label="生产日期">
				<el-input v-model="dataForm.madeDate" placeholder="生产日期"></el-input>
			</el-form-item>
			<el-form-item prop="validateData" label="失效日期">
				<el-input v-model="dataForm.validateDate" validate-data="失效日期"></el-input>
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
import { addBagCodeApi } from '@/api/msfx/workplan'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)

const dataFormRef = ref()

const dataForm = reactive<{
	boxCodeId: number
	bagCode: string
	batchNo: string
	madeDate: string
	validateDate: string
}>({
	boxCodeId: 0,
	bagCode: '',
	batchNo: '',
	validateDate: '',
	madeDate: ''
})

const init = (data: any) => {
	visible.value = true
	// 重置表单数据
	if (dataFormRef.value) {
		dataFormRef.value.resetFields()
	}
	// 通过data传递数据
	dataForm.boxCodeId = data.boxCodeId
	dataForm.batchNo = data.batchNo
}

const dataRules = ref({
	bagCode: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	batchNo: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
  validateDate: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
  madeDate: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}
		if (dataForm.bagCode.length != 20) {
			ElMessage.error('码长度必须为20位')
			return false
		}
		addBagCodeApi(dataForm).then(() => {
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
