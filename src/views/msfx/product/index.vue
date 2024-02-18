<template>
	<el-card>
		<el-form :inline="true" :model="state.queryForm" @keyup.enter="getDataList()">
			<el-form-item>
				<el-input v-model="state.queryForm.productCode" placeholder="药品编码"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="state.queryForm.productName" placeholder="药品名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="state.queryForm.subTypeNo" placeholder="子类编码"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="state.queryForm.packageSpec" placeholder="包装规格"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="getDataList()">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="syncProductHandle()">更新药品</el-button>
			</el-form-item>
		</el-form>
		<el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%">
			<el-table-column prop="productCode" label="药品编码" header-align="center" align="center"></el-table-column>
			<el-table-column prop="productName" label="药品名称" header-align="center" align="center"></el-table-column>
			<el-table-column prop="subTypeNo" label="子类编码" header-align="center" align="center"></el-table-column>
			<el-table-column prop="packageSpec" label="包装规格" header-align="center" align="center"></el-table-column>
			<el-table-column label="操作" fixed="right" header-align="center" align="center" width="150">
				<template #default="scope">
					<el-button v-auth="'msfx:product:update'" type="primary" link @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
					<el-button type="primary" link @click="detailHandle(scope.row.id)">详情 </el-button>
				</template>
			</el-table-column>
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

		<!-- 弹窗, 新增 / 修改 -->
		<detail ref="detailRef" @refreshDataList="getDataList"></detail>
		<add-or-update ref="addOrUpdateRef" @refreshDataList="getDataList"></add-or-update>
	</el-card>
</template>

<script setup lang="ts">
import { useCrud } from '@/hooks'
import { reactive, ref } from 'vue'
import Detail from './detail.vue'
import { IHooksOptions } from '@/hooks/interface'
import { baseUrl, pageApiUrl, syncProduct } from '@/api/msfx/product'
import { ElMessage } from 'element-plus/es'
import AddOrUpdate from '@/views/msfx/product/add-or-update.vue'

const state: IHooksOptions = reactive({
	dataListUrl: pageApiUrl,
	deleteUrl: baseUrl,
	queryForm: {
		productName: '',
		productCode: '',
		subTypeNo: '',
		packageSpec: ''
	}
})

const addOrUpdateRef = ref()
const addOrUpdateHandle = (id?: number) => {
	addOrUpdateRef.value.init(id)
}
const detailRef = ref()
const detailHandle = (id?: number) => {
	detailRef.value.init(id)
}

const syncProductHandle = () => {
	syncProduct().then(() => {
		ElMessage.success('更新成功')
	})
	getDataList()
}

const { getDataList, sizeChangeHandle, currentChangeHandle } = useCrud(state)
</script>
