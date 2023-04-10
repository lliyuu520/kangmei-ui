<template>
	<el-card>
		<el-form :inline="true" :model="state.queryForm" @keyup.enter="getDataList()">
			<el-form-item>
				<el-input v-model="state.queryForm.workNo" placeholder="报工单号"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="state.queryForm.productCode" placeholder="药品编码"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="state.queryForm.productName" placeholder="药品名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="state.queryForm.subType" placeholder="剂型"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="state.queryForm.subTypeNo" placeholder="子类编号"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="getDataList()">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%" >
			<el-table-column type="expand">
				<template #default="props">
					<el-table :data="props.row.childrenCode" border>
						<el-table-column prop="curCode" label="一级码" header-align="center" align="center"></el-table-column>
						<el-table-column prop="batchNo" label="批次" header-align="center" align="center"></el-table-column>
						<fast-table-column dict-type="mix_flag" label="混批标志" prop="flag"></fast-table-column>
					</el-table>
				</template>
			</el-table-column>
			<el-table-column prop="workNo" label="报工单号" header-align="center" align="center"></el-table-column>
			<el-table-column prop="productCode" label="药品编码" header-align="center" align="center"></el-table-column>
			<el-table-column prop="productName" label="药品名称" header-align="center" align="center"></el-table-column>
			<el-table-column prop="subType" label="剂型" header-align="center" align="center"></el-table-column>
			<el-table-column prop="subTypeNo" label="子类编码" header-align="center" align="center"></el-table-column>
			<el-table-column prop="parentCode.curCode" label="二级码" header-align="center" align="center"></el-table-column>
			<el-table-column prop="parentCode.batchNo" label="批次" header-align="center" align="center"></el-table-column>
			<fast-table-column dict-type="mix_flag" label="混批标志" prop="parentCode.flag"></fast-table-column>
			<el-table-column prop="cascade" label="包装比例" header-align="center" align="center"></el-table-column>
			<el-table-column prop="packageSpec" label="包装规格" header-align="center" align="center"></el-table-column>
			<el-table-column prop="madeDate" label="生产日期" header-align="center" align="center"></el-table-column>
			<el-table-column prop="validateData" label="失效日期" header-align="center" align="center"></el-table-column>
			<el-table-column prop="workshop" label="工厂" header-align="center" align="center"></el-table-column>
			<el-table-column prop="lineName" label="产线" header-align="center" align="center"></el-table-column>
			<el-table-column prop="lineManager" label="产线负责人" header-align="center" align="center"></el-table-column>
		</el-table>
		<el-pagination
			:current-page="state.page"
			:page-sizes="state.pageSizes"
			:page-size="state.limit"
			:total="state.total"
			layout="total, sizes, prev, pager, next, jumper"
			@size-change="sizeChangeHandle"
			@current-change="currentChangeHandle"
		>
		</el-pagination>
	</el-card>
</template>

<script setup lang="ts">
import { useCrud } from '@/hooks'
import { reactive, ref } from 'vue'
import { IHooksOptions } from '@/hooks/interface'
import { baseUrl, generateXml, pageApiUrl } from '@/api/msfx/originalcode'
import { ElMessage } from 'element-plus'
import FastTableColumn from '@/components/fast-table-column/src/fast-table-column.vue'

const state: IHooksOptions = reactive({
	dataListUrl: pageApiUrl,
	deleteUrl: baseUrl,
	queryForm: {
		productName: '',
		productCode: '',
		workNo: '',
		subType: '',
		subTypeNo: ''
	}
})

const addOrUpdateRef = ref()
const codeInfoRef = ref()
const addOrUpdateHandle = (id?: number) => {
	addOrUpdateRef.value.init(id)
}

const codeInfoHandle = (id?: number) => {
	codeInfoRef.value.init(id)
}

const genXmlHandle = (key?: number | string) => {
	let ids: any[] = []
	if (key) {
		ids = [key]
	} else {
		ids = state.dataListSelections ? state.dataListSelections : []

		if (ids.length === 0) {
			ElMessage.warning('请选择记录')
			return
		}
	}
	generateXml(ids).then((res: { data: any }) => {
		ElMessage.success('操作成功')
		window.open(res.data)
	})
}

const { getDataList, sizeChangeHandle, currentChangeHandle, deleteBatchHandle } = useCrud(state)
</script>
