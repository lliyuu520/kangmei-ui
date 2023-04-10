<template>
	<el-dialog v-model="visible" :title="'码资源产品编码列表'" :close-on-click-modal="false" :width="1200">
		<el-table :data="resProdCodeList" style="width: 100%">
			<el-table-column prop="codeVersion" label="码资源产品编码对应版本号" header-align="center" align="center"></el-table-column>
			<el-table-column prop="codeLevel" label="包装层级" header-align="center" align="center"></el-table-column>
			<el-table-column prop="pkgRatio" label="包装比例" header-align="center" align="center"></el-table-column>
			<el-table-column prop="value" label="码资源产品编码" header-align="center" align="center"></el-table-column>
		</el-table>
	</el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { resProdCodeInfo } from '@/api/msfx/product'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const dataFormRef = ref()

interface ResProdCode {
	codeVersion: string
	codeLevel: string
	pkgRatio: string
	value: string
}
const resProdCodeList = reactive<ResProdCode[]>([])

const init = (id?: number) => {
	visible.value = true
	if (id) {
		getParams(id)
	}
}

const getParams = (id: number) => {
	resProdCodeInfo(id).then((res: { data: any }) => {
		Object.assign(resProdCodeList, res.data)
	})
}

defineExpose({
	init
})
</script>
