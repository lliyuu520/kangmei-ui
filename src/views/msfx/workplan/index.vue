<template>
	<el-card>
		<el-form :inline="true" :model="state.queryForm" @keyup.enter="getDataList()">
			<el-form-item>
				<el-input v-model="state.queryForm.workNo" placeholder="报工单号"></el-input>
			</el-form-item>
      <el-form-item>
        <el-input v-model="state.queryForm.code" placeholder="药品码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="state.queryForm.batchNo" placeholder="批次"></el-input>
      </el-form-item>
			<el-form-item>
				<el-input v-model="state.queryForm.productName" placeholder="药品名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="state.queryForm.packageSpec" placeholder="包装规格"></el-input>
			</el-form-item>
			<el-form-item>
				<el-date-picker v-model="state.queryForm.uploadTime" placeholder="上传日期" value-format="YYYY-MM-DD" format="YYYY-MM-DD"></el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button @click="getDataList()">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%">
			<el-table-column type="expand">
				<template #default="props">
					<el-table :data="props.row.boxCodeList" border>
						<el-table-column type="expand">
							<template #default="props">
								<el-table :data="props.row.bagCodeList" border>
									<el-table-column type="index" label="序号" width="60"></el-table-column>
									<el-table-column prop="bagCode" label="盒码" header-align="center" align="center"></el-table-column>
									<el-table-column prop="batchNo" label="批次" header-align="center" align="center"></el-table-column>
									<el-table-column label="操作" fixed="right" header-align="center" align="center" width="150">
										<template #default="scope">
											<el-button type="primary" link @click="updateBagCodeHandle(scope.row)">修改 </el-button>
											<el-button type="primary" link @click="removeBagCodeHandle(scope.row.bagCodeId)">删除 </el-button>
										</template>
									</el-table-column>
								</el-table>
							</template>
						</el-table-column>
						<el-table-column type="index" label="序号" width="60"></el-table-column>

						<el-table-column prop="boxCode" label="箱码" header-align="center" align="center"></el-table-column>
						<el-table-column prop="bagCodeNum" label="盒码数量" header-align="center" align="center"> </el-table-column>
						<el-table-column prop="batchNo" label="批次" header-align="center" align="center"></el-table-column>
						<el-table-column label="操作" fixed="right" header-align="center" align="center" width="150">
							<template #default="scope">
								<el-button type="primary" link @click="addBagCodeHandle(scope.row)">添加盒码 </el-button>
								<el-button type="primary" link @click="updateBoxCodeHandle(scope.row)">修改箱码 </el-button>
								<el-button type="primary" link @click="removeBoxCodeHandle(scope.row.boxCodeId)">删除箱码 </el-button>
							</template>
						</el-table-column>
					</el-table>
				</template>
			</el-table-column>
			<el-table-column type="index" label="序号" width="60"></el-table-column>
			<el-table-column prop="workNo" label="报工单号" header-align="center" align="center"></el-table-column>
			<el-table-column prop="uploadTime" label="上传日期" header-align="center" align="center">
        <template #default="scope">
          <span>{{ moment(scope.row.uploadTime).format('YYYY-MM-DD')}}</span>
        </template>
      </el-table-column>
			<el-table-column prop="productName" label="药品名称" header-align="center" align="center"></el-table-column>
			<el-table-column prop="packageSpec" label="包装规格" header-align="center" align="center"></el-table-column>
			<el-table-column prop="cascade" label="包装比例" header-align="center" align="center"></el-table-column>
			<el-table-column prop="boxCodeNum" label="箱码数量" header-align="center" align="center"></el-table-column>
			<el-table-column prop="totalBagCodeNum" label="盒码数量" header-align="center" align="center">
				<template #default="scope">
					<el-tag v-if="scope.row.totalBagCodeNum === scope.row.expectBagCodeNum" type="success">{{ scope.row.totalBagCodeNum }}</el-tag>
					<el-tag v-else type="danger">{{ scope.row.totalBagCodeNum }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="batchNoList" label="批次号" header-align="center" align="center">
				<template #default="scope">
					<el-tag v-for="item in scope.row.batchNoList" :key="item" type="success">{{ item }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="generateNum" label="下载次数" header-align="center" align="center"></el-table-column>
			<el-table-column label="操作" fixed="right" header-align="center" align="center" width="150">
				<template #default="scope">
					<el-button type="primary" link @click="productionInfoHandle(scope.row,true)">修改 </el-button>
					<el-button type="primary" link @click="productionInfoHandle(scope.row,false)">详细 </el-button>
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
		<production-info ref="productionInfoRef" @refreshDataList="getDataList"></production-info>
		<add-bag-code ref="addBagCodeRef" @refreshDataList="getDataList"></add-bag-code>
		<update-box-code ref="updateBoxCodeRef" @refreshDataList="getDataList"></update-box-code>
		<update-bag-code ref="updateBagCodeRef" @refreshDataList="getDataList"></update-bag-code>
	</el-card>
</template>

<script setup lang="ts">
import { useCrud } from '@/hooks'
import { reactive, ref } from 'vue'
import { IHooksOptions } from '@/hooks/interface'
import { generateXml, pageApiUrl, removeBagCodeApi, removeBoxCodeApi } from '@/api/msfx/workplan'
import { ElMessage } from 'element-plus'
import ProductionInfo from './production-info.vue'
import AddBagCode from './add-bag-code.vue'
import UpdateBoxCode from './update-box-code.vue'
import UpdateBagCode from './update-bag-code.vue'
import moment from "moment/moment";

const state: IHooksOptions = reactive({
	dataListUrl: pageApiUrl,
	queryForm: {
		productName: '',
		packageSpec: '',
		workNo: '',
		uploadTime: null,
    code: '',
    batchNo: ''
	}
})

const genXmlHandle = (workNo: string) => {
	generateXml(workNo).then(() => {
		ElMessage.success('操作成功')
		getDataList()
	})
}

const productionInfoRef = ref()

const productionInfoHandle = (data: any,editFlag:boolean) => {
	productionInfoRef.value.init(data,editFlag)
}

const updateBoxCodeRef = ref()

const updateBoxCodeHandle = (data: any) => {
	updateBoxCodeRef.value.init(data)
}

const addBagCodeRef = ref()

const addBagCodeHandle = (data: any) => {
	addBagCodeRef.value.init(data)
}

const removeBoxCodeHandle = (boxCodeId: number) => {
	removeBoxCodeApi(boxCodeId).then(() => {
		ElMessage.success({
			message: '操作成功',
			duration: 500,
			onClose: () => {
				getDataList()
			}
		})
	})
}

const updateBagCodeRef = ref()

const updateBagCodeHandle = (data: any) => {
	updateBagCodeRef.value.init(data)
}

const removeBagCodeHandle = (bagCodeId: number) => {
	removeBagCodeApi(bagCodeId).then(() => {
		ElMessage.success({
			message: '操作成功',
			duration: 500,
			onClose: () => {
				getDataList()
			}
		})
	})
}

const { getDataList, selectionChangeHandle, sizeChangeHandle, currentChangeHandle, deleteBatchHandle } = useCrud(state)
</script>
