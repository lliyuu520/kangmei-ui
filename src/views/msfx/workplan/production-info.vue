<template>
	<el-dialog v-model="visible" title="生产信息" :close-on-click-modal="false" draggable>
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="120px" @keyup.enter="submitHandle()">
			<el-form-item prop="workNo" label="报工单号">
				<el-input v-model="dataForm.workNo" placeholder="报工单号" disabled></el-input>
			</el-form-item>
			<el-form-item prop="madeDate" label="生产日期">
				<el-input v-model="dataForm.madeDate" placeholder="生产日期" ></el-input>
			</el-form-item>
			<el-form-item prop="validateData" label="失效日期">
				<el-input v-model="dataForm.validateData" validate-data="失效日期"></el-input>
			</el-form-item>
			<el-form-item prop="workshop" label="工厂">
				<el-input v-model="dataForm.workshop" placeholder="工厂"></el-input>
			</el-form-item>
			<el-form-item prop="lineName" label="产线">
				<el-input v-model="dataForm.lineName" placeholder="产线"></el-input>
			</el-form-item>
			<el-form-item prop="lineManager" label="产线负责人">
				<el-input v-model="dataForm.lineManager" placeholder="产线负责人"></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="visible = false">取消</el-button>
			<el-button v-if="editFlag" type="primary" @click="submitHandle()">确定</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus/es'
import { updateProductionInfoApi } from '@/api/msfx/workplan'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const editFlag=ref(false)
const dataFormRef = ref()

const dataForm = reactive<{
	workNo: string
	madeDate: string
	validateData: string
	workshop: string
	lineName: string
	lineManager: string
}>({
	workNo: '',
	madeDate: '',
	validateData: '',
	workshop: '',
	lineName: '',
	lineManager: ''
})

const init = (data: any,editFlag1:boolean) => {
	visible.value = true
	// 重置表单数据
	if (dataFormRef.value) {
		dataFormRef.value.resetFields()
	}
	// 通过data传递数据
	dataForm.workNo = data.workNo
	dataForm.madeDate = data.madeDate
	dataForm.validateData = data.validateData
	dataForm.workshop = data.workshop
	dataForm.lineName = data.lineName
	dataForm.lineManager = data.lineManager
  editFlag.value=editFlag1;
}

const dataRules = ref({
	madeDate: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	validateData: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	workshop: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	lineName: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	lineManager: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}
		updateProductionInfoApi(dataForm).then(() => {
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
