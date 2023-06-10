<template>
    <Card>
        <Breadcrumb>
            <BreadcrumbItem to="/">
                <Icon type="ios-home-outline"></Icon> Home
            </BreadcrumbItem>
            <BreadcrumbItem to="/category">
                <Icon type="logo-buffer"></Icon> Category
            </BreadcrumbItem>
        </Breadcrumb>
        <br/>
    
        <Form ref="" :label-width="120">
            <FormItem label="Name" prop="name">
                <Input v-model="data.name" placeholder="Name" />
            </FormItem>
            <FormItem label="Note" prop="note">
                <Input v-model="data.note" placeholder="Note" />
            </FormItem>
            <FormItem label="Type" :lable-width="120">
               <Select v-model="data.type">
                  <Option v-for="item in SelectData"
                   :value="item.value"
                   :key="item.value"
                   > {{ item.lable }} </Option>
               </Select>
            </FormItem>

            <FormItem>
                <Button type="primary" @click="FormSubmit">រក្សាទុក</Button>
                <Button style="margin-left: 8px">បោះបង់</Button>
            </FormItem>
        </Form>

       <br/>
       <div class="mb-4">
        <Input suffix="ios-search" v-model="SearchQuery" 
         @on-enter="loadDataList(1)"
         placeholder="Enter Search" style="width: auto" />
       </div>
         <Table :columns="columns" :data="categoryList" size="small" ref="table">
            <template #action="index">
                <Button size="small" @click="getRowData(index.row)">
                    <Icon type="ios-create-outline" color="blue" size="15"></Icon>
                </Button>
                <Button size="small" @click="callToDelete(index.row)">
                    <Icon type="ios-trash-outline" color="red" size="15"></Icon>
                </Button>
            </template>

        </Table>
        <br/>
        <Page :total="total" 
          :current="current"
          @on-page-size-change="handlePageChangeSize"
          @on-change="handleChangeSize"
          :page-size="pageSize"
          size="small" show-elevator show-sizer show-total /> 


        <Modal v-model="modal" title="System Message" cancel-text="Cancel" ok-text="Ok" @on-ok="ok" @on-cancel="cancel">
            <p>Do you want to delete ? {{ data.name }}</p>
        </Modal>
    </Card>
</template>
<script setup>
import { getCurrentInstance, reactive, ref, toRefs,onMounted,resolveComponent} from "vue";
const { proxy } = getCurrentInstance();
import { createCategory, listCategory, updateCategory, deleteCategory } from '@/api/category'
const categoryList = ref([])
const modal = ref(false);
const SelectData = ref([
    {
        value: '1',
        lable:"Income"
    },
    {
        value: '-1',
        lable:"Exspend"
    }
])
const actionForm = ref({
    "isAction": 'save'
})

const columns = ref([
    {
        "title": "Code",
        "key": "id",
        "width": 80
    },
    {
        "title": "Name",
        "key": "name",
        "width": 100
    },
    {
        "title": "Note",
        "key": "note",
        "width": 150

    },
    {
        "title": "Type",
        "key": "type",
        "width": 100,
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
        width: 200,
    }
]);
const total = ref(0)
const current=ref(1)
const pageSize = ref(10)
const SearchQuery=ref("")

/* type =1 Income , type =-1 Expend */
const data = ref({
    id: "",
    name: "",
    note: "",
    type:""

});
const ok = () => {
    // proxy.$Message.info('Clicked ok');
    deleteCategory(data.value)
        .then((res) => {
            proxy.$Message.success('Success')
            loadDataList()
            actionForm.isAction = "save"
            data.value = ""
        })
        .catch((err) => {
            proxy.$Message.error('Error Delete')
        })
}
const cancel = () => {
    proxy.$Message.info('Clicked cancel');
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


const loadDataList = (_page=1) => {
    listCategory({
        page: parseInt(_page-1),
        limit: pageSize.value,
        q:SearchQuery.value
    }).then((res) => {
        categoryList.value = res.data.data
        total.value =res.data.total
    })
}



const getRowData = (index) => {
    console.log(index.name)
    actionForm.isAction = "update"
    data.value = index;
}
const callToDelete = (index) => {
    data.value = index;
    modal.value = true
}

const FormSubmit = () => {

    if (actionForm.isAction == "update") {
        updateCategory(data.value)
            .then((res) => {
                proxy.$Message.success('Update success')
                loadDataList()
                actionForm.isAction = "save"
                data.value.name = ""
                data.value.note = ""
            })
            .catch((err) => {
                proxy.$Message.error('Error Update')
            })
    } else {
        createCategory(data.value)
            .then((res) => {
                proxy.$Message.success('Success')
                loadDataList()
                actionForm.isAction = "save"
                data.value.name = ""
                data.value.note = ""
            })
            .catch((err) => {
                proxy.$Message.error('Error Save')
            })
    }
}

onMounted(() => {
    loadDataList()
})


</script>