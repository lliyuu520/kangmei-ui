<template>
	<el-dialog v-model="visible" title="修改箱码'" :close-on-click-modal="false" draggable>
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="120px" @keyup.enter="submitHandle()">
			<el-form-item prop="batchNo" label="批号">
				<el-input v-model="dataForm.batchNo" placeholder="批号"></el-input>
			</el-form-item>
			<el-form-item prop="boxCode" label="箱码">
				<el-input v-model="dataForm.boxCode" placeholder="箱码"></el-input>
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
import { updateBoxCodeApi } from '@/api/msfx/workplan'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)

const dataFormRef = ref()

const dataForm = reactive<{
	boxCodeId: number
	boxCode: string
	batchNo: string
}>({
	boxCodeId: 0,
	boxCode: '',
	batchNo: ''
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
	dataForm.boxCode = data.boxCode
}

const dataRules = ref({
	boxCode: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	batchNo: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}
		if (dataForm.boxCode.length != 20) {
			ElMessage.error('码长度必须为20位')
			return false
		}

		updateBoxCodeApi(dataForm).then(() => {
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
