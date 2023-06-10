<template>
    <Card>
        <Breadcrumb>
            <BreadcrumbItem to="/">
                <Icon type="ios-home-outline"></Icon> Home
            </BreadcrumbItem>
            <BreadcrumbItem to="/category">
                <Icon type="logo-buffer"></Icon> Transaction
            </BreadcrumbItem>
        </Breadcrumb>
        <br />
        <Form ref="" :label-width="120">
            <FormItem label="Name" prop="name">
                <Input v-model="data.name" placeholder="Name" />
            </FormItem>
            <FormItem label="Amount" prop="amount">
                <InputNumber v-model="data.amount" placeholder="Amount" style="width: 200px;"
                    :formatter="value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g,',')"
                    :parser="value => value.replace(/\$\s?|(,*)/g, '')" />
            </FormItem>
            <FormItem label="Categroy">
                <Select v-model="data.type">
                  <Option v-for="item in SelectData"
                   :value="item.type"
                   :key="item.id"
                   > {{ item.name }} </Option>
        
                </Select>
            </FormItem>
            <FormItem label="Note" prop="note">
                <Input v-model="data.note" placeholder="Name" />
            </FormItem>
            <FormItem>
                <Button type="primary" @click="formSubmit">រក្សាទុក</Button>
                <Button style="margin-left: 8px">បោះបង់</Button>
            </FormItem>
        </Form>
        <br/>
        <Table :columns="columns" :data="dataTransaction" size="small" ref="table">
            <template #action="index">
                <Button size="small" @click="getRowData(index.row)">
                    <Icon type="ios-create-outline" color="blue" size="15"></Icon>
                </Button>
                <Button size="small" @click="callToDelete(index.row)">
                    <Icon type="ios-trash-outline" color="red" size="15"></Icon>
                </Button>
            </template>

        </Table>
    </Card>
</template>
<script setup>
import { getCurrentInstance, onMounted, reactive, ref, resolveComponent } from "vue";
const { proxy } = getCurrentInstance();
import { selectList } from "../api/category";
import { createTransaction,listTransaction } from '../api/transaction'
const SelectData = ref([])
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
                        return params.row.name
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
                        return params.row.name
                    }
                })
            ])
            }
           
        }
    },
    {
        title: "Action",
        slot: "action",
        minWidth: 200,
    }
]);
const data = ref({
    name: '',
    amount: 0,
    type: '',
    note:''
})
const total = ref(0)
const current=ref(1)
const pageSize = ref(10)
const SearchQuery=ref("")
const loadSelectData = () => {
    selectList().then((res) => {
        SelectData.value = res.data
        console.log(res)
    })
}
const formSubmit =()=> {
    createTransaction(data.value)
            .then((res) => {
                proxy.$Message.success('Success')
                loadDataList()
                data.value.name = ""
                data.value.note = ""
            })
            .catch((err) => {
                proxy.$Message.error('Error Save')
    })
}

const loadDataList = (_page=1) => {
    listTransaction({
        page: parseInt(_page-1),
        limit: pageSize.value,
        q:SearchQuery.value
    }).then((res) => {
        dataTransaction.value = res.data.data
        total.value =res.data.total
    })
}

onMounted(() => {
    loadSelectData()
    loadDataList()
 })
</script>
