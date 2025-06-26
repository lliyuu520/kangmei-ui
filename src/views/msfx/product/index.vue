<template>
	<el-card>
		<el-form :inline="true" :model="state.queryForm" @keyup.enter="getDataList()">
			<el-form-item label="一级码标识">
				<el-input v-model="state.queryForm.oneCode" placeholder="一级码标识"></el-input>
			</el-form-item>
			<el-form-item label="二级码标识">
				<el-input v-model="state.queryForm.twoCode" placeholder="二级码标识"></el-input>
			</el-form-item>
			<el-form-item label="药品名称">
				<el-input v-model="state.queryForm.productName" placeholder="药品名称"></el-input>
			</el-form-item>
			<el-form-item label="包装规格">
				<el-input v-model="state.queryForm.packageSpec" placeholder="包装规格"></el-input>
			</el-form-item>
			<el-form-item label="包装比例">
				<el-input v-model="state.queryForm.pkgRatio" placeholder="包装比例"></el-input>
			</el-form-item>
			<el-form-item label="公司">
				<el-select v-model="state.queryForm.company" placeholder="公司"></el-select>
					<el-option v-for="item in companyList" :key="item.code" :label="item.name" :value="item.code"></el-option>
				</el-select>
			</el-form-item>


			<el-form-item>
				<el-button @click="getDataList()">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="syncProductHandle()">更新药品</el-button>
			</el-form-item>
		</el-form>
		<el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%">
			<el-table-column prop="productName" label="药品名称" header-align="center" align="center"></el-table-column>
			<el-table-column prop="packageSpec" label="包装规格" header-align="center" align="center"></el-table-column>
			<el-table-column prop="pkgRatio" label="包装比例" header-align="center" align="center"></el-table-column>
			<el-table-column prop="oneCode" label="一级码标识" header-align="center" align="center"></el-table-column>
			<el-table-column prop="twoCode" label="二级码标识" header-align="center" align="center"></el-table-column>
			<el-table-column prop="company" label="公司" header-align="center" align="center">
				<template #default="scope">
					{{ filterCompany(scope.row.company) }}
				</template>
			</el-table-column>
			<el-table-column label="操作" fixed="right" header-align="center" align="center" width="150">
				<template #default="scope">
					<el-button v-auth="'msfx:product:update'" type="primary" link @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
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
		<add-or-update ref="addOrUpdateRef" @refreshDataList="getDataList"></add-or-update>
	</el-card>
</template>

<script setup lang="ts">
import { useCrud } from '@/hooks'
import { reactive, ref } from 'vue'
import { IHooksOptions } from '@/hooks/interface'
import { baseUrl, pageApiUrl, syncProduct } from '@/api/msfx/product'
import { ElMessage } from 'element-plus/es'
import AddOrUpdate from '@/views/msfx/product/add-or-update.vue'

const state: IHooksOptions = reactive({
	dataListUrl: pageApiUrl,
	deleteUrl: baseUrl,
	queryForm: {
		oneCode: '',
		twoCode: '',
		productName: '',
		packageSpec: '',
		pkgRatio: '',
		company: ''
	}
})
interface Company {
	code: string
	name: string
}

const companyList = ref<Company[]>([
	{ code: 'KM', name: '康美' },
	{ code: 'PROXY', name: '白云山' }
])

const filterCompany = (key: string) => {
	return companyList.value.find(item => item.code === key)?.name
}

const addOrUpdateRef = ref()
const addOrUpdateHandle = (id?: number) => {
	addOrUpdateRef.value.init(id)
}
const syncProductHandle = () => {
	syncProduct().then(() => {
		ElMessage.success('更新成功')
	})
	getDataList()
}

const { getDataList, sizeChangeHandle, currentChangeHandle } = useCrud(state)
</script>
