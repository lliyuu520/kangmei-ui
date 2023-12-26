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
				<el-input v-model="state.queryForm.subTypeNo" placeholder="剂型"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="state.queryForm.subType" placeholder="子类名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="state.queryForm.code" placeholder="二级码"></el-input>
			</el-form-item>
			<el-form-item>
				<el-select v-model="state.queryForm.useFlag" placeholder="使用状态">
					<el-option label="是" :value="true"></el-option>
					<el-option label="否" :value="false"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button @click="getDataList()">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="syncBoxCurCodeHandle()">更新二级码</el-button>
			</el-form-item>
			<el-tag>{{ state.total }}</el-tag>
		</el-form>
		<el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%">
			<el-table-column prop="productCode" label="药品编码" header-align="center" align="center"></el-table-column>
			<el-table-column prop="productName" label="药品名称" header-align="center" align="center"></el-table-column>
			<el-table-column prop="subTypeNo" label="子类编码" header-align="center" align="center"></el-table-column>
			<el-table-column prop="subType" label="剂型" header-align="center" align="center"></el-table-column>
			<el-table-column prop="code" label="二级码" header-align="center" align="center"></el-table-column>
			<el-table-column prop="useFlag" label="使用状态" header-align="center" align="center">
				<template #default="scope">
					{{ scope.row.useFlag ? '是' : '否' }}
				</template>
			</el-table-column>
			<el-table-column label="操作" fixed="right" header-align="center" align="center" width="150">
				<template #default="scope">
					<el-popconfirm v-if="scope.row.useFlag" title="确定要回滚吗？" @confirm="rollbackOneHandle(scope.row.id)">
						<template #reference>
							<el-button>回滚</el-button>
						</template>
					</el-popconfirm>
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
	</el-card>
</template>

<script setup lang="ts">
import { useCrud } from '@/hooks'
import { reactive, ref } from 'vue'
import { IHooksOptions } from '@/hooks/interface'
import { baseUrl, pageApiUrl, rollbackOne, syncBoxCurCode, uploadBoxCurCode } from '@/api/msfx/boxcurcode'
import { ElMessage } from 'element-plus/es'

const state: IHooksOptions = reactive({
	dataListUrl: pageApiUrl,
	deleteUrl: baseUrl,
	queryForm: {
		productName: '',
		productCode: '',
		subTypeNo: '',
		subType: '',
		code: '',
		useFlag: ''
	}
})

const rollbackOneHandle = (id: number) => {
	rollbackOne(id).then(res => {
		ElMessage.success('操作成功')
		getDataList()
	})
}

const uploadBoxCurCodeHandle = (file: any) => {
	uploadBoxCurCode(file).then(res => {
		ElMessage({ message: '上传成功', type: 'success' })
		getDataList()
	})
}

const syncBoxCurCodeHandle = () => {
	syncBoxCurCode().then(res => {
		ElMessage({ message: '更新成功', type: 'success' })
		getDataList()
	})
}

const { getDataList, sizeChangeHandle, currentChangeHandle } = useCrud(state)
</script>
