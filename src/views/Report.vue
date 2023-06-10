<template>
    <Card>
        <Breadcrumb>
            <BreadcrumbItem to="/">
                <Icon type="ios-home-outline"></Icon> Home
            </BreadcrumbItem>
            <BreadcrumbItem to="/category">
                <Icon type="logo-buffer"></Icon> Report
            </BreadcrumbItem>
        </Breadcrumb>
        <br />
        <Space class="mb-4">
                      <Input  type="date" v-model="fdate" placeholder="from date"/>
                      <Input type="date" v-model="tdate" placeholder="to date"/>
                      <Input suffix="ios-search" v-model="SearchQuery" 
         @on-enter="loadDataList(1)"
         placeholder="Enter Search" style="width: auto" />
                      <Button type="primary" @click="loadDataList(1)"> OK </Button>
         </Space>
         <Table :columns="columns" :data="dataTransaction" size="small" ref="table">
        </Table>
        <Page :total="total" class="mt-6"
          :current="current"
          @on-page-size-change="handlePageChangeSize"
          @on-change="handleChangeSize"
          :page-size="pageSize"
          size="small" show-elevator show-sizer show-total /> 
     
    </Card>
</template>
<script setup>
import { getCurrentInstance, onMounted, reactive, ref, resolveComponent } from "vue";
import { getTransactionReport } from "../api/transaction";
const { proxy } = getCurrentInstance();
const fdate = ref(new Date().toISOString().slice(0, 10))
const tdate = ref(new Date().toISOString().slice(0, 10))
const dataTransaction =ref([])
const columns = ref([
    {
        "title": "#NO",
        "key": "id",
        "minWidth": 80
    },
    {
        "title": "Name",
        "key": "name",
        "minWidth": 100
    },{
        "title": "Amount",
        "key": "amount",
        "minWidth": 100
    },
    {
        "title": "Note",
        "key": "note",
        "minWidth": 150

    },
    {
        "title": "Type",
        "key": "type",
        "minWidth": 100,
        render: (h, params) => {
            if (params.row.type==1) {
                return h('div', [
                h(resolveComponent('Tag'), {
                    color: 'success',
                    size:'small'
                }, {
                    default() {
                        return 'income'
                    }
                })
            ])
            } else {
                return h('div', [
                h(resolveComponent('Tag'), {
                    color: 'warning',
                    size:'small'
                }, {
                    default() {
                        return 'exspend'
                    }
                })
            ])
            }
           
        }
    }
]);
const total = ref(0)
const current=ref(1)
const pageSize = ref(10)
const SearchQuery=ref("")
const loadDataList = (_page=1) => {
    getTransactionReport({
        page: parseInt(_page-1),
        limit: pageSize.value,
        q:SearchQuery.value,
        fdate: fdate.value,
        tdate: tdate.value
    }).then((res) => {
        dataTransaction.value = res.data.data
        total.value =res.data.total
    })
}
const handleChangeSize = (val) => {
    current.value = val
    proxy.$nextTick(() => {
        loadDataList(val)
    })
}
const handlePageChangeSize = (val) => {
    pageSize.value = val
    proxy.$nextTick(() => {
        loadDataList()
    })
}

onMounted(() => {
    loadDataList()
 })

</script>
