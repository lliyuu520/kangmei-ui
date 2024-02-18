<template>
	<el-card>
		<el-form :inline="true" :model="state.queryForm" @keyup.enter="getDataList()">
			<el-form-item>
				<el-input v-model="state.queryForm.workNo" placeholder="报工单号"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="state.queryForm.productName" placeholder="药品名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="state.queryForm.packageSpec" placeholder="包装规格"></el-input>
			</el-form-item>
			<el-form-item>
				<el-date-picker v-model="state.queryForm.uploadDate" placeholder="上传日期" value-format="YYYY-MM-DD" format="YYYY-MM-DD"></el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button @click="getDataList()">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%">
			<el-table-column type="expand">
				<template #default="props">
					<el-table :data="props.row.childrenCodeVO" border>
						<el-table-column type="expand">
							<template #default="props">
								<el-table :data="props.row.subChildrenCode" border>
									<el-table-column type="index" label="序号" width="60"></el-table-column>
									<el-table-column prop="curCode" label="一级码" header-align="center" align="center"></el-table-column>
									<el-table-column prop="batchNo" label="批次" header-align="center" align="center"></el-table-column>
									<el-table-column label="操作" fixed="right" header-align="center" align="center" width="150">
										<template #default="scope">
											<el-button type="primary" link @click="genXmlHandle(scope.row.workNo)">修改 </el-button>
											<el-button type="primary" link @click="genXmlHandle(scope.row.workNo)">删除 </el-button>
										</template>
									</el-table-column>
								</el-table>
							</template>
						</el-table-column>
            <el-table-column type="index" label="序号" width="60"></el-table-column>

            <el-table-column prop="curCode" label="二级码" header-align="center" align="center"></el-table-column>
						<el-table-column prop="curCode" label="盒码数量" header-align="center" align="center"></el-table-column>
						<el-table-column prop="batchNo" label="批次" header-align="center" align="center"></el-table-column>
						<el-table-column label="操作" fixed="right" header-align="center" align="center" width="150">
							<template #default="scope">
								<el-button type="primary" link @click="genXmlHandle(scope.row.workNo)">添加 </el-button>
								<el-button type="primary" link @click="genXmlHandle(scope.row.workNo)">修改 </el-button>
								<el-button type="primary" link @click="genXmlHandle(scope.row.workNo)">删除 </el-button>
							</template>
						</el-table-column>
					</el-table>
				</template>
			</el-table-column>
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="workNo" label="报工单号" header-align="center" align="center"></el-table-column>
      <el-table-column prop="workNo" label="上传日期" header-align="center" align="center"></el-table-column>
			<el-table-column prop="productName" label="药品名称" header-align="center" align="center"></el-table-column>
			<el-table-column prop="packageSpec" label="包装规格" header-align="center" align="center"></el-table-column>
			<el-table-column prop="codeCascade" label="包装比例" header-align="center" align="center"></el-table-column>
			<el-table-column prop="boxCurCodeNum" label="箱码数量" header-align="center" align="center"></el-table-column>
			<el-table-column prop="canCurCodeNum" label="盒码数量" header-align="center" align="center"></el-table-column>
			<el-table-column prop="madeDate" label="生产日期" header-align="center" align="center"></el-table-column>
			<el-table-column prop="validateData" label="失效日期" header-align="center" align="center"></el-table-column>
			<el-table-column prop="workshop" label="工厂" header-align="center" align="center"></el-table-column>
			<el-table-column prop="lineName" label="产线" header-align="center" align="center"></el-table-column>
			<el-table-column prop="lineManager" label="产线负责人" header-align="center" align="center"></el-table-column>
			<el-table-column prop="generateNum" label="下载次数" header-align="center" align="center"></el-table-column>
			<el-table-column label="操作" fixed="right" header-align="center" align="center" width="150">
				<template #default="scope">
					<el-button type="primary" link @click="genXmlHandle(scope.row.workNo)">下载 </el-button>
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
import { generateXml, pageApiUrl } from '@/api/msfx/originalcode'
import { ElMessage } from 'element-plus'

const state: IHooksOptions = reactive({
	dataListUrl: pageApiUrl,
	queryForm: {
		productName: '',
		packageSpec: '',
		workNo: '',
		uploadDate: ''
	}
})

const genXmlHandle = (workNo: string) => {
	generateXml({ workNo: workNo }).then(() => {
		ElMessage.success('操作成功')
		getDataList()
	})
}

const { getDataList, selectionChangeHandle, sizeChangeHandle, currentChangeHandle, deleteBatchHandle } = useCrud(state)
</script>
